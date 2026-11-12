import type { Locale } from '@/i18n/config';

/** Site bir alt klasörde yayınlanırsa (ör. GitHub Pages) bağlantılar bozulmasın diye. */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Dil önekli site içi bağlantı: href('tr', 'search') -> /tr/search/ */
export function href(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${base}/${locale}/${clean ? `${clean}/` : ''}`;
}

/** public/ klasöründeki dosyalar için. */
export function asset(path: string): string {
  return `${base}/${path.replace(/^\/+/, '')}`;
}

/** /tr/search/ adresinden dil önekini çıkarır -> search/ */
export function stripLocale(pathname: string, locale: Locale): string {
  const withoutBase = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return withoutBase.replace(new RegExp(`^/${locale}(/|$)`), '');
}
