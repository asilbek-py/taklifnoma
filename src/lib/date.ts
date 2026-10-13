/**
 * Sana va vaqt bilan ishlash uchun sof (DOM’siz) yordamchi funksiyalar.
 * Kalendar, orqaga sanoq, hero’dagi qisqa sana va meta-ma’lumotlar
 * hammasi shu yerdagi bitta manbadan hisoblanadi.
 */

export interface ParsedDate {
  year: number;
  /** 1–12 */
  month: number;
  day: number;
}

export interface ParsedTime {
  hour: number;
  minute: number;
}

export type Field<T> =
  | { status: 'missing' }
  | { status: 'invalid'; raw: string }
  | { status: 'valid'; value: T };

export function parseDate(raw: string | undefined | null): Field<ParsedDate> {
  const s = (raw ?? '').trim();
  if (!s) return { status: 'missing' };
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return { status: 'invalid', raw: s };
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (
    year < 1900 ||
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day
  ) {
    return { status: 'invalid', raw: s };
  }
  return { status: 'valid', value: { year, month, day } };
}

export function parseTime(raw: string | undefined | null): Field<ParsedTime> {
  const s = (raw ?? '').trim();
  if (!s) return { status: 'missing' };
  const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(s);
  if (!m) return { status: 'invalid', raw: s };
  return { status: 'valid', value: { hour: Number(m[1]), minute: Number(m[2]) } };
}

export const pad2 = (n: number): string => String(Math.max(0, Math.floor(n))).padStart(2, '0');

export function formatTime(t: ParsedTime): string {
  return `${pad2(t.hour)}:${pad2(t.minute)}`;
}

/** Hafta kuni indeksi, dushanbadan boshlab: 0 = dushanba … 6 = yakshanba. */
export function weekdayMonFirst(year: number, month: number, day: number): number {
  return (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/**
 * Oyning to‘liq kalendar to‘rini quradi (hafta dushanbadan boshlanadi).
 * Bo‘sh kataklar null bilan to‘ldiriladi, har bir qator 7 katak.
 */
export function buildMonthGrid(year: number, month: number): (number | null)[][] {
  const lead = weekdayMonFirst(year, month, 1);
  const total = daysInMonth(year, month);
  const cells: (number | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** Berilgan UTC lahzada vaqt mintaqasining UTC’dan farqi (ms). */
function tzOffsetMs(utcMs: number, tz: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const p: Record<string, number> = {};
  for (const part of dtf.formatToParts(new Date(utcMs))) {
    if (part.type !== 'literal') p[part.type] = Number(part.value);
  }
  const hour = p.hour === 24 ? 0 : p.hour;
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, hour, p.minute, p.second);
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/**
 * Mahalliy sana+vaqtni (masalan, Toshkent bo‘yicha 2027-05-20 18:00)
 * aniq UTC lahzaga (ms) aylantiradi. Mehmonning qurilma mintaqasiga bog‘liq emas.
 */
export function zonedTimeToUtc(date: ParsedDate, time: ParsedTime, timeZone: string): number {
  const tz = isValidTimeZone(timeZone) ? timeZone : 'Asia/Tashkent';
  const guess = Date.UTC(date.year, date.month - 1, date.day, time.hour, time.minute, 0);
  let result = guess - tzOffsetMs(guess, tz);
  const second = guess - tzOffsetMs(result, tz);
  if (second !== result) result = second;
  return result;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Qolgan vaqtni bo‘laklarga ajratadi. Hech qachon manfiy yoki NaN qaytarmaydi. */
export function splitDuration(ms: number): CountdownParts {
  const safe = Number.isFinite(ms) && ms > 0 ? ms : 0;
  const totalSeconds = Math.floor(safe / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
