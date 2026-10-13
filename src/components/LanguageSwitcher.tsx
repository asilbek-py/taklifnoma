import { useI18n } from '../i18n/I18nProvider';
import { dictionaries, languages } from '../i18n/dictionaries.ts';

export function LanguageSwitcher() {
  const { lang, t, setLang } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t.controls.languageGroup}>
      {languages.map((code) => {
        const d = dictionaries[code];
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            className={`lang-switch__btn${active ? ' is-active' : ''}`}
            aria-pressed={active}
            aria-label={t.controls.switchTo(d.name)}
            lang={d.htmlLang}
            onClick={() => {
              if (!active) setLang(code);
            }}
          >
            {d.short}
          </button>
        );
      })}
    </div>
  );
}
