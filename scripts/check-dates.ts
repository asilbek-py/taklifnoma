/**
 * Sana mantiqini tekshirish: `npm test`
 * Kalendar, vaqt mintaqasi va bo‘sh/noto‘g‘ri sana holatlarini sinaydi.
 */
import assert from 'node:assert/strict';
import {
  buildMonthGrid,
  parseDate,
  parseTime,
  splitDuration,
  weekdayMonFirst,
  zonedTimeToUtc,
} from '../src/lib/date.ts';
import { safeUrl } from '../src/lib/wedding.ts';

let passed = 0;
const check = (name: string, fn: () => void) => {
  fn();
  passed++;
  console.log(`✓ ${name}`);
};

check('bo‘sh sana → missing', () => assert.equal(parseDate('').status, 'missing'));
check('noto‘g‘ri format → invalid', () => assert.equal(parseDate('20.05.2027').status, 'invalid'));
check('mavjud bo‘lmagan kun (30-fevral) → invalid', () => assert.equal(parseDate('2027-02-30').status, 'invalid'));
check('to‘g‘ri sana → valid', () => assert.equal(parseDate('2027-05-20').status, 'valid'));
check('kabisa yili 29-fevral → valid', () => assert.equal(parseDate('2028-02-29').status, 'valid'));
check('vaqt 18:00 → valid', () => assert.equal(parseTime('18:00').status, 'valid'));
check('vaqt 25:00 → invalid', () => assert.equal(parseTime('25:00').status, 'invalid'));
check('bo‘sh vaqt → missing', () => assert.equal(parseTime('  ').status, 'missing'));

check('2027-05-20 — payshanba (dushanbadan: 3)', () => assert.equal(weekdayMonFirst(2027, 5, 20), 3));
check('2026-10-13 — seshanba (1)', () => assert.equal(weekdayMonFirst(2026, 10, 13), 1));

check('May 2027 kalendar to‘ri: 1-may shanba (indeks 5), 31 kun', () => {
  const grid = buildMonthGrid(2027, 5);
  assert.equal(grid[0].indexOf(1), 5);
  const days = grid.flat().filter((d) => d !== null);
  assert.equal(days.length, 31);
  assert.ok(grid.every((w) => w.length === 7));
});

check('Fevral 2027: 1-fevral dushanba, 4 hafta', () => {
  const grid = buildMonthGrid(2027, 2);
  assert.equal(grid[0][0], 1);
  assert.equal(grid.length, 4);
});

check('Toshkent 18:00 = UTC 13:00', () => {
  const ms = zonedTimeToUtc({ year: 2027, month: 5, day: 20 }, { hour: 18, minute: 0 }, 'Asia/Tashkent');
  assert.equal(new Date(ms).toISOString(), '2027-05-20T13:00:00.000Z');
});

check('Noto‘g‘ri vaqt mintaqasi → Asia/Tashkent’ga qaytadi', () => {
  const ms = zonedTimeToUtc({ year: 2027, month: 1, day: 1 }, { hour: 0, minute: 0 }, 'Mars/Olympus');
  assert.equal(new Date(ms).toISOString(), '2026-12-31T19:00:00.000Z');
});

check('O‘tgan sana uchun hisoblagich manfiy emas', () => {
  assert.deepEqual(splitDuration(-5000), { days: 0, hours: 0, minutes: 0, seconds: 0 });
  assert.deepEqual(splitDuration(Number.NaN), { days: 0, hours: 0, minutes: 0, seconds: 0 });
});

check('1 kun 2 soat 3 daqiqa 4 soniya', () => {
  assert.deepEqual(splitDuration(((26 * 60 + 3) * 60 + 4) * 1000), { days: 1, hours: 2, minutes: 3, seconds: 4 });
});

check('Xarita havolasi: bo‘sh/"#"/javascript: → null', () => {
  assert.equal(safeUrl(''), null);
  assert.equal(safeUrl('#'), null);
  assert.equal(safeUrl('javascript:alert(1)'), null);
  assert.ok(safeUrl('https://yandex.uz/maps/-/abc'));
});

console.log(`\nHammasi o‘tdi: ${passed} ta tekshiruv.`);
