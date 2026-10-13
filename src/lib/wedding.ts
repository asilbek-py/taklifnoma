/**
 * Config’dan olingan qiymatlarni bir joyda hisoblaydi.
 * Kalendar, hero, orqaga sanoq va meta-ma’lumotlar shu natijadan foydalanadi —
 * shuning uchun ular hech qachon bir-biriga zid bo‘lmaydi.
 */
import { wedding, type Language } from '../config/wedding.ts';
import type { Dictionary } from '../i18n/types.ts';
import {
  parseDate,
  parseTime,
  weekdayMonFirst,
  zonedTimeToUtc,
  formatTime,
  type Field,
  type ParsedDate,
  type ParsedTime,
} from './date.ts';

export interface Schedule {
  date: Field<ParsedDate>;
  time: Field<ParsedTime>;
  /** Sana valid bo‘lsa — hafta kuni (0 = dushanba) */
  weekdayIndex: number | null;
  /** Sana va vaqt ikkalasi valid bo‘lsa — to‘y boshlanishining aniq UTC lahzasi */
  startMs: number | null;
  timeText: string | null;
}

export function getSchedule(): Schedule {
  const date = parseDate(wedding.weddingDate);
  const time = parseTime(wedding.weddingTime);
  const weekdayIndex =
    date.status === 'valid' ? weekdayMonFirst(date.value.year, date.value.month, date.value.day) : null;
  const startMs =
    date.status === 'valid' && time.status === 'valid'
      ? zonedTimeToUtc(date.value, time.value, wedding.timeZone)
      : null;
  return {
    date,
    time,
    weekdayIndex,
    startMs,
    timeText: time.status === 'valid' ? formatTime(time.value) : null,
  };
}

export const schedule = getSchedule();

export function coupleLine(t: Dictionary): string {
  return `${wedding.groomName.trim()} ${t.and} ${wedding.brideName.trim()}`;
}

/** Tilga mos to‘liq sana matni yoki null (sana yo‘q/noto‘g‘ri bo‘lsa). */
export function fullDateText(t: Dictionary, s: Schedule = schedule): string | null {
  if (s.date.status !== 'valid' || s.weekdayIndex === null) return null;
  const { year, month, day } = s.date.value;
  return t.formatFullDate(year, month, day, s.weekdayIndex);
}

export function shortDateText(t: Dictionary, s: Schedule = schedule): string | null {
  if (s.date.status !== 'valid') return null;
  const { year, month, day } = s.date.value;
  const base = t.formatShortDate(year, month, day);
  return s.timeText ? `${base} · ${s.timeText}` : base;
}

export function pageTitle(t: Dictionary): string {
  return `${coupleLine(t)} | ${t.meta.siteName}`;
}

export function pageDescription(t: Dictionary): string {
  const date = shortDateText(t);
  return t.meta.description(coupleLine(t), date);
}

/** Faqat to‘g‘ri http(s) havolani qaytaradi, aks holda null — "#" tugmalar chiqmaydi. */
export function safeUrl(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  try {
    const u = new URL(s);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}

export interface VenueInfo {
  name: string;
  city: string;
  address: string;
  landmark: string;
  googleUrl: string | null;
  yandexUrl: string | null;
  hasAny: boolean;
}

export function getVenue(lang: Language): VenueInfo {
  const pick = (base: string, ruValue: string) =>
    (lang === 'ru' && ruValue.trim() ? ruValue : base).trim();
  const name = pick(wedding.venueName, wedding.venueNameRu);
  const city = pick(wedding.city, wedding.cityRu);
  const address = pick(wedding.address, wedding.addressRu);
  const landmark = pick(wedding.landmark, wedding.landmarkRu);
  return {
    name,
    city,
    address,
    landmark,
    googleUrl: safeUrl(wedding.googleMapsUrl),
    yandexUrl: safeUrl(wedding.yandexMapsUrl),
    hasAny: Boolean(name || city || address),
  };
}
