import React from 'react';
import { ArrowRight, Code, Coffee, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aseoFacilHero from '../assets/aseo-facil-hero-transparent.png';

export default function AseoFacilCard() {
    const { t } = useTranslation();
    const gradId = React.useId();

    return (
        <section className="aseo-facil-card sport-card relative overflow-hidden text-[var(--primary)] border border-blue-500/20 no-print mt-8">
            <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-yellow-300/50 shadow-[0_0_10px_rgba(253,224,71,0.5)]">
                    <span aria-hidden="true">🚧</span>
                    {t('aseoFacil.badge')}
                </span>
            </div>

            <div className="flex items-center justify-between mb-2 relative z-10 w-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[#d9f99d] to-[#84cc16] shadow-lg shadow-[#84cc16]/30 shrink-0">
                    <span aria-hidden="true">🧹</span>
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-[var(--font-display)] bg-gradient-to-r from-[#84cc16] via-[#d9f99d] via-[#fef08a] to-[#ffffff] bg-clip-text text-transparent w-fit animate-gradient-text pb-1">
                    {t('aseoFacil.title')}
                </h3>

                <p className="text-sm opacity-80 mb-6 mt-2 leading-relaxed">
                    {t('aseoFacil.description')}
                </p>

                <div className="w-full mb-8 rounded-xl overflow-hidden bg-transparent relative group">
                    <img
                        src={aseoFacilHero}
                        alt="Aseo Fácil Hero App Preview"
                        className="w-full h-auto max-h-48 sm:max-h-56 object-contain transform transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#84cc16]/15 flex items-center justify-center text-[#84cc16] shrink-0">
                        <Code size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('aseoFacil.feature1')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#84cc16]/15 flex items-center justify-center text-[#84cc16] shrink-0">
                        <Coffee size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('aseoFacil.feature2')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#84cc16]/15 flex items-center justify-center text-[#84cc16] shrink-0">
                        <Sparkles size={16} />
                    </div>
                    <span className="text-sm font-medium">{t('aseoFacil.feature3')}</span>
                </div>
            </div>

            <a
                href="https://aseofacil.autocreativa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#84cc16] to-[#4d7c0f] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#84cc16]/25 hover:-translate-y-0.5 transition-all duration-300 group"
            >
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                {t('aseoFacil.cta')}
            </a>
        </section>
    );
}
