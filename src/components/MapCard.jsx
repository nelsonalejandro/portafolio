import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MapCard() {
    const { t } = useTranslation();

    return (
        <section className="sport-card !bg-[var(--lime-primary)] text-black p-6 mt-8 no-print">
            <h3 className="text-lg font-bold mb-2">{t('mapCard.title')}</h3>
            <p className="text-xs font-medium mb-6 opacity-80">{t('mapCard.description')}</p>
            <div className="w-full h-64 rounded-xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850!2d-71.653858!3d-35.4260366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6a2ac07d07d:0x265657feafdac8b8!2sTalca%2C%20Maule!5e0!3m2!1ses!2scl!4v1234567890!5m2!1ses!2scl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Talca"
                ></iframe>
            </div>
        </section>
    );
}