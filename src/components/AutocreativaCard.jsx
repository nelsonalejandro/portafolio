import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AutocreativaCard() {
    const { t } = useTranslation();

    return (
        <section className="autocreativa-card sport-card relative overflow-hidden text-[var(--primary)] border border-purple-500/20 no-print">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 relative z-10 w-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                </div>
            </div>

            {/* Title & Description */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-[var(--font-display)] bg-gradient-to-r from-sky-400 via-violet-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent w-fit animate-gradient-text pb-1">
                    {t('autocreativa.title')}
                </h3>

                <p className="text-sm opacity-80 mb-5 mt-2 leading-relaxed">
                    {t('autocreativa.description')}
                </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-500 shrink-0">
                        <CheckCircle size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('autocreativa.feature1')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-500 shrink-0">
                        <Zap size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('autocreativa.feature2')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--lime-primary)]/15 flex items-center justify-center text-[var(--lime-primary)] shrink-0">
                        <BookOpen size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('autocreativa.feature3')}</span>
                </div>
            </div>

            {/* CTA Button */}
            <a
                href="https://autocreativa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 group"
            >
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                {t('autocreativa.cta')}
            </a>
        </section>
    );
}
