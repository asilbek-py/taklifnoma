import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { pad2, splitDuration } from '../lib/date.ts';
import { schedule } from '../lib/wedding.ts';
import { GoldDivider } from './ornaments';

/**
 * Orqaga sanoq faqat sana VA vaqt to‘g‘ri kiritilganda ko‘rinadi.
 * Hisob config’dagi timeZone (Asia/Tashkent) bo‘yicha — mehmon qurilmasiga bog‘liq emas.
 */
export function Countdown() {
  const { t } = useI18n();
  const target = schedule.startMs;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (target === null) return;
    let id: number | undefined;
    const tick = () => {
      const current = Date.now();
      setNow(current);
      if (current >= target) return; // to‘y vaqti kelgach to‘xtaydi
      id = window.setTimeout(tick, 1000 - (current % 1000) + 10);
    };
    tick();
    // Orqa fondan qaytganda darhol yangilash
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        window.clearTimeout(id);
        tick();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [target]);

  if (target === null) return null;

  const passed = now >= target;
  const parts = splitDuration(target - now);
  const units = [
    { value: String(parts.days), label: t.countdown.days },
    { value: pad2(parts.hours), label: t.countdown.hours },
    { value: pad2(parts.minutes), label: t.countdown.minutes },
    { value: pad2(parts.seconds), label: t.countdown.seconds },
  ];

  return (
    <section className="section countdown-section" aria-labelledby="countdown-title" data-reveal>
      <h2 className="section__title" id="countdown-title" data-reveal-item>
        {t.countdown.title}
      </h2>
      <div data-reveal-item><GoldDivider className="section__divider" /></div>
      {passed ? (
        <p className="countdown__passed" data-reveal-item>{t.countdown.passed}</p>
      ) : (
        <>
          <div className="countdown" role="timer" aria-live="off">
            {units.map((u) => (
              <div className="countdown__unit" key={u.label} data-reveal-item>
                <span className="countdown__value">{u.value}</span>
                <span className="countdown__label">{u.label}</span>
              </div>
            ))}
          </div>
          <p className="countdown__waiting" data-reveal-item>{t.countdown.waiting}</p>
        </>
      )}
    </section>
  );
}
