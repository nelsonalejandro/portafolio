import React from 'react';
import { ArrowRight, Camera, LockOpen, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CVGeneratorCard() {
    const { t } = useTranslation();
    const gradId = React.useId();

    return (
        <section className="cv-generator-card sport-card relative overflow-hidden text-[var(--primary)] border border-green-500/20 no-print">
            <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-yellow-300/50 shadow-[0_0_10px_rgba(253,224,71,0.5)]">
                    <span aria-hidden="true">🚧</span>
                    {t('cvGenerator.badge')}
                </span>
            </div>

            <div className="flex items-center justify-between mb-2 relative z-10 w-full">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-green-500/30 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" className="w-full h-full">
                        <defs>
                            <linearGradient id={`${gradId}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        <rect width="64" height="64" rx="12" fill={`url(#${gradId}-grad)`} />

                        <g transform="translate(16, 12)">
                            <rect x="0" y="0" width="32" height="40" rx="2" fill="white" opacity="0.95" />

                            <line x1="6" y1="8" x2="26" y2="8" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="6" y1="14" x2="26" y2="14" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="6" y1="20" x2="20" y2="20" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />

                            <circle cx="24" cy="28" r="6" fill="#22c55e" />
                            <path d="M 21 28 L 23 30 L 27 26" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </g>
                    </svg>
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-[var(--font-display)] bg-gradient-to-r from-[#22c55e] via-[#a7f3d0] via-[#fef3c7] to-[#e9d5ff] bg-clip-text text-transparent w-fit animate-gradient-text pb-1">
                    {t('cvGenerator.title')}
                </h3>

                <p className="text-sm opacity-80 mb-5 mt-2 leading-relaxed">
                    {t('cvGenerator.description')}
                </p>

                <div className="hero-visual animate-fadeInRight animation-delay-200">
                    <div className="hero-mockup">
                        <div className="mockup-header">
                            <div className="mockup-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                        <div className="mockup-content">
                            <div className="mockup-avatar"></div>
                            <div className="mockup-text">
                                <div className="mockup-line w-60"></div>
                                <div className="mockup-line w-40"></div>
                            </div>
                            <div className="mockup-section">
                                <div className="mockup-line w-30"></div>
                                <div className="mockup-line w-80"></div>
                                <div className="mockup-line w-70"></div>
                            </div>
                            <div className="mockup-section">
                                <div className="mockup-line w-30"></div>
                                <div className="mockup-line w-90"></div>
                                <div className="mockup-line w-60"></div>
                            </div>
                        </div>
                        <div className="mockup-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles" aria-hidden="true">
                                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                                <path d="M20 2v4" />
                                <path d="M22 4h-4" />
                                <circle cx="4" cy="20" r="2" />
                            </svg>
                            <span>IA</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center text-green-500 shrink-0">
                        <Sparkles size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('cvGenerator.feature1')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-500 shrink-0">
                        <Camera size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('cvGenerator.feature2')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center text-violet-500 shrink-0">
                        <LockOpen size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('cvGenerator.feature3')}</span>
                </div>
            </div>

            <a
                href="https://autocreativa.com/cv-generator/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-bold text-sm hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300 group"
            >
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                {t('cvGenerator.cta')}
            </a>
        </section>
    );
}
