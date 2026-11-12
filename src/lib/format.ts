import { locales, type Locale } from '@/i18n/config';
import { defaultCurrency } from '@/config/currencies';

/** İlan tarihleri derleme gününe göre hesaplanır. */
const today = new Date();

/** Fiyat, sayı ve tarih biçimleri dile göre tek yerden üretilir. */
export function formatters(locale: Locale) {
  const intl = locales[locale].intl;
  const number = new Intl.NumberFormat(intl, { maximumFractionDigits: 0 });
  const dayMonth = new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'long' });
  const year = new Intl.DateTimeFormat(intl, { year: 'numeric' });
  const full = new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'long', year: 'numeric' });
  const dateOf = (daysAgo: number) => new Date(today.getTime() - daysAgo * 86400000);

  return {
    number: (value: number) => number.format(value),
    /** "2.450.000 AED" */
    price: (value: number) => `${number.format(value)} ${defaultCurrency}`,
    /** Sonuç tablosu için iki satır: "12 Kasım" / "2026" */
    dateParts: (daysAgo: number) => [dayMonth.format(dateOf(daysAgo)), year.format(dateOf(daysAgo))],
    date: (daysAgo: number) => full.format(dateOf(daysAgo)),
  };
}
