import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import firmaLightImg from '../assets/firma_light.png';
import firmaImg from '../assets/firma.png';

export default function Signature({ theme }) {
    const { t } = useTranslation();

    return (
        <section className="sport-card !bg-[var(--bg-card)] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--lime-primary)] rounded-lg text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signature"><path d="m21 17-4.37-1.32a3 3 0 0 0-2.38.93L13 17l-1-5 1-1 3 2.5a2.91 2.91 0 0 0 2.62.62L21 17"></path><path d="M3 17h5l1-5H3l1 5Z"></path><path d="M8 12h.01"></path><path d="M17 14h.01"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--primary)] font-[var(--font-display)]">{t('signature.title')}</h3>
            </div>
            <div className="mb-4 text-left">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    <Trans i18nKey="signature.intro" components={{ strong: <strong /> }} /><br /><br />
                    <Trans i18nKey="signature.remote.title" components={{ strong: <strong /> }} /><br />
                    {t('signature.remote.desc')}<br /><br />
                    <Trans i18nKey="signature.vibe.title" components={{ strong: <strong /> }} /><br />
                    {t('signature.vibe.desc')}<br /><br />
                    <Trans i18nKey="signature.promise.title" components={{ strong: <strong /> }} /><br />
                    {t('signature.promise.desc')}
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
                    {t('signature.copyleft')}<br />
                    {t('signature.location')}
                </p>
            </div>
        </section>
    );
}