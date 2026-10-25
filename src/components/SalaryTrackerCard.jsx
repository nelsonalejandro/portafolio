import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Timer, Lock, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SalaryTrackerCard() {
    const { t } = useTranslation();
    const [cents, setCents] = useState('25');

    useEffect(() => {
        const interval = setInterval(() => {
            setCents(String(Math.floor(Math.random() * 100)).padStart(2, '0'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="salary-tracker-card sport-card relative overflow-hidden text-[var(--primary)] border border-[#24422E]/40 no-print">
            {/* Badge */}
            <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-[#8CF59B] border border-[#8CF59B]/50 shadow-[0_0_10px_rgba(140,245,155,0.4)]">
                    <span aria-hidden="true" className="text-[10px]">🖥️</span>
                    <span>{t('salaryTracker.badge')}</span>
                </span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-2 relative z-10 w-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#8CF59B] bg-gradient-to-br from-[#2C5237] to-[#1C3323] shadow-lg shadow-[#24422E]/40 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2.5" y="7.5" width="19" height="9" rx="3"></rect>
                        <circle cx="6.5" cy="12" r="1.25" fill="currentColor" stroke="none"></circle>
                        <path d="M11 9.75v4.5"></path>
                        <path d="M14.5 9.75H17a1.5 1.5 0 0 1 0 3h-2.5"></path>
                    </svg>
                </div>
            </div>

            {/* Title & Description */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-[var(--font-display)] bg-gradient-to-r from-[#8CF59B] via-[#E2EAE0] to-[#5F7A65] bg-clip-text text-transparent w-fit animate-gradient-text pb-1">
                    {t('salaryTracker.title')}
                </h3>

                <p className="text-sm opacity-80 mb-5 mt-2 leading-relaxed">
                    {t('salaryTracker.description')}
                </p>

                {/* LCD Mockup */}
                <div className="w-full mb-8 rounded-xl overflow-hidden relative group">
                    <div className="rounded-xl bg-[#15291C] border border-[#2D5037] p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.02]">
                        <div className="flex items-center justify-end text-[10px] font-mono tracking-wider text-[#8FA590] mb-2">
                            <span>
                                RATE: <span className="text-[#8CF59B] font-bold">+$0.12 / SEC</span>
                            </span>
                        </div>
                        <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#8CF59B] tracking-wider drop-shadow-[0_0_10px_rgba(140,245,155,0.45)]">
                            $ 359.311,{cents}
                        </div>
                        <div className="mt-3 w-full bg-[#24422E] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#2D5037]">
                            <div className="h-full w-[65%] bg-gradient-to-r from-[#5F7A65] to-[#8CF59B] rounded-full"></div>
                        </div>
                        <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono text-[#D1F2D6]">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8CF59B] animate-pulse"></span>
                            <span>Ganando ahora mismo: <span className="text-[#8CF59B] font-bold">+$0,214/s</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8CF59B]/15 flex items-center justify-center text-[#8CF59B] shrink-0">
                        <Timer size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('salaryTracker.feature1')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8CF59B]/15 flex items-center justify-center text-[#8CF59B] shrink-0">
                        <Lock size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('salaryTracker.feature2')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8CF59B]/15 flex items-center justify-center text-[#8CF59B] shrink-0">
                        <Zap size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('salaryTracker.feature3')}</span>
                </div>
            </div>

            {/* CTA Button */}
            <a
                href="https://salarytracker.autocreativa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#24422E] to-[#1C3323] text-[#8CF59B] font-bold text-sm border border-[#2D5037] hover:shadow-lg hover:shadow-[#8CF59B]/25 hover:-translate-y-0.5 transition-all duration-300 group"
            >
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                {t('salaryTracker.cta')}
            </a>
        </section>
    );
}
