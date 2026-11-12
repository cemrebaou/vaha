import { demoListings, type Listing } from '@/data/listings';
import type { CategoryId } from '@/config/categories';

/**
 * İlan veri katmanı. Sayfalar ilanlara yalnızca buradan ulaşır.
 * Şimdilik örnek veriyi döndürür; gerçek API bağlandığında yalnızca bu dosya değişir.
 */
export function getListings(filter: { category?: CategoryId } = {}): Listing[] {
  return demoListings.filter((item) => !filter.category || item.category === filter.category);
}

export function getFeaturedListings(limit = 8): Listing[] {
  return demoListings.slice(0, limit);
}

export function getListing(id: string): Listing | undefined {
  return demoListings.find((item) => item.id === id);
}

export type { Listing };
