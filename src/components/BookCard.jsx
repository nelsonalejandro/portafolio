import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import bookCover from '../assets/book_cover.png';

export default function BookCard() {
    const { t } = useTranslation();

    return (
        <section className="book-card sport-card relative overflow-hidden text-[var(--primary)] border border-[#F5C211]/20 no-print">
            <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-[#F5C211] border border-[#F5C211]/50 shadow-[0_0_10px_rgba(245,194,17,0.5)]">
                    <span aria-hidden="true" className="text-[10px]">📚</span>
                    <span>Info actualizada a Marzo 2026</span>
                </span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-2 relative z-10 w-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-black bg-gradient-to-br from-[#F5C211] to-[#D4A70D] shadow-lg shadow-[#F5C211]/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                </div>
            </div>

            {/* Title & Description */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-[var(--font-display)] bg-gradient-to-r from-white via-[#8DB8BF] to-white bg-clip-text text-transparent w-fit animate-gradient-text pb-1">
                    {t('book.title')}
                </h3>

                <p className="text-sm opacity-80 mb-5 mt-2 leading-relaxed">
                    {t('book.description')}
                </p>

                <div className="w-full mb-8 rounded-xl overflow-hidden flex justify-center relative group">
                    <img
                        src={bookCover}
                        alt="Book Cover"
                        className="w-auto h-40 sm:h-48 object-contain transform transition-transform duration-700 group-hover:scale-105 p-4"
                    />
                </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5C211]/15 flex items-center justify-center text-[#F5C211] shrink-0">
                        <CheckCircle size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('book.feature1')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5C211]/15 flex items-center justify-center text-[#F5C211] shrink-0">
                        <Zap size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('book.feature2')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5C211]/15 flex items-center justify-center text-[#F5C211] shrink-0">
                        <BrainCircuit size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('book.feature3')}</span>
                </div>
            </div>

            {/* CTA Button */}
            <a
                href="https://www.book.nelsonramos.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5C211] to-[#D4A70D] text-black font-bold text-sm hover:shadow-lg hover:shadow-[#F5C211]/40 hover:-translate-y-0.5 transition-all duration-300 group"
            >
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                {t('book.cta')}
            </a>
        </section>
    );
}
