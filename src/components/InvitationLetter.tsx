import { wedding } from '../config/wedding.ts';
import { useI18n } from '../i18n/I18nProvider';
import { GoldDivider, Pomegranate, UzFlower } from './ornaments';
import borderImage from '../img/suzani-border.webp';

export function InvitationLetter() {
  const { t } = useI18n();
  return (
    <section className="section letter-section" id="taklif" aria-labelledby="letter-title" data-reveal>
      <article className="letter">
        <div className="letter__ornament letter__ornament--top" aria-hidden="true">
          <Pomegranate size={46} />
          <Pomegranate size={46} />
        </div>
        <h2 className="letter__greeting" id="letter-title" data-reveal-item>
          {t.letter.greeting}
        </h2>
        <div data-reveal-item><GoldDivider className="letter__divider" /></div>
        {t.letter.paragraphs.map((p) => (
          <p key={p} className="letter__text" data-reveal-item>
            {p}
          </p>
        ))}
        <p className="letter__closing" data-reveal-item>{t.letter.closing}</p>
        <p className="letter__signature" data-reveal-item>
          <span>{t.letter.signature}</span>
          <span className="letter__names">
            <span className="nowrap">{wedding.groomName}</span> {t.and}{' '}
            <span className="nowrap">{wedding.brideName}</span>
          </span>
        </p>
        <UzFlower className="letter__flower" size={58} />
        <img className="letter__band" src={borderImage} width="1536" height="1024" alt="" aria-hidden="true" loading="lazy" />
      </article>
    </section>
  );
}
