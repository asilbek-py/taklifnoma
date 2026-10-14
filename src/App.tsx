import { useCallback, useLayoutEffect, useState } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
// import { LanguageSwitcher } from './components/LanguageSwitcher';
import { MusicPlayer } from './components/MusicPlayer';
import { ThemeToggle } from './components/ThemeToggle';
import { CoupleHero } from './components/CoupleHero';
import { InvitationLetter } from './components/InvitationLetter';
import { WeddingCalendar } from './components/WeddingCalendar';
import { VenueSection } from './components/VenueSection';
import { Countdown } from './components/Countdown';
import { Footer } from './components/Footer';
import { useScrollReveal } from './lib/useScrollReveal';
import pomegranateImage from './img/pomegranate.webp';
import flowerImage from './img/flower.webp';

type Stage = 'closed' | 'opening' | 'open';

export default function App() {
  const [stage, setStage] = useState<Stage>('closed');
  const isOpen = stage === 'open';
  const pageRef = useScrollReveal(isOpen);

  // Konvert ochilmaguncha sahifa scroll qilinmaydi
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-locked', !isOpen);
    return () => document.documentElement.classList.remove('is-locked');
  }, [isOpen]);

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  const handleOpenStart = useCallback(() => setStage('opening'), []);
  const handleOpened = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setStage('open');
  }, []);

  useLayoutEffect(() => {
    if (isOpen) document.getElementById('main-title')?.focus({ preventScroll: true });
  }, [isOpen]);

  return (
    <>
      <div className={`controls${isOpen ? ' controls--open' : ''}`}>
        <MusicPlayer />
        <div className="controls__right">
          <ThemeToggle />
          {/* Til tanlashni qayta yoqish uchun import va shu qatorni kommentdan chiqaring. */}
          {/* <LanguageSwitcher /> */}
        </div>
      </div>

      {!isOpen && <EnvelopeIntro onOpenStart={handleOpenStart} onOpened={handleOpened} />}

      {/* Konvert yopiq paytda asosiy kontent klaviatura va screen reader’dan yashirin (inert) */}
      <main ref={pageRef} className={`page${isOpen ? ' is-revealed' : ''}`} inert={!isOpen} aria-hidden={!isOpen || undefined}>
        <CoupleHero />
        <InvitationLetter />
        <div className="details">
          <div className="details__ornaments" aria-hidden="true">
            <img className="details__sprig details__sprig--left" src={pomegranateImage} width="700" height="467" alt="" loading="lazy" />
            <img className="details__sprig details__sprig--right" src={pomegranateImage} width="700" height="467" alt="" loading="lazy" />
            <img className="details__sprig details__sprig--flower" src={flowerImage} width="650" height="433" alt="" loading="lazy" />
          </div>
          <WeddingCalendar />
          <Countdown />
          <VenueSection />
        </div>
        <Footer />
      </main>
    </>
  );
}
