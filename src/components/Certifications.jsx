import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Certifications() {
    const { t } = useTranslation();

    const platformColors = {
        'Platzi': 'bg-green-500/10 text-green-500 border-green-500/20',
        'Google': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        'Udemy': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        'Telefónica': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
        'HackerRank': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        'LinkedIn Learning': 'bg-blue-600/10 text-blue-600 border-blue-600/20'
    };

    return (
        <section className="sport-card !bg-[var(--bg-card)] text-[var(--primary)] border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--lime-primary)] rounded-lg text-black">
                    <Award size={20} />
                </div>
                <h3 className="text-xl font-bold font-[var(--font-display)]">{t('certifications.title')}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {t('certifications.platforms', { returnObjects: true }).map((platform, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className={`p-3 rounded-xl border ${platformColors[platform] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'} backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{platform}</span>
                            <ExternalLink size={12} className="opacity-50" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
