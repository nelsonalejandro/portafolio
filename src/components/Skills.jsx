import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, X, Code2, Boxes, Database, Wrench, CheckCircle2, Globe2, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SkillBar = ({ name, level }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs mb-1 font-medium">
            <span className="text-[var(--primary)]">{name}</span>
            <span className="text-[var(--text-subtle)]">{level}%</span>
        </div>
        <div className="h-2 w-full bg-[var(--bg-input)] rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-[var(--lime-primary)] rounded-full"
            />
        </div>
    </div>
);

const SkillRing = ({ name, level, color }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="var(--bg-input)" strokeWidth="6" fill="transparent" />
                <motion.circle
                    cx="32" cy="32" r="28"
                    stroke={color || "var(--lime-primary)"}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="175.9"
                    strokeDashoffset="175.9"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 175.9 }}
                    whileInView={{ strokeDashoffset: 175.9 - (175.9 * level) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <span className="absolute text-xs font-bold">{level}%</span>
        </div>
        <span className="text-xs text-[var(--text-subtle)] uppercase tracking-wide">{name}</span>
    </div>
);

export default function Skills() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const hexToRgba = (hex, alpha) => {
        const normalized = hex.replace('#', '');
        const r = parseInt(normalized.substring(0, 2), 16);
        const g = parseInt(normalized.substring(2, 4), 16);
        const b = parseInt(normalized.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const ringStats = [
        { label: "Frontend", percent: 75, color: "#bef264" },
        { label: "Backend", percent: 80, color: "#a855f7" },
        { label: "DevOps", percent: 50, color: "#3b82f6" }
    ];

    const modalSections = [
        {
            key: 'languages',
            title: t('skills.languages.title'),
            items: t('skills.languages.items', { returnObjects: true }),
            Icon: Code2,
            color: '#bef264'
        },
        {
            key: 'frameworks',
            title: t('skills.frameworks.title'),
            items: t('skills.frameworks.items', { returnObjects: true }),
            Icon: Boxes,
            color: '#a855f7'
        },
        {
            key: 'databases',
            title: t('skills.databases.title'),
            items: t('skills.databases.items', { returnObjects: true }),
            Icon: Database,
            color: '#3b82f6'
        },
        {
            key: 'tools',
            title: t('skills.tools.title'),
            items: t('skills.tools.items', { returnObjects: true }),
            Icon: Wrench,
            color: '#f97316'
        },
        {
            key: 'practices',
            title: t('skills.practices.title'),
            items: t('skills.practices.items', { returnObjects: true }),
            Icon: CheckCircle2,
            color: '#22c55e'
        },
        {
            key: 'appliedIn',
            title: t('skills.appliedIn.title'),
            items: t('skills.appliedIn.items', { returnObjects: true }),
            Icon: Globe2,
            color: '#eab308'
        },
        {
            key: 'areas',
            title: t('skills.areas.title'),
            items: t('skills.areas.items', { returnObjects: true }),
            Icon: Layers,
            color: '#14b8a6'
        }
    ];

    return (
        <section className="sport-card !bg-[var(--bg-card)] text-[var(--primary)] border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--lime-primary)] rounded-lg text-black">
                    <Cpu size={20} />
                </div>
                <h3 className="text-xl font-bold font-[var(--font-display)]">{t('skills.title')}</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {ringStats.map((stat) => (
                    <SkillRing key={stat.label} name={stat.label} level={stat.percent} color={stat.color} />
                ))}
            </div>

            <div>
                <div className="mb-6 pb-1">
                    <h4 className="text-xs text-[var(--text-subtle)] uppercase font-bold">{t('skills.topLanguages')}</h4>
                </div>
                <div className="space-y-1">
                    <SkillBar name="JavaScript / TypeScript" level={70} />
                    <SkillBar name="Java" level={70} />
                    <SkillBar name="Python" level={60} />
                </div>
            </div>

            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full mt-6 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--primary)] text-sm font-medium hover:opacity-80 transition-opacity"
            >
                {t('skills.viewFullStack')}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="relative w-full max-w-3xl sport-card !bg-[var(--bg-card)] border border-white/10 p-0 overflow-hidden"
                    >
                        <div
                            className="px-6 py-5"
                            style={{
                                background: `linear-gradient(90deg, ${hexToRgba('#bef264', 0.18)}, ${hexToRgba('#a855f7', 0.14)}, ${hexToRgba('#3b82f6', 0.12)})`
                            }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h4 className="text-xl font-bold text-[var(--primary)] font-[var(--font-display)]">{t('skills.modalTitle')}</h4>
                                    <p className="text-sm text-[var(--text-subtle)] mt-1">{t('skills.topLanguages')} • {t('experience.title')}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="mx-6 mb-6 py-3 w-10 rounded-xl bg-[var(--bg-input)] text-[var(--primary)] text-sm font-medium hover:opacity-80 transition-opacity"
                                    aria-label={t('skills.close')}
                                >
                                    X
                                </button>
                            </div>
                        </div>

                        <div className="px-6 pb-6 pt-5 max-h-[70vh] overflow-auto pr-4 space-y-5">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {modalSections.map((section) => (
                                    <div
                                        key={section.key}
                                        className="rounded-2xl border border-white/10 bg-[var(--bg-card)] p-4"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: hexToRgba(section.color, 0.14) }}
                                            >
                                                <section.Icon size={18} style={{ color: section.color }} />
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-bold text-[var(--primary)] leading-tight">{section.title}</h5>
                                                <p className="text-xs text-[var(--text-subtle)]">{section.items.length} items</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {section.items.map((item, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 rounded-full text-xs border"
                                                    style={{
                                                        backgroundColor: hexToRgba(section.color, 0.10),
                                                        borderColor: hexToRgba(section.color, 0.22),
                                                        color: 'var(--primary)'
                                                    }}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="mx-6 mb-6 py-3 w-32 rounded-xl bg-[var(--bg-input)] text-[var(--primary)] text-sm font-medium hover:opacity-80 transition-opacity"
                            aria-label={t('skills.close')}
                        >
                            {t('skills.close')}
                        </button>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
