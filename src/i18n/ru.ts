import type { Dictionary } from './types.ts';

/**
 * RUSCHA MATNLAR (РУССКИЙ ТЕКСТ)
 * Rus tilidagi barcha yozuvlar shu faylda.
 * Ismlar o‘zgarmaydi: "Asilbek" va "Masturaxon" — src/config/wedding.ts dan olinadi.
 */

const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];
const monthsGenitive = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];
const weekdaysFull = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const ru: Dictionary = {
  code: 'ru',
  short: 'RU',
  name: 'Русский',
  htmlLang: 'ru',
  ogLocale: 'ru_RU',
  and: 'и',

  meta: {
    siteName: 'Свадебное приглашение',
    description: (couple, dateText) =>
      dateText
        ? `${couple} — приглашение на свадьбу. ${dateText}.`
        : `${couple} — приглашение на свадьбу.`,
  },

  controls: {
    languageGroup: 'Выбор языка',
    switchTo: (languageName) => `Язык: ${languageName}`,
  },

  music: {
    play: 'Включить музыку',
    pause: 'Остановить музыку',
    tapToPlay: 'Нажмите, чтобы включить музыку',
    unavailable: 'Музыка сейчас недоступна',
  },

  envelope: {
    invitedTop: 'Вы приглашены',
    invitedBottom: 'на нашу свадьбу',
    withLove: 'С любовью,',
    open: 'Открыть',
    openAria: 'Открыть приглашение',
  },

  hero: {
    readInvitation: 'Прокрутите вниз',
    dateTba: 'Дата свадьбы будет объявлена в ближайшее время',
  },

  letter: {
    greeting: 'Дорогие и близкие нам люди!',
    paragraphs: [
      'Приближается самый важный и радостный день в нашей жизни — наша свадьба. Нам хочется встретить эти счастливые мгновения в кругу самых родных и дорогих людей.',
      'От всего сердца приглашаем вас на наше свадебное торжество. Ваши добрые пожелания и искренние улыбки сделают этот день для нас ещё светлее.',
    ],
    closing: 'С нетерпением ждём возможности разделить с вами нашу радость.',
    signature: 'С уважением,',
  },

  calendar: {
    title: 'Дата свадьбы',
    months,
    weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    weekdaysFull,
    tba: 'Дата свадьбы будет объявлена в ближайшее время',
    startsAt: 'Начало',
    timeTba: 'Время начала будет объявлено в ближайшее время',
    weddingDay: 'день свадьбы',
  },

  venue: {
    title: 'Место торжества',
    tba: 'Адрес будет объявлен в ближайшее время',
    cityLabel: 'Город / район',
    addressLabel: 'Адрес',
    landmarkLabel: 'Ориентир',
    openYandex: 'Открыть в Яндекс Картах',
    openGoogle: 'Открыть в Google Maps',
    newTab: 'откроется в новой вкладке',
    copy: 'Скопировать адрес',
    copied: 'Адрес скопирован',
    copyFailed: 'Не удалось скопировать. Выделите адрес вручную.',
  },

  countdown: {
    title: 'Считаем каждое мгновение',
    days: 'Дней',
    hours: 'Часов',
    minutes: 'Минут',
    seconds: 'Секунд',
    waiting: 'Ждём вас с нетерпением.',
    passed: 'Этот радостный день настал. Спасибо за ваши тёплые пожелания!',
  },

  footer: {
    thanks: 'С вами этот день ещё прекраснее!',
  },

  formatFullDate: (year, month, day, weekdayIndex) =>
    `${day} ${monthsGenitive[month - 1]} ${year} г., ${weekdaysFull[weekdayIndex].toLowerCase()}`,
  formatShortDate: (year, month, day) => `${day} ${monthsGenitive[month - 1]} ${year} г.`,
  formatMonthYear: (year, month) => `${months[month - 1]} ${year}`,
};
