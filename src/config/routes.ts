/**
 * Sitedeki tüm adresler tek yerde. Bir adres değişirse yalnızca burası değişir.
 * Dil öneki `link()` ile eklenir: link(route.search()) -> /tr/search/
 */
export const route = {
  home: () => '',
  search: () => 'search',
  categories: () => 'categories',
  category: (id: string) => `c/${id}`,
  listing: (id: string) => `listing/${id}`,
  post: () => 'post',
  login: () => 'login',
  favorites: () => 'favorites',
} as const;
