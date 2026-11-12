import type { Locale } from './config';

/**
 * Üç dilde yazılmış kısa metin. Kategori, filtre ve örnek ilan adları bu şekilde
 * yanlarındaki ayarla birlikte durur. Bir dil eksik kalırsa derleme durur.
 */
export type Text = Record<Locale, string>;

export const tx = (tr: string, en: string, ar: string): Text => ({ tr, en, ar });

/** Marka, model ve semt gibi özel adlar için: Latin dillerde aynı, Arapçada ayrı yazılabilir. */
export const same = (value: string, ar: string = value): Text => ({ tr: value, en: value, ar });
