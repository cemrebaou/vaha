import { same, type Text } from '@/i18n/text';

/** Dubai bölgeleri. Özel adlar Latin dillerde aynı kalır, Arapçada kendi yazımıyla görünür. */
export const areas = [
  { id: 'dubai-marina', name: same('Dubai Marina', 'مرسى دبي'), price: 1.25 },
  { id: 'downtown', name: same('Downtown Dubai', 'وسط مدينة دبي'), price: 1.45 },
  { id: 'palm-jumeirah', name: same('Palm Jumeirah', 'نخلة جميرا'), price: 1.9 },
  { id: 'business-bay', name: same('Business Bay', 'الخليج التجاري'), price: 1.15 },
  { id: 'jvc', name: same('Jumeirah Village Circle', 'قرية جميرا الدائرية'), price: 0.7 },
  { id: 'dubai-hills', name: same('Dubai Hills Estate', 'دبي هيلز استيت'), price: 1.3 },
  { id: 'jumeirah', name: same('Jumeirah', 'جميرا'), price: 1.5 },
  { id: 'deira', name: same('Deira', 'ديرة'), price: 0.6 },
  { id: 'jlt', name: same('Jumeirah Lake Towers', 'أبراج بحيرات جميرا'), price: 0.85 },
  { id: 'al-barsha', name: same('Al Barsha', 'البرشاء'), price: 0.8 },
  { id: 'arabian-ranches', name: same('Arabian Ranches', 'المرابع العربية'), price: 1.1 },
  { id: 'creek-harbour', name: same('Dubai Creek Harbour', 'خور دبي'), price: 1.2 },
  { id: 'dubai-south', name: same('Dubai South', 'دبي الجنوب'), price: 0.55 },
  { id: 'silicon-oasis', name: same('Dubai Silicon Oasis', 'واحة دبي للسيليكون'), price: 0.6 },
  { id: 'al-quoz', name: same('Al Quoz', 'القوز'), price: 0.65 },
  { id: 'mirdif', name: same('Mirdif', 'مردف'), price: 0.75 },
  { id: 'bur-dubai', name: same('Bur Dubai', 'بر دبي'), price: 0.65 },
  { id: 'difc', name: same('DIFC', 'مركز دبي المالي العالمي'), price: 1.6 },
] as const satisfies readonly { id: string; name: Text; price: number }[];

export type AreaId = (typeof areas)[number]['id'];

export const getArea = (id: AreaId) => areas.find((item) => item.id === id)!;

/** Şehir adı; konum satırlarında bölgenin önüne yazılır. */
export const city = same('Dubai', 'دبي');
