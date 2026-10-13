import type { Language } from '../config/wedding.ts';
import type { Dictionary } from './types.ts';
import { uz } from './uz.ts';
import { ru } from './ru.ts';

export const dictionaries: Record<Language, Dictionary> = { uz, ru };
export const languages: Language[] = ['uz', 'ru'];
