import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import curriculumPdf from '../assets/Curriculum_NelsonRamos.pdf';

const experienceKeys = [
    { key: "entelgy", company: "Entelgy", color: "bg-cyan-500" },
    { key: "junngla", company: "Junngla SPA", color: "bg-green-500" },
    { key: "indra", company: "Indra", color: "bg-blue-500" },
    { key: "fusiona", company: "Fusiona", color: "bg-orange-500" },
    { key: "bolsa", company: "Bolsa de Santiago", color: "bg-purple-500" },
    { key: "escuela", company: "Escuela Felipe Cubillos", color: "bg-yellow-500" },
    { key: "tottus", company: "TOTTUS", color: "bg-red-500" }
];

export default function Experience() {
    const { t } = useTranslation();

    return (
        <section className="sport-card !bg-[var(--bg-card)] border border-white/5 p-6 mt-8">
            <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-bold text-[var(--primary)] font-[var(--font-display)]">{t('experience.title')}</h3>
                <a
                    href={curriculumPdf}
                    download
                    className="bg-[var(--lime-primary)] text-black px-4 py-2 rounded-xl font-bold text-xs hover:bg-opacity-80 transition-colors no-print"
                >
                    {t('experience.downloadCv')}
                </a>
            </div>

            <div className="relative border-l border-white/10 ml-2 space-y-6">
                {experienceKeys.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="pl-6 relative"
                    >
                        <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ${exp.color} ring-4 ring-[var(--bg-card)]`}></div>
                        <h4 className="text-[var(--primary)] font-bold text-sm">{exp.company}</h4>
                        <p className="text-[var(--text-subtle)] text-xs">{t(`experience.roles.${exp.key}.role`)} • {t(`experience.roles.${exp.key}.period`)}</p>
                        <p className="text-[10px] text-[var(--text-subtle)] mt-1">{t(`experience.roles.${exp.key}.desc`)}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
