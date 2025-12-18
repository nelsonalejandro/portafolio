import React, { Suspense, useState, useEffect } from 'react';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import SoftSkills from './components/SoftSkills';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Education from './components/Education';
import MapCard from './components/MapCard';
import Contact from './components/Contact';
import Signature from './components/Signature';
import CombinedSkills from './components/CombinedSkills';
import AIChat from './components/AIChat';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="relative w-full min-h-screen text-[var(--primary)] bg-[var(--bg-dark)] font-body selection:bg-[var(--lime-primary)] selection:text-black">

      {/* 3D Background Layer - kept subtle */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Scene3D isSpeaking={isSpeaking} />
        </Suspense>
      </div>

      {/* AI Chat Interface */}
      <AIChat onSpeakingChange={setIsSpeaking} />

      {/* Settings Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <LanguageSwitcher />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {/* Content Layer */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />

        <div className="space-y-8 pb-20">
          {/* Dashboard Grid Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Content Area */}
            <div className="lg:col-span-8 flex flex-col gap-0">
              <About />
              <Projects />
              <Experience />
              <CombinedSkills />
              <Education />
              <MapCard />
            </div>

            {/* Sidebar / Stats Area */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <SoftSkills />
              <Certifications />
              <Contact />
              <Signature theme={theme} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
