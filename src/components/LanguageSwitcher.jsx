import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const toggleLanguage = () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--lime-primary)]/30 transition-all text-[var(--primary)] text-sm font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Globe size={16} className="text-[var(--lime-primary)]" />
            <span className="uppercase font-bold">{currentLang === 'es' ? 'ES' : 'EN'}</span>
            <div className="flex gap-1">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${currentLang === 'es' ? 'bg-[var(--lime-primary)]' : 'bg-gray-400'}`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${currentLang === 'en' ? 'bg-[var(--lime-primary)]' : 'bg-gray-400'}`} />
            </div>
        </motion.button>
    );
}
