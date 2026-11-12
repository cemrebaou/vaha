import { fields, NO, YES, type Field } from '@/config/filters';
import type { Locale } from '@/i18n/config';
import type { Listing } from '@/data/listings';

/** Bir ilanın bir kriterdeki değerinin o dildeki yazımı; değer yoksa null. */
export function fieldText(
  field: Field,
  listing: Listing,
  locale: Locale,
  number: (value: number) => string,
): string | null {
  const value = listing.attrs[field.id];
  if (value === undefined) return null;

  if (field.kind === 'range') {
    const amount = field.plain ? String(value) : number(Number(value));
    return field.unit ? `${amount} ${field.unit[locale]}` : amount;
  }
  if (field.kind === 'bool') return (value === 'yes' ? YES : NO)[locale];
  return field.options.find((option) => option.id === value)?.label[locale] ?? null;
}

/** Sonuç satırlarına yazılan filtre verisi: data-f-<alan>="değer" */
export function rowData(listing: Listing): Record<string, string> {
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(listing.attrs)) {
    if (fields[key]) data[`data-f-${key}`] = String(value);
  }
  return data;
}
