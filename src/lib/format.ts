import { locales, type Locale } from '@/i18n/config';
import { defaultCurrency } from '@/config/currencies';

/** Fiyat, sayı ve tarih biçimleri dile göre tek yerden üretilir. */
export function formatters(locale: Locale) {
  const intl = locales[locale].intl;
  const price = new Intl.NumberFormat(intl, {
    style: 'currency',
    currency: defaultCurrency,
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  });
  const number = new Intl.NumberFormat(intl);
  const date = new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'long', year: 'numeric' });

  return {
    price: (value: number) => price.format(value),
    number: (value: number) => number.format(value),
    date: (value: Date) => date.format(value),
  };
}
