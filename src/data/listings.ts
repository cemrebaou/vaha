import type { Locale } from '@/i18n/config';
import type { CategoryId } from '@/config/categories';
import type { AreaId } from '@/config/areas';

export interface Listing {
  id: string;
  category: CategoryId;
  sub: string;
  deal: 'sale' | 'rent' | null;
  /** AED cinsinden. */
  price: number;
  /** Dubai'de kiralar yıllık konuşulur. */
  period: 'year' | null;
  area: AreaId;
  title: Record<Locale, string>;
  beds?: number;
  baths?: number;
  /** m² */
  size?: number;
  year?: number;
  /** km */
  mileage?: number;
  verified: boolean;
  daysAgo: number;
  /** Fotoğraf gelene kadar kullanılan yer tutucunun renk tonu. */
  tone: 1 | 2 | 3 | 4;
}

/** Tasarımı göstermek için örnek ilanlar. Gerçek veri geldiğinde bu dosya silinir. */
export const demoListings: Listing[] = [
  {
    id: 'v-1001',
    category: 'property',
    sub: 'apartment',
    deal: 'sale',
    price: 2450000,
    period: null,
    area: 'dubai-marina',
    title: {
      tr: 'Deniz manzaralı 2 odalı daire',
      en: 'Two-bedroom apartment with sea view',
      ar: 'شقة بغرفتين وإطلالة على البحر',
    },
    beds: 2,
    baths: 2,
    size: 118,
    verified: true,
    daysAgo: 0,
    tone: 1,
  },
  {
    id: 'v-1002',
    category: 'property',
    sub: 'apartment',
    deal: 'rent',
    price: 135000,
    period: 'year',
    area: 'downtown',
    title: {
      tr: 'Şehir manzaralı 1 odalı daire',
      en: 'One-bedroom apartment with skyline view',
      ar: 'شقة بغرفة واحدة وإطلالة على المدينة',
    },
    beds: 1,
    baths: 1,
    size: 74,
    verified: false,
    daysAgo: 1,
    tone: 3,
  },
  {
    id: 'v-1003',
    category: 'property',
    sub: 'villa',
    deal: 'sale',
    price: 6900000,
    period: null,
    area: 'dubai-hills',
    title: {
      tr: 'Bahçeli 4 odalı villa',
      en: 'Four-bedroom villa with garden',
      ar: 'فيلا بأربع غرف مع حديقة',
    },
    beds: 4,
    baths: 5,
    size: 390,
    verified: true,
    daysAgo: 2,
    tone: 2,
  },
  {
    id: 'v-1004',
    category: 'property',
    sub: 'apartment',
    deal: 'rent',
    price: 62000,
    period: 'year',
    area: 'jvc',
    title: {
      tr: 'Eşyalı stüdyo daire',
      en: 'Furnished studio apartment',
      ar: 'استوديو مفروش',
    },
    beds: 0,
    baths: 1,
    size: 38,
    verified: false,
    daysAgo: 3,
    tone: 4,
  },
  {
    id: 'v-2001',
    category: 'motors',
    sub: 'cars',
    deal: null,
    price: 185000,
    period: null,
    area: 'deira',
    title: {
      tr: '2022 model 4x4 SUV, ilk sahibinden',
      en: '2022 4x4 SUV, first owner',
      ar: 'سيارة دفع رباعي موديل 2022، المالك الأول',
    },
    year: 2022,
    mileage: 41000,
    verified: true,
    daysAgo: 1,
    tone: 2,
  },
  {
    id: 'v-2002',
    category: 'motors',
    sub: 'cars',
    deal: null,
    price: 142000,
    period: null,
    area: 'business-bay',
    title: {
      tr: '2023 model elektrikli sedan',
      en: '2023 electric sedan',
      ar: 'سيدان كهربائية موديل 2023',
    },
    year: 2023,
    mileage: 18500,
    verified: false,
    daysAgo: 4,
    tone: 1,
  },
  {
    id: 'v-3001',
    category: 'electronics',
    sub: 'phones',
    deal: null,
    price: 2900,
    period: null,
    area: 'jumeirah',
    title: {
      tr: 'Akıllı telefon, 256 GB, kutulu',
      en: 'Smartphone, 256 GB, boxed',
      ar: 'هاتف ذكي 256 جيجابايت مع العلبة',
    },
    verified: false,
    daysAgo: 0,
    tone: 3,
  },
  {
    id: 'v-4001',
    category: 'home',
    sub: 'furniture',
    deal: null,
    price: 1200,
    period: null,
    area: 'palm-jumeirah',
    title: {
      tr: 'Üç kişilik koltuk, az kullanılmış',
      en: 'Three-seater sofa, lightly used',
      ar: 'أريكة لثلاثة أشخاص، استعمال خفيف',
    },
    verified: false,
    daysAgo: 5,
    tone: 4,
  },
];
