/**
 * Dil ayarları. Yeni dil eklemek için:
 * 1) buraya bir satır ekle, 2) src/i18n/locales/ altına sözlük dosyasını koy,
 * 3) src/i18n/index.ts içindeki `dictionaries` nesnesine bağla.
 */
export const locales = {
  tr: { label: 'Türkçe', short: 'TR', dir: 'ltr', intl: 'tr-TR', hreflang: 'tr' },
  en: { label: 'English', short: 'EN', dir: 'ltr', intl: 'en-AE', hreflang: 'en' },
  ar: { label: 'العربية', short: 'AR', dir: 'rtl', intl: 'ar-AE-u-nu-latn', hreflang: 'ar' },
} as const;

export type Locale = keyof typeof locales;

/** Site ilk açıldığında gösterilen dil. Yayına çıkarken tek satırla değişir. */
export const defaultLocale: Locale = 'tr';

export const localeCodes = Object.keys(locales) as Locale[];

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && value in locales;
