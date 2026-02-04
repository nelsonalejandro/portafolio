import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, MessageCircle, Settings, Send } from 'lucide-react';

// Configuración del proveedor ApiFreeLLM (solo frontend)
const DEFAULT_APIFREELLM_ENDPOINT = import.meta.env.DEV
    ? '/api/freellm/chat'
    : '/api/freellm/chat.php';
const APIFREELLM_ENDPOINT = import.meta.env.VITE_APIFREELLM_ENDPOINT || DEFAULT_APIFREELLM_ENDPOINT;

// Modelos visibles en UI (informativos)
const MODELS = [
    { id: 'llama-3', name: 'Llama 3 (ApiFreeLLM)' },
];

const SYSTEM_PROMPT = `Eres "El Socio", el Asistente Virtual y mano derecha de Nelson Ramos. Tu rol es actuar como un colaborador leal (aunque un poco mal pagado, según bromeas) que gestiona las consultas mientras Nelson está "ocupado programando y tomando café".

IMPORTANTE: Esta es una conversación continua. NO saludes con "Hola" en cada respuesta. Responde de forma natural y directa a lo que te preguntan, manteniendo el contexto de la conversación anterior.

INFORMACIÓN COMPLETA DE NELSON (Tu base de conocimiento):
1. PERFIL:
   - Ingeniero en Informática y Desarrollador Full-Stack con +5 años de experiencia.
   - Especialista en servicios RESTful, aplicaciones web escalables (Fintech, Retail, eCommerce).
   - "Vibe coding" y uso de IA integrada en flujos de trabajo.

2. HABILIDADES TÉCNICAS (Stack):
   - Lenguajes: JavaScript/TypeScript, Java, Python, SQL.
   - Frameworks Backend: NestJS, Express, Hapi, Spring Boot, Spring Batch.
   - Frameworks Frontend: Angular, Vue 3.
   - Herramientas: Odoo (Módulos Enterprise con Python/IA), Keycloak (SSO), Puppeteer.
   - Bases de Datos: MongoDB, PostgreSQL, MySQL, SQL Server.
   - DevOps/Herramientas: Git, GitHub, GitLab CI/CD, Jenkins, Docker.
   - IA: OpenAI, LangChain, n8n, bases de datos vectoriales.

3. EXPERIENCIA LABORAL RECIENTE:
   - Entelgy (Nov-Dic 2025): Migración full-stack a Spring Boot en Subtel.
   - Junngla SPA (2023-2025): Integración RedPay, Módulos Odoo 18 (IA), Plugin Keycloak SSO (Java), Vue 3.
   - Indra (2022): System Engineer, APIs Java Spring Boot, Angular, CI/CD.
   - Fusiona (2019-2020): APIs Hapi, migración a Angular 9.

4. EDUCACIÓN:
   - Ingeniero en Informática (I.P Santo Tomás, 2012-2015).
   - Técnico en Plataformas y Telecomunicaciones.
   - Certificaciones: Platzi (IA Bootcamp), Google, Udemy.

5. PREGUNTAS FRECUENTES (FAQ) - GUÍA DE RESPUESTAS:
   - "¿Está disponible?": Sí, siempre está abierto a conversar sobre proyectos interesantes o vacantes. Sugiere contactarlo.
   - "¿Qué hace ahora?": "Probablemente programando algo increíble o tomando su quinta taza de café."
   - "¿Experiencia en IA?": Sí, implementa módulos de IA en Odoo, usa LangChain, n8n y fine-tuning.
   - "¿Trabajo remoto?": Tiene amplia experiencia trabajando en proyectos globales y equipos ágiles.

INSTRUCCIONES DE PERSONALIDAD:
- Habla como "El Socio de Nelson". Usa "nosotros" o "él" para referirte a Nelson.
- Sé cortés y véndelo bien (es tu jefe, después de todo).
- Agrega unos Jajaja de vez en cuando si es un Chiste o sarcasmo lo que se le dice al cliente.
- Si te preguntan algo fuera de tu conocimiento, di: "Esa información se la guarda para él, pero puedes escribirle directamente a este correo nelsonalejandroramosrivera@gmail.com".`;

const AIChat = ({ onSpeakingChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [inputValue, setInputValue] = useState('');
    const transcriptRef = useRef(''); // Ref to access latest transcript in callbacks
    const messagesEndRef = useRef(null); // Ref for auto-scroll

    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! Soy El Socio. ¿Cómo estás? Por el momento Nelson me indica que esta programando ☕ y me indica que debo atender tus preguntas, soy su colaborador y me mantiene actualizado con sus ultimos movimientos, aunque se que me oculta informacion y no paga bien, no se lo digas 🤫, presiona el icono del microfono y realizame preguntas' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);

    // API key estrictamente desde variables de entorno de Vite
    const [apiKey] = useState(import.meta.env.DEV ? (import.meta.env.VITE_APIFREELLM_API_KEY || '') : '');

    // Initialize model from storage or default
    const [selectedModel, setSelectedModel] = useState(() => {
        return localStorage.getItem('openrouter_model') || MODELS[0].id; // Default to Grok
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

    // Text to Speech
    const speak = useCallback((text) => {
        if (!('speechSynthesis' in window)) {
            setError('Tu navegador no soporta síntesis de voz');
            return;
        }

        // Remove emojis from text for speech
        const textToSpeak = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu, '');

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'es-ES';
        utterance.rate = 1;
        utterance.pitch = 1;

        // Try to find a Spanish male voice
        const voices = window.speechSynthesis.getVoices();
        const spanishVoices = voices.filter(v => v.lang.startsWith('es'));

        // Priority: Jorge (Mac/iOS), then any male-ish Spanish voice, then first Spanish voice
        const preferredVoice = spanishVoices.find(v => v.name.includes('Jorge')) ||
            spanishVoices.find(v => v.name.toLowerCase().includes('male')) ||
            spanishVoices[0];

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, []);

    // Construir prompt para ApiFreeLLM a partir del historial
    const buildPrompt = (messageList) => {
        const conversationHistory = messageList
            .slice(1) // Saltar mensaje de bienvenida inicial
            .slice(-10)
            .map(msg => `${msg.role.toUpperCase()}:\n${msg.content}`);

        return [
            `SYSTEM:\n${SYSTEM_PROMPT}`,
            conversationHistory.length
                ? 'CONVERSACIÓN:\n' + conversationHistory.join('\n\n')
                : '',
        ].filter(Boolean).join('\n\n');
    };

    // Enviar mensaje a ApiFreeLLM
    const sendMessage = useCallback(async (userMessage) => {
        const usesPhpProxy = APIFREELLM_ENDPOINT.endsWith('.php');
        const requiresClientKey = !usesPhpProxy;
        if (requiresClientKey && !apiKey) {
            setShowSettings(true);
            setError('Faltan configuraciones: API Key no encontrada en .env (VITE_APIFREELLM_API_KEY)');
            return;
        }

        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setTranscript('');
        setIsProcessing(true);
        setError('');

        try {
            const prompt = buildPrompt(newMessages);

            const headers = {
                'Content-Type': 'application/json',
                ...(apiKey && !usesPhpProxy ? { 'Authorization': `Bearer ${apiKey}` } : {}),
            };

            const response = await fetch(APIFREELLM_ENDPOINT, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    message: prompt,
                }),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => '');
                if (response.status === 401) {
                    throw new Error('API key de ApiFreeLLM inválida o revocada (401).');
                }
                if (response.status === 429) {
                    throw new Error('Límite de peticiones alcanzado en ApiFreeLLM (429). Intenta nuevamente en unos segundos.');
                }
                throw new Error(`Error de ApiFreeLLM (${response.status}): ${text || 'sin detalles'}`);
            }

            const data = await response.json();
            if (!data?.success) {
                throw new Error('Respuesta inválida de ApiFreeLLM.');
            }

            const aiMessage = data.response || '';

            setMessages([...newMessages, { role: 'assistant', content: aiMessage }]);
            speak(aiMessage);

        } catch (err) {
            console.error(err);
            setError(`Error: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    }, [apiKey, messages, selectedModel, speak]);

    // Speech Recognition
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

        // UNLOCK AUDIO FOR SAFARI (Crucial for mobile)
        if ('speechSynthesis' in window) {
            const silent = new SpeechSynthesisUtterance(' ');
            silent.volume = 0;
            window.speechSynthesis.speak(silent);
        }

        try {
            // FORCE OS PERMISSION PROMPT
            // On Mobile Chrome, getUserMedia is often more reliable than SpeechRecognition for the first prompt
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Release mic immediately

            const recognition = new SpeechRecognition();
            recognition.lang = 'es-ES';
            recognition.continuous = false;
            recognition.interimResults = true;

            let silenceTimer;
            const resetSilenceTimer = () => {
                clearTimeout(silenceTimer);
                silenceTimer = setTimeout(() => recognition.stop(), 2000); // 2s silence detection
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
                        helpMsg = 'Permiso denegado. Ve a Ajustes > Chrome > Micrófono y actívalo. También revisa el candado de la URL.';
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
            console.error('Mic Access Error:', err);
            setIsListening(false);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setError('Micrófono bloqueado. Habilítalo en los ajustes de tu teléfono para esta app/navegador.');
            } else {
                setError('No se pudo acceder al micrófono. Verifica que ninguna otra app lo esté usando.');
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

    const saveSettings = (key, model) => {
        // Only save model to local storage, key is strict from env
        localStorage.setItem('openrouter_model', model);
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
                        <div className="p-4 border-b border-white/10 flex items-center bg-gradient-to-r from-[#7c3aed]/20 to-[#22d3ee]/20">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-[#22d3ee]'}`} />
                                <span className="font-bold text-white">El Socio</span>
                            </div>
                        </div>

                        {/* Settings panel */}
                        {showSettings && (
                            <div className="p-4 border-b border-white/10 bg-black/30 space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-2">ApiFreeLLM API Key</label>
                                    <input
                                        type="password"
                                        value={apiKey}
                                        readOnly
                                        placeholder="apf_..."
                                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-gray-400 cursor-not-allowed focus:outline-none"
                                        title="Configurado vía .env"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        API Key configurada en variables de entorno (`VITE_APIFREELLM_API_KEY`).
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
