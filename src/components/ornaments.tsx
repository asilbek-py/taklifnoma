import { useId } from 'react';

/**
 * Milliy bezaklar — barchasi qo‘lda chizilgan SVG.
 * Dekorativ bo‘lgani uchun screen reader’dan yashirilgan (aria-hidden).
 * Har birida viewBox va width/height bor — yuklanishda layout sakramaydi.
 */

const useSvgId = (prefix: string) => `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

const GOLD_STOPS = (
  <>
    <stop offset="0" stopColor="#7A5A22" />
    <stop offset="0.35" stopColor="#F3DEA4" />
    <stop offset="0.6" stopColor="#C6A667" />
    <stop offset="1" stopColor="#6E5020" />
  </>
);

/* ─────────────── So‘zana naqshli yuqori tasma ─────────────── */
export function SuzaniBand({ className }: { className?: string }) {
  const id = useSvgId('suzani');
  return (
    <svg className={className} width="100%" height="76" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="72" height="76" patternUnits="userSpaceOnUse">
          <rect width="72" height="60" fill="#541421" />
          <line x1="0" y1="3" x2="72" y2="3" stroke="#C6A667" strokeWidth="1.2" />
          <line x1="0" y1="57" x2="72" y2="57" stroke="#C6A667" strokeWidth="1.2" />
          {/* Markaziy rozetka (oy-gul) */}
          <circle cx="36" cy="30" r="19" fill="#7D2030" stroke="#C6A667" strokeWidth="1" />
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={i}
              cx="36"
              cy="18.5"
              rx="3.6"
              ry="7.5"
              fill="#E8D3A0"
              transform={`rotate(${i * 45} 36 30)`}
            />
          ))}
          <circle cx="36" cy="30" r="7" fill="#A3283C" stroke="#E8D3A0" strokeWidth="1" />
          <circle cx="36" cy="30" r="2.6" fill="#E8D3A0" />
          {/* Rozetkalar orasidagi barg va nuqtalar */}
          <path d="M0 30 q7 -9 12 0 q-5 9 -12 0Z" fill="#C6A667" />
          <path d="M72 30 q-7 -9 -12 0 q5 9 12 0Z" fill="#C6A667" />
          <circle cx="0" cy="12" r="2" fill="#E8D3A0" />
          <circle cx="0" cy="48" r="2" fill="#E8D3A0" />
          <circle cx="72" cy="12" r="2" fill="#E8D3A0" />
          <circle cx="72" cy="48" r="2" fill="#E8D3A0" />
          {/* Pastki to‘lqinsimon hoshiya */}
          <path
            d="M0 60 Q9 74 18 60 Q27 74 36 60 Q45 74 54 60 Q63 74 72 60Z"
            fill="#541421"
            stroke="#C6A667"
            strokeWidth="1"
          />
          <circle cx="18" cy="64" r="1.6" fill="#E8D3A0" />
          <circle cx="54" cy="64" r="1.6" fill="#E8D3A0" />
        </pattern>
      </defs>
      <rect width="100%" height="76" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─────────────── Oltin karnay ─────────────── */
export function Karnay({ className }: { className?: string }) {
  const g = useSvgId('karnay');
  return (
    <svg className={className} viewBox="0 0 60 300" width="60" height="300" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="0" x2="1" y1="0" y2="0">
          {GOLD_STOPS}
        </linearGradient>
      </defs>
      {/* Karnay naychasi */}
      <path d="M24 58 L36 58 L33.5 284 L26.5 284Z" fill={`url(#${g})`} />
      {/* Og‘zi (raструб) */}
      <path d="M3 4 Q30 16 57 4 Q45 32 36.5 62 L23.5 62 Q15 32 3 4Z" fill={`url(#${g})`} />
      <ellipse cx="30" cy="5" rx="27" ry="5" fill="#6E5020" />
      <ellipse cx="30" cy="5" rx="23" ry="3" fill="#3D2A0E" />
      {/* Halqalar */}
      {[70, 118, 172, 226].map((y) => (
        <g key={y}>
          <rect x="22" y={y} width="16" height="7" rx="2" fill="#8A6A2F" />
          <rect x="22" y={y + 2.5} width="16" height="1.6" fill="#F3DEA4" opacity="0.8" />
        </g>
      ))}
      {/* Qizil popuk */}
      <path d="M38 122 q10 6 9 22" stroke="#7D2030" strokeWidth="2" fill="none" />
      <path d="M44 142 l6 0 l3 22 l-12 0Z" fill="#9B2335" />
      <path d="M43 164 l1.5 9 M47 164 l0 10 M51 164 l-1.5 9" stroke="#9B2335" strokeWidth="1.4" />
      {/* Mundshtuk */}
      <rect x="25" y="282" width="10" height="7" rx="2" fill="#8A6A2F" />
      <ellipse cx="30" cy="293" rx="8" ry="5" fill={`url(#${g})`} />
    </svg>
  );
}

/* ─────────────── Anor ─────────────── */
export function Pomegranate({ className, size = 64 }: { className?: string; size?: number }) {
  const g = useSvgId('anor');
  return (
    <svg className={className} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={g} cx="0.38" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#D2435A" />
          <stop offset="0.55" stopColor="#9B2335" />
          <stop offset="1" stopColor="#5E1522" />
        </radialGradient>
      </defs>
      <path d="M30 26 q-14 -6 -20 4 q12 2 20 -4Z" fill="#4F6B3A" />
      <path d="M70 26 q14 -6 20 4 q-12 2 -20 -4Z" fill="#4F6B3A" />
      <circle cx="50" cy="58" r="33" fill={`url(#${g})`} stroke="#C6A667" strokeWidth="1.4" />
      <path d="M39 27 L42 14 L50 23 L58 14 L61 27Z" fill="#7D2030" stroke="#C6A667" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Ichki oltin naqsh */}
      <path d="M50 36 C38 46 38 70 50 80 C62 70 62 46 50 36Z" fill="none" stroke="#E8D3A0" strokeWidth="1.2" />
      {[
        [50, 48], [45, 57], [55, 57], [50, 66], [45, 74], [55, 74],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.3" fill="#F6D8B8" />
      ))}
      <ellipse cx="36" cy="44" rx="7" ry="4" fill="#fff" opacity="0.22" transform="rotate(-35 36 44)" />
    </svg>
  );
}

/* ─────────────── So‘zana guli (lola) ─────────────── */
export function UzFlower({ className, size = 64 }: { className?: string; size?: number }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" focusable="false">
      <path d="M50 96 V52" stroke="#4F6B3A" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 80 C34 78 24 66 22 56 C36 58 46 66 50 80Z" fill="#4F6B3A" />
      <path d="M50 74 C66 72 76 60 78 50 C64 52 54 60 50 74Z" fill="#5F7E45" />
      <path d="M50 56 C30 52 26 30 34 14 C40 26 46 30 50 30 C54 30 60 26 66 14 C74 30 70 52 50 56Z" fill="#9B2335" stroke="#C6A667" strokeWidth="1.4" />
      <path d="M50 56 C42 46 42 28 50 8 C58 28 58 46 50 56Z" fill="#7D2030" stroke="#E8D3A0" strokeWidth="1.2" />
      <circle cx="50" cy="40" r="3" fill="#E8D3A0" />
    </svg>
  );
}

/* ─────────────── Oltin ajratgich ─────────────── */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 24" width="240" height="24" aria-hidden="true" focusable="false">
      <path d="M0 12 H92" stroke="currentColor" strokeWidth="1" />
      <path d="M148 12 H240" stroke="currentColor" strokeWidth="1" />
      <path d="M120 2 L130 12 L120 22 L110 12Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="120" cy="12" r="3" fill="currentColor" />
      <circle cx="100" cy="12" r="2" fill="currentColor" />
      <circle cx="140" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/* ─────────────── Hajmli oltin mum muhr ─────────────── */
function sealPath(): string {
  const bumps = 18;
  const pts: string[] = [];
  for (let i = 0; i <= bumps * 2; i++) {
    const a = (i / (bumps * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? 57 : 53 + ((i * 7) % 3);
    pts.push(`${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(' L')}Z`;
}
const SEAL_PATH = sealPath();

export function WaxSeal({ className }: { className?: string }) {
  const g = useSvgId('seal');
  const h = useSvgId('sealhi');
  return (
    <svg className={className} viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={g} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#FBEBC0" />
          <stop offset="0.45" stopColor="#D9B873" />
          <stop offset="0.8" stopColor="#A9843F" />
          <stop offset="1" stopColor="#7A5A22" />
        </radialGradient>
        <radialGradient id={h} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#5A3E12" stopOpacity="0.45" />
        </radialGradient>
      </defs>
      <path d={SEAL_PATH} fill={`url(#${g})`} stroke="#8A6A2F" strokeWidth="0.8" strokeLinejoin="round" />
      <circle cx="60" cy="60" r="44" fill={`url(#${h})`} />
      <circle cx="60" cy="60" r="43" fill="none" stroke="#8A6A2F" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#FBEBC0" strokeWidth="0.8" strokeDasharray="1.5 3" />
      {/* Rozetka barglari halqasi */}
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="60"
          cy="25"
          rx="2"
          ry="4"
          fill="#8A6A2F"
          opacity="0.55"
          transform={`rotate(${i * 30} 60 60)`}
        />
      ))}
      <ellipse cx="44" cy="38" rx="14" ry="6" fill="#fff" opacity="0.28" transform="rotate(-30 44 38)" />
    </svg>
  );
}

/* ─────────────── Milliy libosdagi kelin-kuyov ─────────────── */
export function CoupleIllustration({ className }: { className?: string }) {
  const ikat = useSvgId('ikat');
  const stripes = useSvgId('chapan');
  const glow = useSvgId('glow');
  const veil = useSvgId('veil');
  const skin = '#EBC6A1';
  const skinShade = '#D9AC85';
  return (
    <svg className={className} viewBox="0 0 360 420" width="360" height="420" aria-hidden="true" focusable="false">
      <defs>
        {/* Atlas (ikat) naqshi */}
        <pattern id={ikat} width="24" height="44" patternUnits="userSpaceOnUse">
          <rect width="24" height="44" fill="#9B2335" />
          <path d="M12 0 L22 11 L12 22 L2 11Z" fill="#E7B95A" />
          <path d="M12 4 L18 11 L12 18 L6 11Z" fill="#3E2A6B" />
          <path d="M12 8 L15 11 L12 14 L9 11Z" fill="#F6E7C8" />
          <path d="M0 22 L6 33 L0 44 M24 22 L18 33 L24 44" fill="#5E1522" />
          <path d="M12 22 C8 28 8 38 12 44 C16 38 16 28 12 22Z" fill="#C2410C" opacity="0.85" />
        </pattern>
        {/* To‘n (chopon) yo‘llari */}
        <pattern id={stripes} width="14" height="10" patternUnits="userSpaceOnUse">
          <rect width="14" height="10" fill="#2E4F45" />
          <rect x="0" width="4" height="10" fill="#7D2030" />
          <rect x="6" width="1.6" height="10" fill="#E2C47E" />
          <rect x="9.5" width="3" height="10" fill="#3E2A6B" />
        </pattern>
        <radialGradient id={glow} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#FFF6DF" />
          <stop offset="1" stopColor="#FFF6DF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={veil} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFF4E0" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Mehrob ravog‘i */}
      <ellipse cx="180" cy="210" rx="170" ry="190" fill={`url(#${glow})`} />
      <path
        d="M58 412 V188 Q58 92 180 34 Q302 92 302 188 V412"
        fill="none"
        stroke="#C6A667"
        strokeWidth="2"
      />
      <path
        d="M70 412 V192 Q70 104 180 50 Q290 104 290 192 V412"
        fill="none"
        stroke="#C6A667"
        strokeWidth="0.9"
        strokeDasharray="2 4"
      />
      <circle cx="180" cy="34" r="5" fill="#C6A667" />

      {/* ───── Kuyov ───── */}
      {/* To‘n */}
      <path d="M113 172 Q136 160 159 172 L180 205 L192 398 Q136 410 80 398 L92 205Z" fill={`url(#${stripes})`} />
      <path d="M113 172 Q136 160 159 172 L180 205 L192 398 Q136 410 80 398 L92 205Z" fill="none" stroke="#C6A667" strokeWidth="1.2" />
      {/* Ko‘ylak */}
      <path d="M128 168 L144 168 L141 398 L131 398Z" fill="#F7EEDD" />
      <path d="M128 168 L136 190 L144 168" fill="none" stroke="#C6A667" strokeWidth="1.2" />
      {/* Belbog‘ */}
      <rect x="88" y="252" width="98" height="13" rx="3" fill="#C6A667" />
      <path d="M88 258.5 H186" stroke="#7D2030" strokeWidth="1.5" />
      <path d="M100 265 l-4 26 l9 0Z" fill="#B48F4C" />
      {/* Chap qo‘l (pastga) */}
      <path d="M98 190 Q84 240 92 300" stroke={`url(#${stripes})`} strokeWidth="18" strokeLinecap="round" fill="none" />
      <circle cx="93" cy="306" r="7" fill={skin} />
      {/* O‘ng qo‘l — kelinga uzatilgan */}
      <path d="M168 190 Q190 226 192 258" stroke={`url(#${stripes})`} strokeWidth="17" strokeLinecap="round" fill="none" />
      {/* Bo‘yin va bosh */}
      <rect x="129" y="146" width="14" height="22" rx="5" fill={skinShade} />
      <ellipse cx="136" cy="128" rx="20" ry="24" fill={skin} />
      <path d="M117 118 Q118 100 136 99 Q154 100 155 118 Q146 110 136 111 Q126 110 117 118Z" fill="#2B1A12" />
      {/* Do‘ppi */}
      <path d="M114 112 Q113 88 136 86 Q159 88 158 112 Z" fill="#1E1A1A" />
      <path d="M114 112 H158" stroke="#F3EBDD" strokeWidth="2" />
      <path d="M124 96 q4 -6 8 0 q-4 5 -8 0Z M140 96 q4 -6 8 0 q-4 5 -8 0Z" fill="#F3EBDD" />
      <path d="M132 104 q4 -6 8 0 q-4 5 -8 0Z" fill="#F3EBDD" />
      {/* Yuz */}
      <path d="M127 128 q4 -3 7 0 M139 128 q4 -3 7 0" stroke="#3B2618" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M129 140 q7 5 14 0" stroke="#3B2618" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M128 137 q8 -3 16 0" stroke="#2B1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="126" cy="135" r="3" fill="#E59A86" opacity="0.4" />
      <circle cx="146" cy="135" r="3" fill="#E59A86" opacity="0.4" />

      {/* ───── Kelin ───── */}
      {/* Orqa tomondagi harir ro‘mol */}
      <path d="M207 106 Q229 82 251 106 L284 352 Q262 362 248 336 L232 170Z" fill={`url(#${veil})`} stroke="#E2C47E" strokeWidth="1" />
      {/* Atlas ko‘ylak */}
      <path d="M210 172 Q229 162 248 172 L262 210 L280 398 Q229 410 178 398 L196 210Z" fill={`url(#${ikat})`} />
      <path d="M210 172 Q229 162 248 172 L262 210 L280 398 Q229 410 178 398 L196 210Z" fill="none" stroke="#C6A667" strokeWidth="1.2" />
      {/* Yoqa */}
      <path d="M212 170 Q229 192 246 170" fill="none" stroke="#E7B95A" strokeWidth="4" />
      {[216, 222, 229, 236, 242].map((x, i) => (
        <circle key={x} cx={x} cy={176 + (i === 2 ? 8 : i % 2 === 0 ? 2 : 6)} r="1.8" fill="#FBEBC0" />
      ))}
      {/* O‘ng qo‘l */}
      <path d="M254 190 Q268 240 262 298" stroke={`url(#${ikat})`} strokeWidth="16" strokeLinecap="round" fill="none" />
      <circle cx="262" cy="304" r="6.5" fill={skin} />
      {/* Chap qo‘l — kuyovga */}
      <path d="M206 190 Q194 226 196 258" stroke={`url(#${ikat})`} strokeWidth="16" strokeLinecap="round" fill="none" />
      {/* Ushlashgan qo‘llar */}
      <circle cx="193" cy="264" r="8" fill={skin} />
      <circle cx="197" cy="268" r="6.5" fill={skinShade} />
      {/* Bo‘yin */}
      <rect x="223" y="146" width="12" height="22" rx="5" fill={skinShade} />
      {/* Sochlar (o‘rimlar) */}
      <path d="M212 120 Q206 170 214 220" stroke="#2B1A12" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M246 120 Q252 170 244 220" stroke="#2B1A12" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="214" cy="224" r="3.5" fill="#C6A667" />
      <circle cx="244" cy="224" r="3.5" fill="#C6A667" />
      {/* Bosh */}
      <ellipse cx="229" cy="128" rx="18" ry="22" fill={skin} />
      <path d="M211 126 Q211 104 229 103 Q247 104 247 126 Q240 112 229 112 Q218 112 211 126Z" fill="#2B1A12" />
      {/* Tilla qosh va kichik do‘ppi */}
      <path d="M212 104 Q229 84 246 104 Z" fill="#7D2030" stroke="#E7B95A" strokeWidth="1.4" />
      <path d="M210 108 Q229 98 248 108" fill="none" stroke="#E7B95A" strokeWidth="3.2" />
      {[214, 221, 229, 237, 244].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={106 - (i === 2 ? 3 : 1)} x2={x} y2={112 - (i === 2 ? 1 : 0)} stroke="#E7B95A" strokeWidth="0.9" />
          <circle cx={x} cy={113 - (i === 2 ? 1 : 0)} r="1.6" fill="#F6D58C" />
        </g>
      ))}
      <circle cx="229" cy="92" r="3" fill="#F6D58C" />
      {/* Yuz */}
      <path d="M220 128 q4 -3 7 0 M232 128 q4 -3 7 0" stroke="#3B2618" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M223 139 q6 4 12 0" stroke="#A3283C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="218" cy="135" r="3" fill="#E59A86" opacity="0.45" />
      <circle cx="240" cy="135" r="3" fill="#E59A86" opacity="0.45" />
      <circle cx="210" cy="132" r="2" fill="#E7B95A" />
      <circle cx="248" cy="132" r="2" fill="#E7B95A" />

      {/* Oyoq ostidagi bezak */}
      <path d="M40 404 Q180 384 320 404" fill="none" stroke="#C6A667" strokeWidth="1.4" />
      {[70, 120, 240, 290].map((x) => (
        <path key={x} d={`M${x} 404 q-5 -10 0 -16 q5 6 0 16Z`} fill="#9B2335" />
      ))}
    </svg>
  );
}
