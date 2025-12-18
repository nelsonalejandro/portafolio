
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, BarChart2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const projectKeys = [];

const handleImageError = (e) => {
    e.target.style.display = 'none'; // Hide the broken image
    e.target.nextSibling.style.opacity = 1; // Make gradient fully visible
    e.target.nextSibling.style.background = 'linear-gradient(to right, var(--bg-card), var(--bg-input))'; // Fallback background
};

export default function Projects() {
    const { t } = useTranslation();

    return (
        <section>
            <div className="grid grid-cols-1 gap-4">
                {projectKeys.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative h-64 md:h-72 w-full rounded-[var(--radius-card)] overflow-hidden cursor-pointer sport-card !p-0"
                    >
                        {/* Background Image */}
                        <img
                            src={project.image}
                            alt={t(`projects.items.${project.key}.title`)}
                            onError={handleImageError}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] uppercase font-bold text-white border border-white/10">
                                        {t(`projects.items.${project.key}.type`)}
                                    </span>

                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[var(--lime-primary)] transition-colors">
                                        {t(`projects.items.${project.key}.title`)}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs text-gray-300 mt-2">
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} /> {project.stats.time}
                                        </div>
                                        <div className="flex items-center gap-1 text-[var(--lime-primary)]">
                                            <BarChart2 size={12} /> {project.stats.level}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[var(--lime-primary)] hover:text-black transition-all">
                                    <Play size={16} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
