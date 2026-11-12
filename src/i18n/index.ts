import { localeCodes, locales, type Locale } from './config';
import tr, { type Dictionary } from './locales/tr';
import en from './locales/en';
import ar from './locales/ar';
import type { Text } from './text';
import { href } from '@/lib/url';
import { formatters } from '@/lib/format';

const dictionaries: Record<Locale, Dictionary> = { tr, en, ar };

/** "{n} ilan" gibi kalıplardaki yer tutucuları doldurur. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
}

/** Bir sayfanın ya da bileşenin dil için ihtiyaç duyduğu her şey tek yerde. */
export function useI18n(locale: Locale) {
  return {
    locale,
    meta: locales[locale],
    t: dictionaries[locale],
    /** Üç dilli metnin bu dildeki karşılığı (kategori, filtre, ilan adları). */
    L: (text: Text) => text[locale],
    link: (path = '') => href(locale, path),
    fmt: formatters(locale),
  };
}

/** [locale] klasörü altındaki sayfalar için: her dil bir sayfa üretir. */
export function localePaths() {
  return localeCodes.map((locale) => ({ params: { locale } }));
}

export type { Dictionary, Locale };
