import { useI18n } from '../i18n/I18nProvider';
import { Pomegranate, UzFlower } from './ornaments';
import borderImage from '../img/suzani-border.webp';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer" data-reveal>
      <div className="footer__ornaments" aria-hidden="true">
        <UzFlower size={40} />
        <Pomegranate size={48} />
        <UzFlower size={40} />
      </div>
      <p className="footer__thanks" data-reveal-item>{t.footer.thanks}</p>
      <img className="footer__band" src={borderImage} width="1536" height="1024" alt="" aria-hidden="true" loading="lazy" />
    </footer>
  );
}
