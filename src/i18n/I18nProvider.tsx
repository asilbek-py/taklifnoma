import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { wedding, type Language } from '../config/wedding.ts';
import type { Dictionary } from './types.ts';
import { dictionaries } from './dictionaries.ts';
import { pageDescription, pageTitle } from '../lib/wedding.ts';

const STORAGE_KEY = 'taklifnoma-lang';

interface I18nValue {
  lang: Language;
  t: Dictionary;
  setLang: (lang: Language) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

function initialLanguage(): Language {
  // Til tanlash yashirilganida avval saqlangan ruscha tanlov qo‘llanmaydi.
  // Tanlovni eslab qolishni qayta yoqish uchun quyidagi blokni kommentdan chiqaring.
  /*
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'uz' || stored === 'ru') return stored;
  } catch {
    // localStorage yopiq bo‘lishi mumkin — standart tilga qaytamiz
  }
  */
  return wedding.defaultLanguage === 'ru' ? 'ru' : 'uz';
}

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(initialLanguage);
  const t = dictionaries[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = pageTitle(t);
    setMeta('meta[name="description"]', pageDescription(t));
  }, [t]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* e’tiborsiz */
    }
  }, []);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n I18nProvider ichida ishlatilishi kerak');
  return ctx;
}
