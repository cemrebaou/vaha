import type { IconName } from '@/components/ui/icons';
import type { Dictionary } from '@/i18n/locales/tr';

interface CategoryConfig {
  id: string;
  icon: IconName;
  /** Alt kategori kimlikleri; adları sözlüklerde durur. */
  subs: readonly string[];
  /** Satılık / kiralık ayrımı olan kategoriler. */
  hasDeal?: boolean;
}

/** Kategori ağacı. Yeni kategori: buraya bir satır + her sözlüğe adını ekle. */
export const categories = [
  {
    id: 'property',
    icon: 'building-2',
    subs: ['apartment', 'villa', 'townhouse', 'office', 'land', 'room'],
    hasDeal: true,
  },
  { id: 'motors', icon: 'car', subs: ['cars', 'motorcycles', 'boats', 'plates', 'parts'] },
  {
    id: 'electronics',
    icon: 'smartphone',
    subs: ['phones', 'computers', 'tv', 'gaming', 'cameras'],
  },
  { id: 'home', icon: 'sofa', subs: ['furniture', 'appliances', 'decor', 'garden'] },
  { id: 'fashion', icon: 'shirt', subs: ['women', 'men', 'watches', 'bags'] },
  { id: 'jobs', icon: 'briefcase', subs: ['fulltime', 'parttime', 'freelance'] },
  { id: 'services', icon: 'wrench', subs: ['moving', 'cleaning', 'repair', 'lessons'] },
  { id: 'hobby', icon: 'bike', subs: ['sports', 'bikes', 'music', 'books'] },
] as const satisfies readonly CategoryConfig[];

export type CategoryId = (typeof categories)[number]['id'];

export const categoryIds = categories.map((item) => item.id) as CategoryId[];

export const getCategory = (id: CategoryId) => categories.find((item) => item.id === id)!;

/** Bir kategorinin o dildeki adı, kısa açıklaması ve alt kategori adları. */
export function categoryText(t: Dictionary, id: CategoryId) {
  const entry = t.categories[id];
  return {
    name: entry.name,
    hint: entry.hint,
    subs: entry.subs as Record<string, string>,
  };
}
