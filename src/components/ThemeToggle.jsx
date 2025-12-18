import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ theme, onToggle }) {
    return (
        <motion.button
            onClick={onToggle}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--lime-primary)]/30 transition-all text-[var(--primary)] shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <Moon size={16} className="text-[var(--lime-primary)]" />
                ) : (
                    <Sun size={16} className="text-[var(--lime-primary)]" />
                )}
            </motion.div>
            <span className="text-sm font-medium">
                {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
        </motion.button>
    );
}
