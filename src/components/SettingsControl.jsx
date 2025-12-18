import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Languages } from 'lucide-react';

export default function SettingsControl() {
    const { i18n } = useTranslation();
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Init theme
        if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            setTheme('light');
            document.documentElement.classList.add('light');
        } else {
            setTheme('dark');
            document.documentElement.classList.remove('light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (newTheme === 'light') {
            document.documentElement.classList.add('light');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.remove('light');
            localStorage.theme = 'dark';
        }
    };

    const toggleLang = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 p-2 bg-[#1c1c1e] rounded-full border border-white/10 shadow-lg">

            {/* Lang Switcher */}
            <button
                onClick={toggleLang}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white flex items-center gap-1 text-xs font-bold"
                aria-label="Toggle Language"
            >
                <Languages size={16} />
                <span>{i18n.language.toUpperCase()}</span>
            </button>

            <div className="w-px h-4 bg-white/20"></div>

            {/* Theme Switcher */}
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
        </div>
    );
}
