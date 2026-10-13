import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { getVenue } from '../lib/wedding.ts';
import { GoldDivider, Pomegranate } from './ornaments';

type CopyState = 'idle' | 'copied' | 'failed';

const mapPin = (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* zaxira usulga o‘tamiz */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function VenueSection() {
  const { t, lang } = useI18n();
  const venue = getVenue(lang);
  const [copy, setCopy] = useState<CopyState>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyValue = [venue.name, venue.address, venue.city, venue.landmark && `${t.venue.landmarkLabel}: ${venue.landmark}`]
    .filter(Boolean)
    .join(', ');

  const onCopy = async () => {
    const ok = await copyText(copyValue);
    setCopy(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopy('idle'), ok ? 2500 : 6000);
  };

  return (
    <section className="section venue-section" aria-labelledby="venue-title" data-reveal>
      <h2 className="section__title" id="venue-title" data-reveal-item>
        {t.venue.title}
      </h2>
      <div data-reveal-item><GoldDivider className="section__divider" /></div>

      <div className="venue" data-reveal-item>
        {!venue.hasAny ? (
          <div className="venue__empty">
            <Pomegranate size={52} />
            <p>{t.venue.tba}</p>
          </div>
        ) : (
          <>
          {venue.name && <p className="venue__name">{venue.name}</p>}
          <dl className="venue__details">
            {venue.city && (
              <div>
                <dt>{t.venue.cityLabel}</dt>
                <dd>{venue.city}</dd>
              </div>
            )}
            {venue.address && (
              <div>
                <dt>{t.venue.addressLabel}</dt>
                <dd>{venue.address}</dd>
              </div>
            )}
            {venue.landmark && (
              <div>
                <dt>{t.venue.landmarkLabel}</dt>
                <dd>{venue.landmark}</dd>
              </div>
            )}
          </dl>
          </>
        )}

          <div className="venue__actions">
            {venue.yandexUrl ? (
              <a className="venue__map" href={venue.yandexUrl} target="_blank" rel="noopener noreferrer">
                <span className="venue__map-icon">{mapPin}</span>
                <span className="venue__map-label"><strong>{t.venue.openYandex}</strong><span>{t.venue.mapProvider}</span></span>
                <span className="venue__map-arrow" aria-hidden="true">↗</span>
                <span className="sr-only"> ({t.venue.newTab})</span>
              </a>
            ) : (
              <>
                <button type="button" className="venue__map" disabled aria-describedby="map-pending">
                  <span className="venue__map-icon">{mapPin}</span>
                  <span className="venue__map-label"><strong>{t.venue.openYandex}</strong><span>{t.venue.mapProvider}</span></span>
                  <span className="venue__map-arrow" aria-hidden="true">↗</span>
                </button>
                <p className="venue__map-pending" id="map-pending">{t.venue.mapPending}</p>
              </>
            )}
            {(venue.googleUrl || copyValue) && (
              <div className="venue__secondary">
                {venue.googleUrl && (
                  <a className="btn btn--ghost" href={venue.googleUrl} target="_blank" rel="noopener noreferrer">
                    {t.venue.openGoogle}<span className="sr-only"> ({t.venue.newTab})</span>
                  </a>
                )}
                {copyValue && <button type="button" className="btn btn--ghost" onClick={onCopy}>{t.venue.copy}</button>}
              </div>
            )}
          </div>
          <p className={`venue__status is-${copy}`} role="status" aria-live="polite">
            {copy === 'copied' ? t.venue.copied : copy === 'failed' ? t.venue.copyFailed : ''}
          </p>
        </div>
    </section>
  );
}
