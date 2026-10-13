import { useMemo } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { buildMonthGrid } from '../lib/date.ts';
import { fullDateText, schedule } from '../lib/wedding.ts';
import { GoldDivider, UzFlower } from './ornaments';

export function WeddingCalendar() {
  const { t } = useI18n();
  const date = schedule.date.status === 'valid' ? schedule.date.value : null;
  const grid = useMemo(() => (date ? buildMonthGrid(date.year, date.month) : null), [date]);

  return (
    <section className="section calendar-section" aria-labelledby="calendar-title" data-reveal>
      <h2 className="section__title" id="calendar-title" data-reveal-item>
        {t.calendar.title}
      </h2>
      <div data-reveal-item><GoldDivider className="section__divider" /></div>

      {!date || !grid ? (
        <div className="tba-card" data-reveal-item>
          <UzFlower size={52} />
          <p>{t.calendar.tba}</p>
        </div>
      ) : (
        <div className="calendar" data-reveal-item>
          <p className="calendar__month">{t.formatMonthYear(date.year, date.month)}</p>
          <table className="calendar__grid">
            <caption className="sr-only">{t.formatMonthYear(date.year, date.month)}</caption>
            <thead>
              <tr>
                {t.calendar.weekdaysShort.map((d, i) => (
                  <th key={d} scope="col">
                    <abbr title={t.calendar.weekdaysFull[i]}>{d}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((week, wi) => (
                <tr key={wi}>
                  {week.map((day, di) => {
                    if (day === null) return <td key={di} className="is-empty" />;
                    const isWedding = day === date.day;
                    return (
                      <td key={di} className={isWedding ? 'is-wedding' : undefined}>
                        {isWedding ? (
                          <span className="calendar__day calendar__day--wedding">
                            <span aria-hidden="true">{day}</span>
                            <span className="sr-only">
                              {day} — {t.calendar.weddingDay}
                            </span>
                          </span>
                        ) : (
                          <span className="calendar__day">{day}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <p className="calendar__full">{fullDateText(t)}</p>
          <p className="calendar__time">
            {schedule.timeText ? (
              <>
                {t.calendar.startsAt}: <strong>{schedule.timeText}</strong>
              </>
            ) : (
              t.calendar.timeTba
            )}
          </p>
        </div>
      )}
    </section>
  );
}
