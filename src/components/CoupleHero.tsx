import { wedding } from '../config/wedding.ts';
import { useI18n } from '../i18n/I18nProvider';
import pairImage from '../img/pair.png';
import borderImage from '../img/suzani-border.webp';
import karnayImage from '../img/karnay.webp';

export function CoupleHero() {
  const { t } = useI18n();

  return (
    <header className="hero">
      <link rel="preload" as="image" href={pairImage} fetchPriority="high" />
      <img className="hero__band" src={borderImage} alt="" width="1536" height="1024" aria-hidden="true" />
      <div className="hero__horns" aria-hidden="true">
        <div className="hero__horn hero__horn--left"><img src={karnayImage} alt="" width="1536" height="1024" /></div>
        <div className="hero__horn hero__horn--right"><img src={karnayImage} alt="" width="1536" height="1024" /></div>
      </div>
      <div className="hero__inner">
        <div className="hero__names-row">
          <h1 className="names" id="main-title" tabIndex={-1}>
            <span className="names__groom">{wedding.groomName}</span>
            <span className="names__and">{t.and}</span>
            <span className="names__bride">{wedding.brideName}</span>
          </h1>
        </div>

        <svg className="hero__couple" viewBox="0 0 1536 1024" width="1536" height="1024" aria-hidden="true" focusable="false">
          <defs>
            {/* Keep the supplied artwork; make its black matte transparent at render time. */}
            <filter id="pair-cutout" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  12 12 12 0 0" />
            </filter>
          </defs>
          <image href={pairImage} width="1536" height="1024" filter="url(#pair-cutout)" />
        </svg>

        <a className="hero__scroll" href="#taklif">
          <span>{t.hero.readInvitation}</span>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M12 4v15m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  );
}
