import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { wedding } from '../config/wedding.ts';
import { useI18n } from '../i18n/I18nProvider';
import { useMusic } from '../music/MusicProvider';
import { useReducedMotion } from '../lib/useReducedMotion';
import { Pomegranate, WaxSeal } from './ornaments';

interface Props {
  /** Muhr bosilgan zahoti (animatsiya boshlanishi) */
  onOpenStart: () => void;
  /** Animatsiya tugagach — konvert olib tashlanadi */
  onOpened: () => void;
}

const OPEN_MS = 1600;
const OPEN_MS_REDUCED = 180;

export function EnvelopeIntro({ onOpenStart, onOpened }: Props) {
  const { t } = useI18n();
  const music = useMusic();
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const locked = useRef(false);
  const finished = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const sealRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    sealRef.current?.focus({ preventScroll: true });
    return () => window.clearTimeout(timer.current);
  }, []);

  const finishOpening = useCallback(() => {
    if (!locked.current || finished.current) return;
    finished.current = true;
    window.clearTimeout(timer.current);
    onOpened();
  }, [onOpened]);

  const handleOpen = () => {
    if (locked.current) return; // takroriy bosishlar animatsiyani buzmaydi
    locked.current = true;
    // play() aynan foydalanuvchi bosishi ichida chaqiriladi
    music.play();
    setOpening(true);
    onOpenStart();
    // The transition event is authoritative; the timer covers interrupted transitions.
    timer.current = window.setTimeout(finishOpening, (reduced ? OPEN_MS_REDUCED : OPEN_MS) + 150);
  };

  return (
    <div
      className={`envelope${opening ? ' is-opening' : ''}${reduced ? ' is-reduced' : ''}`}
      style={{ '--envelope-duration': `${OPEN_MS}ms`, '--envelope-reduced-duration': `${OPEN_MS_REDUCED}ms` } as CSSProperties}
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && event.propertyName === 'opacity') finishOpening();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="envelope-title"
    >
      <div className="envelope__back" aria-hidden="true" />

      <div className="envelope__letter" aria-hidden="true">
        <Pomegranate size={44} />
        <span className="envelope__letter-names">
          {wedding.groomName} {t.and} {wedding.brideName}
        </span>
      </div>

      <svg className="envelope__fold envelope__fold--left" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <polygon points="0,0 49,55 0,100" className="fold fold--side" />
      </svg>
      <svg className="envelope__fold envelope__fold--right" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <polygon points="100,0 51,55 100,100" className="fold fold--side" />
      </svg>
      <svg className="envelope__fold envelope__fold--bottom" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <polygon points="0,100 50,52 100,100" className="fold fold--bottom" />
      </svg>

      <div className="envelope__flap" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          <polygon points="0,0 100,0 50,100" className="fold fold--flap" />
          <polyline points="5,0 50,90 95,0" className="fold-line" />
        </svg>
      </div>

      <div className="envelope__frame" aria-hidden="true" />

      <div className="envelope__content">
        <h2 className="envelope__invited" id="envelope-title">
          <span className="envelope__invited-top">{t.envelope.invitedTop}</span>
          <span className="envelope__invited-bottom">{t.envelope.invitedBottom}</span>
        </h2>
        <p className="envelope__signature">
          <span className="envelope__with-love">{t.envelope.withLove}</span>
          <span className="envelope__names">
            <span className="nowrap">{wedding.groomName}</span> {t.and}{' '}
            <span className="nowrap">{wedding.brideName}</span>
          </span>
        </p>
      </div>

      <button
        ref={sealRef}
        type="button"
        className="seal"
        onClick={handleOpen}
        aria-label={t.envelope.openAria}
        aria-disabled={opening || undefined}
      >
        <WaxSeal className="seal__wax" />
        <span className="seal__label" aria-hidden="true">
          {t.envelope.open}
        </span>
      </button>
    </div>
  );
}
