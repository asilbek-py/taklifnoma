import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { useMusic } from '../music/MusicProvider';

/** Yuqori chapdagi doimiy play/pause tugmasi. Audio’ning haqiqiy holatini ko‘rsatadi. */
export function MusicPlayer() {
  const { t } = useI18n();
  const { status, attempted, toggle } = useMusic();
  const playing = status === 'playing';
  const [showError, setShowError] = useState(false);
  const [interacted, setInteracted] = useState(false);

  // Xato xabari faqat foydalanuvchi ijro qilishga uringach va qisqa muddat ko‘rinadi
  useEffect(() => {
    if (status === 'error' && attempted && interacted) {
      setShowError(true);
      const id = window.setTimeout(() => setShowError(false), 4500);
      return () => window.clearTimeout(id);
    }
    setShowError(false);
    return undefined;
  }, [status, attempted, interacted]);

  const hint = status === 'blocked' ? t.music.tapToPlay : showError ? t.music.unavailable : '';

  return (
    <div className="music">
      <button
        type="button"
        className={`music__btn${playing ? ' is-playing' : ''}${status === 'error' ? ' is-error' : ''}`}
        onClick={() => {
          setInteracted(true);
          toggle();
        }}
        aria-pressed={playing}
        aria-label={playing ? t.music.pause : t.music.play}
        title={playing ? t.music.pause : t.music.play}
      >
        <span className="music__pulse" aria-hidden="true" />
        <span className="music__bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        {!playing && (
          <svg className="music__play" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </button>
      <p className={`music__hint${hint ? ' is-visible' : ''}`} role="status" aria-live="polite">
        {hint}
      </p>
    </div>
  );
}
