import type { Language } from '../config/wedding.ts';

export interface Dictionary {
  code: Language;
  /** Til tugmasida ko‘rinadigan qisqa nom */
  short: string;
  /** Tilning to‘liq nomi (screen reader uchun) */
  name: string;
  htmlLang: string;
  ogLocale: string;

  /** Ismlar orasidagi bog‘lovchi: "va" / "и" */
  and: string;

  meta: {
    siteName: string;
    description: (couple: string, dateText: string | null) => string;
  };

  controls: {
    languageGroup: string;
    switchTo: (languageName: string) => string;
  };

  music: {
    play: string;
    pause: string;
    tapToPlay: string;
    unavailable: string;
  };

  envelope: {
    invitedTop: string;
    invitedBottom: string;
    withLove: string;
    open: string;
    openAria: string;
  };

  hero: {
    readInvitation: string;
    dateTba: string;
  };

  letter: {
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  calendar: {
    title: string;
    months: string[];
    weekdaysShort: string[];
    weekdaysFull: string[];
    tba: string;
    startsAt: string;
    timeTba: string;
    weddingDay: string;
  };

  venue: {
    title: string;
    tba: string;
    cityLabel: string;
    addressLabel: string;
    landmarkLabel: string;
    openYandex: string;
    openGoogle: string;
    newTab: string;
    copy: string;
    copied: string;
    copyFailed: string;
  };

  countdown: {
    title: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    waiting: string;
    passed: string;
  };

  footer: {
    thanks: string;
  };

  formatFullDate: (year: number, month: number, day: number, weekdayIndex: number) => string;
  formatShortDate: (year: number, month: number, day: number) => string;
  formatMonthYear: (year: number, month: number) => string;
}
