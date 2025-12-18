import React from 'react';
import { Cpu, Code2, Boxes, Database, Wrench, CheckCircle2, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CombinedSkills() {
    const { t } = useTranslation();

    const hexToRgba = (hex, alpha) => {
        const normalized = hex.replace('#', '');
        const r = parseInt(normalized.substring(0, 2), 16);
        const g = parseInt(normalized.substring(2, 4), 16);
        const b = parseInt(normalized.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

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
            key: 'areas',
            title: t('skills.areas.title'),
            items: t('skills.areas.items', { returnObjects: true }),
            Icon: Layers,
            color: '#14b8a6'
        }
    ];

    return (
        <section className="sport-card !bg-[var(--bg-card)] text-[var(--primary)] border border-white/5 p-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--lime-primary)] rounded-lg text-black">
                    <Cpu size={20} />
                </div>
                <h3 className="text-xl font-bold font-[var(--font-display)]">{t('skills.title')}</h3>
            </div>


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

        </section>
    );
}