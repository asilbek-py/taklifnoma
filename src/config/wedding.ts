/**
 * ================================================================
 *  TO‘Y TAKLIFNOMASI SOZLAMALARI
 * ================================================================
 *  Saytdagi barcha shaxsiy ma’lumotlar FAQAT shu faylda o‘zgartiriladi.
 *  Komponentlar ism, sana, manzil va musiqa yo‘lini shu yerdan oladi.
 *
 *  Qoidalar:
 *  • Qiymatlarni qo‘shtirnoq ichida yozing: "..."
 *  • Bo‘sh qoldirilgan maydon ("") saytda "tez orada e’lon qilinadi"
 *    degan nafis yozuv bilan almashadi — soxta ma’lumot chiqmaydi.
 *  • Faylni saqlagach `npm run dev` ochiq bo‘lsa sahifa o‘zi yangilanadi.
 *  • Brauzer sarlavhasi va ulashish (Telegram/WhatsApp) ma’lumotlari
 *    `npm run build` paytida shu fayldan yoziladi.
 * ================================================================
 */

export type Language = 'uz' | 'ru';

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  timeZone: string;
  venueName: string;
  city: string;
  address: string;
  landmark: string;
  venueNameRu: string;
  cityRu: string;
  addressRu: string;
  landmarkRu: string;
  googleMapsUrl: string;
  yandexMapsUrl: string;
  musicSrc: string;
  musicVolume: number;
  defaultLanguage: Language;
}

export const wedding: WeddingConfig = {
  // ── ISMLAR ──────────────────────────────────────────────────
  // KUYOV ISMI. Konvert, asosiy sahifa, yakun, sarlavha va ulashishda shu yozuv chiqadi.
  groomName: "Asilbek",

  // KELIN ISMI. Aynan shunday yozilgan: "Masturaxon".
  brideName: "Masturaxon",

  // ── SANA VA VAQT ────────────────────────────────────────────
  // TO‘Y SANASINI SHU YERGA YOZING. Format: YYYY-MM-DD. Masalan, 2027-05-20 — faqat format namunasi.
  // Bo‘sh yoki noto‘g‘ri bo‘lsa: "To‘y sanasi tez orada e’lon qilinadi" ko‘rsatiladi,
  // kalendar va orqaga sanoq chiqmaydi.
  weddingDate: "",

  // TO‘Y BOSHLANISH VAQTINI SHU YERGA YOZING. 24 soatlik format: HH:mm.
  // Masalan: "18:00". Vaqt bo‘sh bo‘lsa sana ko‘rinadi, lekin orqaga sanoq yoqilmaydi.
  weddingTime: "",

  // VAQT MINTAQASI. O‘zbekiston uchun o‘zgartirmang: "Asia/Tashkent" (UTC+5).
  // Orqaga sanoq mehmon qaysi davlatda bo‘lishidan qat’i nazar shu mintaqa bo‘yicha hisoblanadi.
  timeZone: "Asia/Tashkent",

  // ── TO‘YXONA VA MANZIL (o‘zbekcha / asosiy) ────────────────
  // TO‘YXONA YOKI RESTORAN NOMINI SHU YERGA YOZING.
  venueName: "",

  // SHAHAR/TUMAN NOMINI SHU YERGA YOZING.
  city: "",

  // TO‘LIQ MANZILNI SHU YERGA YOZING.
  address: "",

  // MO‘LJALNI SHU YERGA YOZING. Kerak bo‘lmasa bo‘sh qoldiring.
  landmark: "",

  // ── RUSCHA VARIANTLAR (IXTIYORIY) ───────────────────────────
  // Sayt rus tiliga o‘tkazilganda shu qiymatlar ko‘rsatiladi.
  // Bo‘sh qoldirsangiz, rus tilida ham yuqoridagi asosiy (o‘zbekcha) yozuv chiqadi.
  // Masalan, to‘yxona nomini kirill yozuvida berish uchun ishlating.
  venueNameRu: "",
  cityRu: "",
  addressRu: "",
  landmarkRu: "",

  // ── XARITA HAVOLALARI ───────────────────────────────────────
  // Google Maps’da joyni oching → Ulashish → Havolani nusxalash → shu yerga joylashtiring.
  // Havola bo‘sh yoki noto‘g‘ri bo‘lsa "Google Maps’da ochish" tugmasi umuman chiqmaydi.
  googleMapsUrl: "",

  // Yandex Maps’da joyni oching → Ulashish → Havolani nusxalash → shu yerga joylashtiring.
  // Havola bo‘sh yoki noto‘g‘ri bo‘lsa "Yandex xaritada ochish" tugmasi umuman chiqmaydi.
  yandexMapsUrl: "",

  // ── MUSIQA ──────────────────────────────────────────────────
  // MP3 faylni public/audio/wedding-music.mp3 ichiga joylashtiring. Nomini o‘zgartirsangiz, bu yo‘lni ham yangilang.
  // Fayl yo‘q bo‘lsa ham taklifnoma ochiladi, musiqa tugmasi esa "Musiqa hozircha mavjud emas" deydi.
  musicSrc: "/audio/wedding-music.mp3",

  // BOSHLANG‘ICH OVOZ BALANDLIGI: 0 dan 1 gacha. 0.35 ≈ 35%.
  // Eslatma: iPhone (iOS Safari) ovozni faqat telefon tugmalari orqali boshqaradi.
  musicVolume: 0.35,

  // ── TIL ─────────────────────────────────────────────────────
  // SAYT OCHILGANDAGI TIL: "uz" (o‘zbekcha) yoki "ru" (ruscha).
  // Mehmon tilni almashtirsa, uning tanlovi o‘sha brauzerda eslab qolinadi.
  defaultLanguage: "uz",
};

/*
 * TAKLIF MATNINI O‘ZGARTIRISH:
 * Taklifnoma matni, tugmalar va boshqa yozuvlar tarjima fayllarida:
 *   src/i18n/uz.ts  — o‘zbekcha
 *   src/i18n/ru.ts  — ruscha
 */
