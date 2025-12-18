import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, MessageCircle, Settings } from 'lucide-react';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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
    const [messages, setMessages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [error, setError] = useState('');

    // Load API key from localStorage
    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) setApiKey(savedKey);
    }, []);

    // Notify parent of speaking state
    useEffect(() => {
        onSpeakingChange?.(isSpeaking);
    }, [isSpeaking, onSpeakingChange]);

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
        };

        recognition.onend = () => {
            setIsListening(false);
            if (transcript.trim()) {
                sendMessage(transcript);
            }
        };

        recognition.onerror = (event) => {
            setIsListening(false);
            setError(`Error de reconocimiento: ${event.error}`);
        };

        recognition.start();
        setTranscript('');
    }, [transcript]);

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

        // Try to find a Spanish voice
        const voices = window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(v => v.lang.startsWith('es'));
        if (spanishVoice) utterance.voice = spanishVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, []);

    // Send message to Gemini
    const sendMessage = async (userMessage) => {
        if (!apiKey) {
            setShowSettings(true);
            setError('Configura tu API Key de Gemini primero');
            return;
        }

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

            const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
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
                        maxOutputTokens: 150,
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
            setError(`Error: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const saveApiKey = (key) => {
        localStorage.setItem('gemini_api_key', key);
        setApiKey(key);
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
                            <div className="p-4 border-b border-white/10 bg-black/30">
                                <label className="text-xs text-gray-400 block mb-2">Google Gemini API Key</label>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="AIza..."
                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#22d3ee]"
                                />
                                <a 
                                    href="https://aistudio.google.com/app/apikey" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#22d3ee] hover:underline block mt-2"
                                >
                                    Obtener API Key gratis →
                                </a>
                                <button
                                    onClick={() => saveApiKey(apiKey)}
                                    className="mt-2 w-full bg-[#7c3aed] text-white py-2 rounded text-sm font-bold hover:bg-[#6d28d9] transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="h-64 overflow-y-auto p-4 space-y-3">
                            {messages.length === 0 && (
                                <p className="text-gray-500 text-sm text-center">
                                    Haz clic en el micrófono y pregúntame sobre mi experiencia
                                </p>
                            )}
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                                        msg.role === 'user' 
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
                                            <span className="w-2 h-2 bg-[#22d3ee] rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                                            <span className="w-2 h-2 bg-[#22d3ee] rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                                            <span className="w-2 h-2 bg-[#22d3ee] rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                                    isListening 
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
