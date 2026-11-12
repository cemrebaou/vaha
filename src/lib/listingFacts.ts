import type { IconName } from '@/components/ui/icons';
import type { Listing } from '@/data/listings';
import type { Dictionary } from '@/i18n/locales/tr';
import { fill } from '@/i18n';

export interface ListingFact {
  icon: IconName;
  /** Detay sayfasındaki satır başlığı: "Oda", "Alan"… */
  label: string;
  /** Kartta ve detayda gösterilen değer: "2 oda", "118 m²"… */
  text: string;
}

/** Bir ilanın öne çıkan özellikleri; kart ve detay sayfası aynı listeyi kullanır. */
export function listingFacts(
  item: Listing,
  t: Dictionary,
  fmt: { number: (value: number) => string },
): ListingFact[] {
  const facts: ListingFact[] = [];
  const l = t.listing;

  if (item.beds !== undefined) {
    facts.push({
      icon: 'bed-double',
      label: l.facts.rooms,
      text: item.beds === 0 ? l.studio : fill(l.beds, { n: item.beds }),
    });
  }
  if (item.baths !== undefined) {
    facts.push({ icon: 'bath', label: l.facts.baths, text: fill(l.baths, { n: item.baths }) });
  }
  if (item.size !== undefined) {
    facts.push({ icon: 'ruler', label: l.facts.size, text: `${fmt.number(item.size)} ${l.sqm}` });
  }
  if (item.year !== undefined) {
    facts.push({ icon: 'calendar', label: l.facts.year, text: String(item.year) });
  }
  if (item.mileage !== undefined) {
    facts.push({
      icon: 'gauge',
      label: l.facts.mileage,
      text: `${fmt.number(item.mileage)} ${l.km}`,
    });
  }

  return facts;
}
