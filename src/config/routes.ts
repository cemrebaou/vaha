/**
 * Sitedeki tüm adresler tek yerde. Bir adres değişirse yalnızca burası değişir.
 * Dil öneki `link()` ile eklenir: link(route.search()) -> /tr/search/
 */
export const route = {
  home: () => '',
  /** Sorgu eklemek için: `${link(route.search())}?d=2` */
  search: () => 'search',
  advanced: () => 'detayli-arama',
  group: (group: string) => `c/${group}`,
  sub: (group: string, sub: string) => `c/${group}/${sub}`,
  listing: (id: string) => `ilan/${id}`,
  post: () => 'ilan-ver',
  login: () => 'giris',
  favorites: () => 'favoriler',
} as const;
