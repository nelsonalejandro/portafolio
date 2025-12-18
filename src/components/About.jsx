import React from 'react';
import { motion } from 'framer-motion';
import { User, Globe, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();

    return (
        <section className="sport-card !bg-[var(--bg-card)] text-[var(--primary)] border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--lime-primary)] rounded-lg text-black">
                    <User size={20} />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary)] font-[var(--font-display)]">{t('about.title')}</h3>
            </div>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 whitespace-pre-line">
                {t('about.desc')}
            </p>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <Globe className="text-gray-500 mt-1" size={16} />
                    <div>
                        <h4 className="font-bold text-sm">{t('about.details.global.title')}</h4>
                        <p className="text-xs text-[var(--text-subtle)]">{t('about.details.global.desc')}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Zap className="text-gray-500 mt-1" size={16} />
                    <div>
                        <h4 className="font-bold text-sm">{t('about.details.fast.title')}</h4>
                        <p className="text-xs text-[var(--text-subtle)]">{t('about.details.fast.desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
