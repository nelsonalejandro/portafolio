import React from 'react';
import firmaLightImg from '../assets/firma_light.png';
import firmaImg from '../assets/firma.png';

export default function Signature({ theme }) {
    const firmaSrc = theme === 'dark' ? firmaImg : firmaLightImg;

    return (
        <section className="sport-card !bg-[var(--bg-card)] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--lime-primary)] rounded-lg text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signature"><path d="m21 17-4.37-1.32a3 3 0 0 0-2.38.93L13 17l-1-5 1-1 3 2.5a2.91 2.91 0 0 0 2.62.62L21 17"></path><path d="M3 17h5l1-5H3l1 5Z"></path><path d="M8 12h.01"></path><path d="M17 14h.01"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--primary)] font-[var(--font-display)]">Mi Filosofía</h3>
            </div>
            <div className="mb-4 text-left">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Trabajo bajo una filosofía que me ha permitido entregar proyectos sólidos, eficientes y con un toque único: <strong>Trabajo Remoto y Vibe Coding</strong>.<br /><br />
                    🌍 <strong>Trabajo Remoto</strong><br />
                    No importa dónde estés, puedo desarrollar, optimizar y entregar soluciones sin límites geográficos. Esto me da la flexibilidad de trabajar de forma estratégica, manteniendo un flujo constante y una comunicación ágil para que todo avance sin fricciones.<br /><br />
                    💻 <strong>Vibe Coding</strong><br />
                    Para mí, programar es más que escribir líneas de código: es un ambiente, una energía. Mi kit incluye Cursor para acelerar el desarrollo con IA, VS Code y suite de Jetbrains para personalizar cada proyecto y sí… una buena taza de café y música lo-fi que me acompañan hasta en las madrugadas de inspiración. El resultado: código limpio, escalable y pensado para durar.<br /><br />
                    ✨ <strong>Mi promesa</strong><br />
                    Cada proyecto lo trato como si fuera propio: cuidando los detalles, optimizando recursos y asegurando que el resultado no solo cumpla, sino que impresione. Aquí no hay excusas, solo compromiso y resultados.
                </p>
            </div>
            <div className="mb-4">
                <img
                    src={firmaLightImg}
                    alt="Firma Nelson Ramos"
                    className={`mx-auto h-16 object-contain signature-img ${theme === 'dark' ? 'hidden' : ''}`}
                />
                <img
                    src={firmaImg}
                    alt="Firma Nelson Ramos"
                    className={`mx-auto h-16 object-contain signature-img ${theme === 'light' ? 'hidden' : ''}`}
                />
            </div>
            <div className="border-t border-dashed border-[var(--text-subtle)] pt-2 text-center">
                <p className="text-xs text-[var(--text-subtle)] italic">
                    © Copyleft Nelson Ramos<br />
                    Talca, VII Región del Maule, Chile
                </p>
            </div>
        </section>
    );
}