import type { Locale } from '@/i18n/config';

/** Dubai bölgeleri. Özel adlar Latin dillerinde aynı kalır, Arapçada kendi yazımıyla görünür. */
export const areas = [
  { id: 'dubai-marina', name: 'Dubai Marina', ar: 'مرسى دبي' },
  { id: 'downtown', name: 'Downtown Dubai', ar: 'وسط مدينة دبي' },
  { id: 'palm-jumeirah', name: 'Palm Jumeirah', ar: 'نخلة جميرا' },
  { id: 'business-bay', name: 'Business Bay', ar: 'الخليج التجاري' },
  { id: 'jvc', name: 'Jumeirah Village Circle', ar: 'قرية جميرا الدائرية' },
  { id: 'dubai-hills', name: 'Dubai Hills Estate', ar: 'دبي هيلز استيت' },
  { id: 'jumeirah', name: 'Jumeirah', ar: 'جميرا' },
  { id: 'deira', name: 'Deira', ar: 'ديرة' },
] as const;

export type AreaId = (typeof areas)[number]['id'];

export function areaName(id: AreaId, locale: Locale): string {
  const area = areas.find((item) => item.id === id)!;
  return locale === 'ar' ? area.ar : area.name;
}
