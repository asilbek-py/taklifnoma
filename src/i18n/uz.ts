import type { Dictionary } from './types.ts';

/**
 * O‘ZBEKCHA MATNLAR
 * Saytdagi barcha o‘zbekcha yozuvlar shu faylda.
 * Taklif matnini o‘zgartirish uchun pastdagi `letter` bo‘limini tahrirlang.
 * Ismlar bu yerda yozilmaydi — ular src/config/wedding.ts dan olinadi.
 */

const months = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
];
const weekdaysFull = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];

export const uz: Dictionary = {
  code: 'uz',
  short: 'UZ',
  name: 'O‘zbekcha',
  htmlLang: 'uz',
  ogLocale: 'uz_UZ',
  and: 'va',

  meta: {
    siteName: 'To‘y taklifnomasi',
    description: (couple, dateText) =>
      dateText
        ? `${couple} — nikoh to‘yiga taklifnoma. ${dateText}.`
        : `${couple} — nikoh to‘yiga taklifnoma.`,
  },

  controls: {
    languageGroup: 'Tilni tanlash',
    switchTo: (languageName) => `Til: ${languageName}`,
    themeToggle: 'Tun rejimi',
    switchToLight: 'Kunduzgi rejimga o‘tish',
    switchToDark: 'Tun rejimiga o‘tish',
    dark: 'Tun',
    light: 'Kun',
  },

  music: {
    play: 'Musiqani yoqish',
    pause: 'Musiqani to‘xtatish',
    tapToPlay: 'Musiqani yoqish uchun bosing',
    unavailable: 'Musiqa hozircha mavjud emas',
  },

  envelope: {
    invitedTop: 'Siz to‘yimizga',
    invitedBottom: 'taklif etilgansiz',
    withLove: 'Muhabbat ila,',
    open: 'Ochish',
    openAria: 'Taklifnomani ochish',
  },

  hero: {
    readInvitation: 'Pastga tushuring',
    dateTba: 'To‘y sanasi tez orada e’lon qilinadi',
  },

  letter: {
    greeting: 'Aziz va qadrdon insonlarimiz!',
    paragraphs: [
      'Hayotimizdagi eng muhim va quvonchli kun — nikoh to‘yimiz yaqinlashmoqda. Bu baxtli lahzalarni eng yaqin, eng aziz insonlarimiz davrasida kutib olishni niyat qildik.',
      'Sizni to‘yimizga chin dildan, mehr bilan taklif etamiz. Duolaringiz va samimiy tabassumingiz bu kunni biz uchun yanada nurli qiladi.',
    ],
    closing: 'Quvonchimizni siz bilan baham ko‘rishni intizorlik bilan kutib qolamiz.',
    signature: 'Hurmat ila,',
  },

  calendar: {
    title: 'To‘y sanasi',
    months,
    weekdaysShort: ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Ya'],
    weekdaysFull,
    tba: 'To‘y sanasi tez orada e’lon qilinadi',
    startsAt: 'Boshlanishi',
    timeTba: 'Boshlanish vaqti tez orada e’lon qilinadi',
    weddingDay: 'to‘y kuni',
  },

  venue: {
    title: 'To‘y manzili',
    tba: 'Manzil tez orada e’lon qilinadi',
    cityLabel: 'Shahar / tuman',
    addressLabel: 'Manzil',
    landmarkLabel: 'Mo‘ljal',
    openYandex: 'Xaritaga o‘tish',
    mapProvider: 'Yandex Xaritalar',
    mapPending: 'Joylashuv tez orada qo‘shiladi',
    openGoogle: 'Google Maps’da ochish',
    newTab: 'yangi oynada ochiladi',
    copy: 'Manzilni nusxalash',
    copied: 'Manzil nusxalandi',
    copyFailed: 'Nusxalab bo‘lmadi. Manzilni barmoq bilan belgilab nusxalang.',
  },

  countdown: {
    title: 'Baxtli kunimizgacha',
    days: 'Kun',
    hours: 'Soat',
    minutes: 'Daqiqa',
    seconds: 'Soniya',
    waiting: 'Sizni intiqlik bilan kutamiz.',
    passed: 'Bu quvonchli kun yetib keldi. Duolaringiz uchun rahmat!',
    pending: 'To‘y sanasi va vaqti tez orada e’lon qilinadi.',
  },

  footer: {
    thanks: 'Siz bilan bu kun yanada go‘zal!',
  },

  formatFullDate: (year, month, day, weekdayIndex) =>
    `${year}-yil ${day}-${months[month - 1].toLowerCase()}, ${weekdaysFull[weekdayIndex].toLowerCase()}`,
  formatShortDate: (year, month, day) => `${day}-${months[month - 1].toLowerCase()}, ${year}-yil`,
  formatMonthYear: (year, month) => `${months[month - 1]}, ${year}`,
};
