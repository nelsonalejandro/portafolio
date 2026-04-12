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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="2" width="12" height="3" rx="1" />
                        <rect x="8" y="5" width="8" height="14" rx="1" />
                        <rect x="5" y="19" width="14" height="3" rx="1" />
                    </svg>
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