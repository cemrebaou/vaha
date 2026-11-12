import { demoListings, showcaseOrder, type Listing, type Period } from '@/data/listings';

/**
 * İlan veri katmanı. Sayfalar ilanlara yalnızca buradan ulaşır.
 * Şimdilik örnek veriyi döndürür; gerçek API bağlandığında yalnızca bu dosya değişir.
 */

const byNewest = (a: Listing, b: Listing) => a.daysAgo - b.daysAgo;

export function getListings(filter: { group?: string; sub?: string } = {}): Listing[] {
  return demoListings
    .filter(
      (item) => (!filter.group || item.group === filter.group) && (!filter.sub || item.sub === filter.sub),
    )
    .sort(byNewest);
}

export function getShowcase(): Listing[] {
  return showcaseOrder.map((id) => getListing(id)!);
}

export function getListing(id: string): Listing | undefined {
  return demoListings.find((item) => item.id === id);
}

/** Kategori ağacındaki ilan sayıları. */
export function countBy(group: string, sub?: string): number {
  return demoListings.filter((item) => item.group === group && (!sub || item.sub === sub)).length;
}

export function totalCount(): number {
  return demoListings.length;
}

export type { Listing, Period };
