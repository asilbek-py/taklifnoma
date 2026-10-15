# Release tekshiruvlari

## Tarqatishdan oldin

- [ ] `src/config/wedding.ts`: weddingDate, weddingTime, venueName, city, address va yandexMapsUrl haqiqiy qiymatlar bilan to‘ldirilgan. Hozirgi bo‘sh qiymatlar faqat “tez orada” sahifasi uchun mos.
- [ ] `siteUrl` asosiy HTTPS domeniga teng. Ismlar o‘zgarsa `public/preview.png` ham yangilangan.
- [ ] Node 24.19.0 bilan `npm ci`, `npm test`, `npm run build` muvaffaqiyatli.
- [ ] GitHub PR’dagi Release checks muvaffaqiyatli; Netlify preview tekshirilgan.
- [ ] Netlify production branch `main`; yangi deploy shu branchning kerakli commitiga tegishli.
- [ ] Oldingi ishlaydigan Netlify deploy rollback uchun aniqlangan.

## Deploydan keyin — desktop va mobil

- [ ] Production URL HTTPS orqali ochiladi; JS/CSS, rasm va shriftlar 200 qaytaradi. Konsolda jiddiy xatolar yo‘q.
- [ ] “Ochish” bir marta va tez-tez bosilganda konvert taxminan 3,2 soniyada yo‘qoladi, scroll ochiladi, fokus sarlavhaga o‘tadi.
- [ ] 320–390 px ekranda matn/tugmalar kesilmaydi; barcha bo‘limlar scroll orqali ko‘rinadi.
- [ ] Reduced-motion yoqilganda konvert tez ochiladi va kontent yashirin qolmaydi.
- [ ] Tema almashtirish ishlaydi; refresh qilinganda kunduzgi tema qaytadi. Til tanlash hozir yashirilgan.
- [ ] Sana/kalendar va hisoblagich Toshkent vaqtiga mos; boshqa vaqt mintaqasida ham bir xil lahzaga sanaydi.
- [ ] Sana bo‘sh, noto‘g‘ri, vaqtsiz yoki o‘tgan bo‘lganda mos xabar chiqadi. Sinov konfiguratsiyasini productionga chiqarmang.
- [ ] Xarita haqiqiy joyni yangi oynada ochadi; manzil nusxalanadi; bo‘sh xarita nofaol.
- [ ] Telegram/WhatsApp orqali URL ulashilganda sarlavha, tavsif va preview rasmi chiqadi. Eski preview keshi bo‘lishi mumkin.

## Audio — iPhone Safari, Android Chrome va Telegram ichki brauzeri

- [ ] Bosishdan oldin ovoz yo‘q; “Ochish” bilan ijro boshlanadi.
- [ ] Musiqa tugmasi play/pause qiladi; resume o‘sha joyidan davom etadi.
- [ ] Avval musiqa tugmasi, keyin “Ochish”: bitta ijro, boshidan qayta boshlanmaydi.
- [ ] Audio taxminan 32,5 soniyada tugab qayta boshlanadi; scroll/tema almashtirish ijroni uzmaydi.
- [ ] Brauzer ijroni rad etsa qo‘lda yoqish xabari chiqadi; konvert baribir ochiladi.
- [ ] Audio yuklanmasa “Musiqa hozircha mavjud emas” chiqadi; musiqa tugmasi qayta urinishga imkon beradi.
- [ ] Sekin tarmoqda taklifnoma ochilishi audio yuklanishiga bog‘lanib qolmaydi.
- [ ] Telefon bloklanib yoki ilova orqa fonga o‘tib qaytganda tugma holati haqiqiy ijroga mos.

## Qabul mezoni

CI/build muvaffaqiyati audio haqiqiy telefonda ijro bo‘lishini tasdiqlamaydi. Yakuniy tarqatishdan oldin yuqoridagi mobil audio oqimlari va haqiqiy sana/manzil tasdiqlansin.
