import React from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SoftSkills() {
    const { t } = useTranslation();

    return (
        <section className="sport-card !bg-[var(--bg-card)] text-[var(--primary)] border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--lime-primary)] rounded-lg text-black">
                    <Heart size={20} />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary)] font-[var(--font-display)]">{t('softSkills.title')}</h3>
            </div>

            <div className="space-y-3">
                {t('softSkills.items', { returnObjects: true }).map((skill, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                    >
                        <CheckCircle className="text-[var(--lime-primary)] mt-0.5 flex-shrink-0" size={16} />
                        <p className="text-sm text-[var(--text-muted)]">{skill}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
