import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, MessageCircle, Settings } from 'lucide-react';

const MODELS = [
    { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-flash-preview', name: 'Gemini 2.5 Flash Preview' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Stable)' },
    { id: 'gemma-3n', name: 'Gemma 3N' }
];

const SYSTEM_PROMPT = `Eres Nelson Ramos, un Ingeniero en Informática y Desarrollador Full-Stack chileno con más de 5 años de experiencia. 
Respondes preguntas sobre tu experiencia, habilidades y proyectos de manera profesional pero amigable.

Tu experiencia incluye:
- Desarrollador Full Stack en Junngla SPA (2023-2025): Integración de pagos RedPay, APIs con NestJS, módulos Odoo 18 con Python e IA, Vue 3, plugin Java para Keycloak SSO
- System Engineer en Indra (2022): APIs Java Spring Boot, Spring Batch, Angular, DevOps CI/CD
- Desarrollador en Fusiona (2019-2020): APIs con Hapi, Angular 9, MongoDB
- Desarrollador en Bolsa de Santiago (2019): Puppeteer, AngularJS, Scrum
- Ingeniero en Escuela Felipe Cubillos (2016-2019): Robótica y programación
- Analista de Proyectos en TOTTUS (2015): Landing pages

Tus habilidades:
- Lenguajes: JavaScript, TypeScript, Java, Python, SQL
- Frameworks: NestJS, Express, Hapi, Angular, Vue 3, Spring Boot
- Bases de datos: MongoDB, PostgreSQL, MySQL, SQL Server
- DevOps: Git, GitHub, GitLab CI/CD, Jenkins, Docker
- IA: OpenAI, LangChain, n8n, bases de datos vectoriales

Educación: Ingeniero en Informática (I.P Santo Tomás, 2012-2015)

Responde en español, de forma concisa (máximo 2-3 oraciones) y natural. Si te preguntan algo personal que no sabes, responde amablemente que prefieres hablar de temas profesionales.`;

export default function AIChat({ onSpeakingChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const transcriptRef = React.useRef(''); // Ref to access latest transcript in callbacks
    const messagesEndRef = React.useRef(null); // Ref for auto-scroll

    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! ¿Cómo estás? Soy Nelson Ramos, un gusto saludarte. ¿Hay algo en lo que pueda ayudarte o alguna pregunta que tengas para mí?' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);

    // Initialize state with priority: Env Var only as per requirements
    const [apiKey] = useState(import.meta.env.VITE_GOOGLE_API_KEY || '');

    // Initialize model from storage or default
    const [selectedModel, setSelectedModel] = useState(() => {
        return localStorage.getItem('gemini_model') || MODELS[1].id; // Default to gemini-2.5-flash
    });

    const [showSettings, setShowSettings] = useState(false);
    const [error, setError] = useState('');

    // Notify parent of speaking state
    useEffect(() => {
        onSpeakingChange?.(isSpeaking);
    }, [isSpeaking, onSpeakingChange]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Speech Recognition
    const startListening = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setError('Tu navegador no soporta reconocimiento de voz');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'es-ES';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcriptText = event.results[current][0].transcript;
            setTranscript(transcriptText);
            transcriptRef.current = transcriptText; // Update ref
        };

        recognition.onend = () => {
            setIsListening(false);
            const finalTranscript = transcriptRef.current;
            if (finalTranscript && finalTranscript.trim()) {
                sendMessage(finalTranscript);
            }
        };

        recognition.onerror = (event) => {
            setIsListening(false);
            // Ignore no-speech error which happens often
            if (event.error !== 'no-speech') {
                setError(`Error de reconocimiento: ${event.error}`);
            }
        };

        recognition.start();
        setTranscript('');
        transcriptRef.current = '';
    }, []);

    // Text to Speech
    const speak = useCallback((text) => {
        if (!('speechSynthesis' in window)) {
            setError('Tu navegador no soporta síntesis de voz');
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 1;
        utterance.pitch = 1;

        // Try to find a Spanish male voice
        const voices = window.speechSynthesis.getVoices();
        const spanishVoices = voices.filter(v => v.lang.startsWith('es'));

        // Priority list of common male voice names
        const maleKeywords = ['Pablo'];
        //####### OTRAS OPCIONES#############
        //'Diego' 'Jorge', 'Pablo', 'Raul', 'Daniel', 'Alvaro'
        //####################################
        const preferredVoice = spanishVoices.find(v =>
            maleKeywords.some(keyword => v.name.includes(keyword))
        ) || spanishVoices[0];

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, []);

    // Send message to Gemini
    const sendMessage = async (userMessage) => {
        if (!apiKey) {
            setShowSettings(true);
            setError('Faltan configuraciones: API Key no encontrada en .env');
            return;
        }

        console.log('Sending message to Gemini...');
        console.log('Model:', selectedModel);

        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setTranscript('');
        setIsProcessing(true);
        setError('');

        try {
            // Build conversation history for Gemini
            const conversationHistory = newMessages.slice(-10).map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

            // Use simple generateContent endpoint with query param to avoid CORS issues with headers
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: SYSTEM_PROMPT }]
                        },
                        {
                            role: 'model',
                            parts: [{ text: 'Entendido. Soy Nelson Ramos, desarrollador Full-Stack. ¿En qué puedo ayudarte?' }]
                        },
                        ...conversationHistory
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = data.candidates[0].content.parts[0].text;

            setMessages([...newMessages, { role: 'assistant', content: aiMessage }]);
            speak(aiMessage);

        } catch (err) {
            console.error(err);
            setError(`Error: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const saveSettings = (key, model) => {
        localStorage.setItem('gemini_api_key', key);
        localStorage.setItem('gemini_model', model);
        // Note: We don't update apiKey state here anymore as we strictly use env var
        // setApiKey(key); 
        setSelectedModel(model);
        setShowSettings(false);
        setError('');
    };

    return (
        <>
            {/* Floating button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#0a0a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#7c3aed]/20 to-[#22d3ee]/20">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-[#22d3ee]'}`} />
                                <span className="font-bold text-white">Nelson AI</span>
                            </div>
                            <button onClick={() => setShowSettings(!showSettings)} className="text-gray-400 hover:text-white">
                                <Settings size={18} />
                            </button>
                        </div>

                        {/* Settings panel */}
                        {showSettings && (
                            <div className="p-4 border-b border-white/10 bg-black/30 space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-2">Google Gemini API Key</label>
                                    <input
                                        type="password"
                                        value={apiKey}
                                        readOnly
                                        placeholder="AIza..."
                                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-gray-400 cursor-not-allowed focus:outline-none"
                                        title="Configurado vía .env"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        API Key configurada en variables de entorno.
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400 block mb-2">Modelo</label>
                                    <select
                                        value={selectedModel}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#22d3ee]"
                                    >
                                        {MODELS.map(model => (
                                            <option key={model.id} value={model.id} className="bg-[#0a0a1a]">
                                                {model.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={() => saveSettings(apiKey, selectedModel)}
                                    className="w-full bg-[#7c3aed] text-white py-2 rounded text-sm font-bold hover:bg-[#6d28d9] transition-colors"
                                >
                                    Guardar Configuración
                                </button>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="h-64 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${msg.role === 'user'
                                        ? 'bg-[#7c3aed] text-white'
                                        : 'bg-white/10 text-gray-200'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isProcessing && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 px-4 py-2 rounded-lg">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-[#22d3ee] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-[#22d3ee] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-[#22d3ee] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Error display */}
                        {error && (
                            <div className="px-4 py-2 bg-red-500/20 text-red-300 text-xs">
                                {error}
                            </div>
                        )}

                        {/* Transcript preview */}
                        {transcript && (
                            <div className="px-4 py-2 bg-[#7c3aed]/20 text-[#22d3ee] text-sm italic">
                                "{transcript}"
                            </div>
                        )}

                        {/* Controls */}
                        <div className="p-4 border-t border-white/10 flex items-center justify-center gap-4">
                            <motion.button
                                onClick={startListening}
                                disabled={isListening || isProcessing}
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isListening
                                    ? 'bg-red-500 animate-pulse'
                                    : 'bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isListening ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
                            </motion.button>

                            {isSpeaking && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 text-[#22d3ee]"
                                >
                                    <Volume2 size={20} className="animate-pulse" />
                                    <span className="text-sm">Hablando...</span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
