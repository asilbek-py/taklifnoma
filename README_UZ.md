# Asilbek va Masturaxon — to‘y taklifnomasi

Milliy o‘zbekona uslubdagi, konvert animatsiyali, musiqali to‘y taklifnomasi sayti.
React + TypeScript + Vite. Backend, ma’lumotlar bazasi va login kerak emas — statik sayt, Vercel’da ishlaydi.

> **Ma’lumotlaringizni shu faylda almashtirasiz: `src/config/wedding.ts`**

---

## 1. Ismlarni qayerda o‘zgartirish

`src/config/wedding.ts`:

```ts
groomName: "Asilbek",
brideName: "Masturaxon",
```

Ismlar konvertda, asosiy sahifada, taklif xatida, yakuniy bo‘limda, brauzer sarlavhasida va
ulashish (Telegram/WhatsApp) ma’lumotlarida avtomatik bir xil chiqadi.

## 2. Sana va vaqtni qayerga yozish

```ts
weddingDate: "2027-05-20",   // YYYY-MM-DD (bu faqat namuna!)
weddingTime: "18:00",        // HH:mm, 24 soatlik
timeZone: "Asia/Tashkent",   // o‘zgartirmang
```

Shu ikki qatordan avtomatik hisoblanadi: to‘liq oylik kalendar
(hafta dushanbadan), hafta kuni, boshlanish vaqti, orqaga sanoq va ulashish tavsifi.

| Holat                        | Saytda nima chiqadi                                                       |
| ---------------------------- | ------------------------------------------------------------------------- |
| Sana bo‘sh yoki noto‘g‘ri | Sana e’lon qilinishi haqida izoh, hisoblagichda chiziqlar |
| Sana bor, vaqt yo‘q         | Kalendar va sana chiqadi, hisoblagich vaqt tasdiqlanishini kutadi |
| Sana va vaqt bor             | Sanadan keyin kun, soat va daqiqa bo‘yicha hisoblagich ishlaydi |
| Sana o‘tib ketgan           | Hisoblagich o‘rniga “Bu quvonchli kun yetib keldi…”                   |

## 3. To‘yxona, manzil va mo‘ljal

```ts
venueName: "",   // To‘yxona/restoran nomi
city: "",        // Shahar yoki tuman
address: "",     // To‘liq manzil
landmark: "",    // Mo‘ljal (kerak bo‘lmasa bo‘sh)
```

Rus tilida boshqacha yozilishi kerak bo‘lsa — `venueNameRu`, `cityRu`, `addressRu`, `landmarkRu`
maydonlarini to‘ldiring. Bo‘sh qolsa, rus tilida ham asosiy yozuv ko‘rinadi.
Hamma maydon bo‘sh bo‘lsa — “Manzil tez orada e’lon qilinadi”.

## 4. Google va Yandex xarita havolalari

**Google Maps:** joyni oching → **Ulashish (Share)** → **Havolani nusxalash** → `googleMapsUrl` ga qo‘ying.
**Yandex Maps:** joyni oching → **Ulashish (Поделиться)** → **Havolani nusxalash** → `yandexMapsUrl` ga qo‘ying.

Manzil tagidagi katta **“Xaritaga o‘tish”** tugmasi `yandexMapsUrl` havolasini yangi oynada ochadi.
Yandex havolasi bo‘sh yoki noto‘g‘ri bo‘lsa, tugma “Joylashuv tez orada qo‘shiladi” izohi bilan nofaol turadi.
Google havolasi ixtiyoriy: kiritilgandagina qo‘shimcha tugma chiqadi.
“Manzilni nusxalash” tugmasi manzil kiritilgandagina chiqadi.

## 5. Musiqa (MP3) faylini joylashtirish

1. MP3 faylni shu nom bilan qo‘ying: **`public/audio/wedding-music.mp3`**
2. Boshqa nom ishlatsangiz — `src/config/wedding.ts` dagi `musicSrc` ni yangilang
   (masalan, `public/audio/kuy.mp3` → `musicSrc: "/audio/kuy.mp3"`).
3. Ovoz balandligi: `musicVolume: 0.35` (0…1). iPhone ovozni faqat telefon tugmalari bilan boshqaradi.

Musiqa fayli `public/audio/wedding-music.mp3` ichida. Sahifa ochilganda oldindan yuklanadi,
“Ochish” tugmasi bosilishi bilan ijro boshlanadi.

Qanday ishlaydi:

- Musiqa “Ochish” muhriga bosilganda boshlanadi (brauzerlar ovozli autoplay’ni taqiqlaydi).
- Musiqa tugagach avtomatik boshidan qayta ijro etiladi; mehmon to‘xtatmaguncha takrorlanadi.
- Chapdagi musiqa tugmasi bilan oldinroq yoqilgan bo‘lsa, “Ochish” bosilganda o‘sha joyidan davom etadi; ikkinchi audio yaratilmaydi.
- Yuqori chapdagi tugma — play/pause, ijro vaqtida ekvalayzer va puls harakatlanadi.
- Til almashtirish va scroll musiqani to‘xtatmaydi va boshidan boshlamaydi.
- Brauzer rad etsa — “Musiqani yoqish uchun bosing”; fayl topilmasa — “Musiqa hozircha mavjud emas”.
  Ikkala holatda ham taklifnoma bemalol ochiladi.

## 6. Rang, rasm va matnlarni almashtirish

- **Ranglar va shriftlar:** `src/styles.css` boshidagi `:root` bo‘limi (`--bordo`, `--gold`, `--ivory` …).
- **Tun / kunduz rejimi:** sayt har ochilganda kunduzgi rejimda chiqadi. Yuqoridagi oy/quyosh tugmasi ko‘rinishni almashtiradi.
  Sahifa yangilansa yana kunduzgi rejim ochiladi. Tun ranglari `:root[data-theme='dark']` ichida; `ThemeToggle.tsx` boshqaradi.
- **Taklif matni va barcha yozuvlar:** `src/i18n/uz.ts` (o‘zbekcha), `src/i18n/ru.ts` (ruscha).
- **Kelin-kuyov rasmi:** `src/img/pair.png`. Asl rasmning qora foni `CoupleHero.tsx` ichidagi
  `pair-cutout` SVG filtri orqali faqat ko‘rsatishda shaffof qilinadi; rasm fayli o‘zgartirilmagan.
  Shaffof PNG bilan almashtirsangiz, `CoupleHero.tsx` dagi `<image>` elementidan `filter="url(#pair-cutout)"` atributini olib tashlang.
- **So‘zana tasmasi, karnay va yirik gul/anor bezaklari:** `src/img/*.webp`.
  **Mum muhr va kichik bezaklar:** `src/components/ornaments.tsx` ichidagi SVG.
- **Animatsiyalar:** konvertning ochilishi `EnvelopeIntro.tsx` da; asosiy sahifa animatsiyalari
  `styles.css` da. `src/lib/useScrollReveal.ts` bo‘limlarni ekranga kirganda bir marta ochadi.
  `styles.css` boshidagi `--motion-scale: 2` barcha asosiy harakatlar va ularning pauzalarini ikki baravar sekinlashtiradi;
  konvert 3,2 soniyada ochiladi. `1` qiymati avvalgi tezlikni qaytaradi.
  Qurilmada harakatni kamaytirish yoqilsa, kontent kechikishsiz ko‘rinadi.
- **Favicon:** `public/favicon.svg`.
- **Ulashish rasmi (og:image):** hozir yo‘q. Qo‘shish uchun `public/preview.jpg` (1200×630) qo‘yib,
  `index.html` ga `<meta property="og:image" content="https://SIZNING-DOMEN/preview.jpg" />` qo‘shing.

## 7. Lokal ishga tushirish va production build

Kerak: [Node.js](https://nodejs.org) 20 yoki yangiroq.

```bash
npm install        # bir marta
npm run dev        # http://localhost:5173 — o‘zgarishlar darhol ko‘rinadi
npm test           # sana/kalendar mantiqini tekshirish
npm run build      # production build → dist/ papka
npm run preview    # build natijasini lokal ko‘rish
```

Eslatma: brauzer sarlavhasi sahifa ochilgach darhol yangilanadi, lekin ulashish (Telegram) ma’lumotlari
`npm run build` paytida yoziladi — config o‘zgargach qayta build qiling (Vercel buni o‘zi qiladi).

## 8. Vercel’da e’lon qilish

**GitHub orqali (tavsiya):**

1. Loyihani GitHub’ga yuklang.
2. [vercel.com](https://vercel.com) → **Add New → Project** → repozitoriyni tanlang.
3. Framework: **Vite** (o‘zi aniqlaydi). Build: `npm run build`, Output: `dist`.
4. **Deploy**. Keyin config’ni o‘zgartirib GitHub’ga push qilsangiz, sayt avtomatik yangilanadi.

**CLI orqali:**

```bash
npm i -g vercel
vercel          # birinchi marta sozlash
vercel --prod   # e’lon qilish
```

---

### Loyiha tuzilishi

```
src/
  config/wedding.ts        ← BARCHA ma’lumotlaringiz
  i18n/uz.ts, ru.ts        ← matnlar va tarjimalar
  components/
    EnvelopeIntro.tsx  LanguageSwitcher.tsx  MusicPlayer.tsx
    CoupleHero.tsx     InvitationLetter.tsx  WeddingCalendar.tsx
    VenueSection.tsx   Countdown.tsx         Footer.tsx
    ornaments.tsx      ← SVG bezaklar
  music/MusicProvider.tsx  ← yagona audio instance
  lib/date.ts, wedding.ts  ← sana hisoblari (bitta manba)
  styles.css               ← ranglar va dizayn
public/audio/              ← wedding-music.mp3 shu yerga
```

### Shriftlar

**Great Vibes** (ismlar), **Cormorant Garamond** (sarlavhalar), **Lora** (matn) —
o‘zbekcha O‘, G‘ va kirill harflarini qo‘llab-quvvatlaydi. Fayllar `public/fonts/` ichida
mahalliy saqlanadi; sahifa ochilishida Google Fonts serveriga murojaat qilinmaydi.
