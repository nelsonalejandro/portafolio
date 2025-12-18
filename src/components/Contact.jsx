import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram, Facebook, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t } = useTranslation();
    const [showEmail, setShowEmail] = useState(false);
    const [copied, setCopied] = useState(false);

    const email = "nelsonalejandroramosrivera@gmail.com";

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <section className="sport-card !bg-[var(--lime-primary)] text-black p-6 flex flex-col items-center text-center no-print">
            <h3 className="text-lg font-bold mb-2">{t('contact.title')}</h3>
            <p className="text-xs font-medium mb-6 opacity-80">{t('contact.subtitle')}</p>

            <div className="w-full mb-4">
                <button
                    onClick={() => setShowEmail(!showEmail)}
                    className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                    <Mail size={16} /> {t('contact.cta')}
                </button>

                {showEmail && (
                    <div className="mt-3 p-3 bg-black/10 rounded-lg animate-in fade-in duration-300">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={email}
                                readOnly
                                className="flex-1 bg-transparent text-sm font-medium outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="p-1 hover:bg-black/20 rounded transition-colors"
                                title="Copiar email"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {copied && (
                    <p className="text-xs text-black/70 mt-1 animate-in fade-in duration-300">¡Copiado!</p>
                )}
            </div>

            <div className="flex gap-4">
                <a 
                    href="https://github.com/nelsonalejandro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors"
                    aria-label="GitHub"
                >
                    <Github size={20} />
                </a>
                <a 
                    href="https://www.linkedin.com/in/nelsonalejandroramosrivera/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={20} />
                </a>
                <a 
                    href="https://www.instagram.com/nelsonalejandroramos/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors"
                    aria-label="Instagram"
                >
                    <Instagram size={20} />
                </a>
                <a 
                    href="https://www.facebook.com/nelsonalejandro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors"
                    aria-label="Facebook"
                >
                    <Facebook size={20} />
                </a>
            </div>
        </section>
    );
}
