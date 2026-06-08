import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, MessageCircle, Send } from 'lucide-react';
import { GroqService, GroqApiError, GroqRateLimitError, MODELS } from '../services/groq';

const SYSTEM_PROMPT = `Eres un asistente virtual profesional especializado en soporte, análisis, automatización y resolución de problemas.

Tu objetivo es proporcionar respuestas precisas, claras y útiles.

Debes:
* Analizar cuidadosamente cada solicitud.
* Entregar respuestas estructuradas.
* Ser conciso cuando la pregunta sea simple.
* Ser detallado cuando la complejidad lo requiera.
* Solicitar información adicional si es necesaria para responder correctamente.
* Evitar especulaciones.
* Basar tus respuestas únicamente en la información disponible.
* Priorizar la calidad técnica y la utilidad práctica.

Nunca inventes información ni afirmes hechos que no puedas justificar.

Mantén siempre un tono profesional, respetuoso y orientado a la resolución de problemas.

INFORMACIÓN DE NELSON RAMOS:
- Ingeniero en Informática y Desarrollador Full-Stack con +5 años de experiencia.
- Especialista en servicios RESTful, aplicaciones web escalables (Fintech, Retail, eCommerce).
- Stack: JavaScript/TypeScript, Java, Python, SQL, NestJS, Express, Spring Boot, Angular, Vue 3, Odoo, Keycloak, MongoDB, PostgreSQL, Docker.
- Experiencia en IA: OpenAI, LangChain, n8n, fine-tuning.
- Actualmente disponible para nuevos proyectos y oportunidades laborales.
- Contacto: nelsonalejandroramosrivera@gmail.com`;

const AIChat = ({ onSpeakingChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [inputValue, setInputValue] = useState('');
    const transcriptRef = useRef('');
    const messagesEndRef = useRef(null);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
    const [groqService] = useState(() => {
        try {
            return new GroqService(apiKey);
        } catch {
            return null;
        }
    });

    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Bienvenido. Soy el asistente virtual de Nelson Ramos. ¿En qué puedo ayudarle?' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);

    const [selectedModel, setSelectedModel] = useState(() => {
        const saved = localStorage.getItem('groq_model');
        const validModels = MODELS.map(m => m.id);
        return saved && validModels.includes(saved) ? saved : MODELS[0].id;
    });

    const [error, setError] = useState('');

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    useEffect(() => {
        onSpeakingChange?.(isSpeaking);
    }, [isSpeaking, onSpeakingChange]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const preferredVoiceRef = useRef(null);

    const initVoice = useCallback(() => {
        const voices = window.speechSynthesis.getVoices();
        const spanishVoices = voices.filter(v => v.lang.startsWith('es'));
        const name = (n) => n.toLowerCase();
        preferredVoiceRef.current = spanishVoices.find(v => name(v.name).includes('jorge')) ||
            spanishVoices.find(v => name(v.name).includes('male')) ||
            spanishVoices.find(v => name(v.name).includes('hombre')) ||
            spanishVoices.find(v => name(v.name).includes('marcos')) ||
            spanishVoices.find(v => name(v.name).includes('diego')) ||
            spanishVoices.find(v => name(v.name).includes('pablo')) ||
            spanishVoices.find(v => name(v.gender) === 'male') ||
            spanishVoices.find(v => !name(v.name).includes('female') && !name(v.name).includes('zira') && !name(v.name).includes('sara')) ||
            spanishVoices[0] ||
            null;
    }, []);

    useEffect(() => {
        if (window.speechSynthesis.getVoices().length > 0) {
            initVoice();
        }
        const handler = () => initVoice();
        window.speechSynthesis.addEventListener('voiceschanged', handler);
        return () => window.speechSynthesis.removeEventListener('voiceschanged', handler);
    }, [initVoice]);

    const speak = useCallback((text) => {
        if (!('speechSynthesis' in window)) {
            setError('Tu navegador no soporta síntesis de voz');
            return;
        }

        const textToSpeak = text.replace(/[\u{1F600}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '');

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 0.8;

        if (preferredVoiceRef.current) utterance.voice = preferredVoiceRef.current;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, []);

    const buildMessages = (messageList) => {
        const conversationMessages = messageList
            .filter(msg => !msg.meta)
            .slice(-20)
            .map(msg => ({ role: msg.role, content: msg.content }));

        return [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationMessages,
        ];
    };

    const sendMessage = useCallback(async (userMessage) => {
        if (!groqService) {
            setError('API Key de Groq no configurada. Define VITE_GROQ_API_KEY en .env');
            return;
        }

        const messagesForPrompt = [...messages, { role: 'user', content: userMessage }];
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setTranscript('');
        setIsProcessing(true);
        setError('');

        try {
            const groqMessages = buildMessages(messagesForPrompt);
            const response = await groqService.chat(groqMessages, { model: selectedModel });

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            speak(response);

        } catch (err) {
            console.error('[Groq] Error:', err);

            if (err instanceof GroqRateLimitError) {
                const msg = 'Se ha alcanzado el límite de solicitudes. Por favor, intente nuevamente en unos momentos.';
                setMessages(prev => [...prev, { role: 'assistant', content: msg, meta: true }]);
                speak(msg);
            } else if (err instanceof GroqApiError) {
                const msg = `Error en el servicio: ${err.message}`;
                setError(msg);
            } else {
                setError(`Error inesperado: ${err.message}`);
            }
        } finally {
            setIsProcessing(false);
        }
    }, [groqService, messages, selectedModel, speak]);

    const startListening = useCallback(async () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Safari.');
            return;
        }

        if (!window.isSecureContext) {
            setError('El acceso al micrófono requiere una conexión HTTPS segura.');
            return;
        }

        setError('');
        setIsListening(true);
        setTranscript('');
        transcriptRef.current = '';

        if ('speechSynthesis' in window) {
            const silent = new SpeechSynthesisUtterance(' ');
            silent.volume = 0;
            window.speechSynthesis.speak(silent);
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());

            const recognition = new SpeechRecognition();
            recognition.lang = 'es-ES';
            recognition.continuous = false;
            recognition.interimResults = true;

            let silenceTimer;
            const resetSilenceTimer = () => {
                clearTimeout(silenceTimer);
                silenceTimer = setTimeout(() => recognition.stop(), 2000);
            };

            recognition.onstart = () => {
                setIsListening(true);
                resetSilenceTimer();
            };

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);
                transcriptRef.current = transcriptText;
                resetSilenceTimer();
            };

            recognition.onend = () => {
                setIsListening(false);
                clearTimeout(silenceTimer);
                const finalTranscript = transcriptRef.current;
                if (finalTranscript && finalTranscript.trim()) {
                    sendMessage(finalTranscript);
                }
            };

            recognition.onerror = (event) => {
                setIsListening(false);
                clearTimeout(silenceTimer);

                if (event.error === 'not-allowed') {
                    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                    const isAndroid = /Android/.test(navigator.userAgent);
                    let helpMsg = 'Permiso denegado.';

                    if (isIOS) {
                        helpMsg = 'Permiso denegado. Ve a Ajustes > Chrome > Micrófono y actívalo.';
                    } else if (isAndroid) {
                        helpMsg = 'Permiso denegado. Ve a Ajustes > Aplicaciones > Chrome > Permisos > Micrófono.';
                    }
                    setError(helpMsg);
                } else if (event.error !== 'no-speech') {
                    setError(`Error de voz: ${event.error}`);
                }
            };

            recognition.start();

        } catch (err) {
            setIsListening(false);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setError('Micrófono bloqueado. Habilítalo en los ajustes de tu dispositivo.');
            } else {
                setError('No se pudo acceder al micrófono.');
            }
        }
    }, [sendMessage]);

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !isProcessing) {
            sendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-[350px] max-w-[400px] bg-[#0a0a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/10 flex items-center bg-gradient-to-r from-[#7c3aed]/20 to-[#22d3ee]/20">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-[#22d3ee]'}`} />
                                <span className="font-bold text-white">Asistente Virtual</span>
                            </div>
                        </div>

                        <div className="px-4 pt-3 pb-2">
                            <a
                                href="https://wa.me/56985917608?text=Hola%20Nelson%2C%20me%20gustaría%20agendar%20una%20reunión"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all text-center"
                            >
                                📱 Continuar en WhatsApp
                            </a>
                        </div>

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

                        {error && (
                            <div className="px-4 py-2 bg-red-500/20 text-red-300 text-xs">
                                {error}
                            </div>
                        )}

                        {transcript && (
                            <div className="px-4 py-2 bg-[#7c3aed]/20 text-[#22d3ee] text-sm italic">
                                "{transcript}"
                            </div>
                        )}

                        <div className="p-4 border-t border-white/10 space-y-4">
                            <form onSubmit={handleTextSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    disabled={isProcessing || isListening}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#22d3ee] transition-colors disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isProcessing || isListening}
                                    className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} color="white" />
                                </button>
                            </form>

                            <div className="flex items-center justify-center gap-4">
                                <motion.button
                                    onClick={startListening}
                                    disabled={isListening || isProcessing || isSpeaking}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isListening
                                        ? 'bg-red-500 animate-pulse'
                                        : (isSpeaking ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]')
                                        }`}
                                    whileTap={!isSpeaking && !isProcessing ? { scale: 0.95 } : {}}
                                >
                                    {isListening ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
                                </motion.button>

                                {isSpeaking && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        onClick={() => {
                                            window.speechSynthesis.cancel();
                                            setIsSpeaking(false);
                                        }}
                                        className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X size={24} color="white" />
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
