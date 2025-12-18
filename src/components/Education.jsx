
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Education() {
    const { t } = useTranslation();

    const education = [
        {
            degree: t('education.degrees.engineer.title'),
            institution: t('education.degrees.engineer.institution'),
            period: t('education.degrees.engineer.period'),
            status: t('education.status.graduated')
        },
        {
            degree: t('education.degrees.technician.title'),
            institution: t('education.degrees.technician.institution'),
            period: t('education.degrees.technician.period'),
            status: t('education.status.graduated')
        },
        {
            degree: t('education.degrees.telecom.title'),
            institution: t('education.degrees.telecom.institution'),
            period: t('education.degrees.telecom.period'),
            status: t('education.status.graduated')
        }
    ];

    return (
        <section className="sport-card !bg-[var(--bg-card)] border border-white/5 p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--bg-input)] rounded-lg text-[var(--primary)]">
                    <GraduationCap size={20} />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary)] font-[var(--font-display)]">{t('education.title')}</h3>
            </div>

            <div className="space-y-6">
                {education.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col"
                    >
                        <h4 className="text-[var(--primary)] font-bold text-sm">{edu.degree}</h4>
                        <span className="text-xs text-[var(--lime-primary)] font-medium mb-1">{edu.institution}</span>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{edu.period}</span>
                            <span>{edu.status}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

