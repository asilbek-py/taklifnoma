import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { getVenue } from '../lib/wedding.ts';
import { GoldDivider, Pomegranate } from './ornaments';

type CopyState = 'idle' | 'copied' | 'failed';

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

      {!venue.hasAny ? (
        <div className="tba-card" data-reveal-item>
          <Pomegranate size={52} />
          <p>{t.venue.tba}</p>
        </div>
      ) : (
        <div className="venue" data-reveal-item>
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

          <div className="venue__actions">
            {venue.yandexUrl && (
              <a className="btn btn--primary" href={venue.yandexUrl} target="_blank" rel="noopener noreferrer">
                {t.venue.openYandex}
                <span className="sr-only"> ({t.venue.newTab})</span>
              </a>
            )}
            {venue.googleUrl && (
              <a className="btn btn--primary" href={venue.googleUrl} target="_blank" rel="noopener noreferrer">
                {t.venue.openGoogle}
                <span className="sr-only"> ({t.venue.newTab})</span>
              </a>
            )}
            <button type="button" className="btn btn--ghost" onClick={onCopy}>
              {t.venue.copy}
            </button>
          </div>
          <p className={`venue__status is-${copy}`} role="status" aria-live="polite">
            {copy === 'copied' ? t.venue.copied : copy === 'failed' ? t.venue.copyFailed : ''}
          </p>
        </div>
      )}
    </section>
  );
}
