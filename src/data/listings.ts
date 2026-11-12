/**
 * Tasarımı göstermek için üretilen örnek ilanlar. Gerçek veri geldiğinde bu dosya silinir;
 * sayfalar ilanlara yalnızca src/lib/listings.ts üzerinden ulaştığı için başka bir şey değişmez.
 * Üretim sabit tohumlu olduğundan her derlemede aynı ilanlar çıkar.
 */
import { same, tx, type Text } from '@/i18n/text';
import { areas, getArea, type AreaId } from '@/config/areas';
import { optionLabel, slug } from '@/config/filters';

export type Period = 'year' | 'month' | 'day' | 'hour';

export interface Listing {
  id: string;
  group: string;
  sub: string;
  title: Text;
  /** AED */
  price: number;
  period: Period | null;
  area: AreaId;
  daysAgo: number;
  tone: 1 | 2 | 3 | 4;
  urgent: boolean;
  showcase: boolean;
  /** Arama kriteri değerleri; anahtarlar src/config/filters.ts içindeki alan kimlikleri. */
  attrs: Record<string, string | number>;
}

/* ---------- Sabit tohumlu rastgelelik ---------- */

let seed = 20261112;
function random(): number {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const pick = <T>(list: readonly T[]): T => list[Math.floor(random() * list.length)]!;
const int = (min: number, max: number) => Math.floor(min + random() * (max - min + 1));
const round = (value: number, step: number) => Math.max(step, Math.round(value / step) * step);
const chance = (p: number) => random() < p;
const yesNo = (p: number) => (chance(p) ? 'yes' : 'no');
const areaIds = areas.map((item) => item.id) as AreaId[];
const capital = (value: string) => value.charAt(0).toLocaleUpperCase('en') + value.slice(1);
const thousands = (value: number) => value.toLocaleString('tr-TR');

type Draft = Omit<Listing, 'id' | 'daysAgo' | 'tone' | 'urgent' | 'showcase'>;

/* ---------- Konut ---------- */

const roomTitle: Record<string, Text> = {
  s: tx('Stüdyo', 'studio', 'استوديو'),
  '1': tx('1+1', '1-bedroom', 'غرفة نوم واحدة'),
  '2': tx('2+1', '2-bedroom', 'غرفتا نوم'),
  '3': tx('3+1', '3-bedroom', '3 غرف نوم'),
  '4': tx('4+1', '4-bedroom', '4 غرف نوم'),
  '5': tx('5+1', '5-bedroom', '5 غرف نوم'),
  '6': tx('6+1', '6-bedroom', '6 غرف نوم'),
};
const typeTitle: Record<string, Text> = {
  daire: tx('Daire', 'apartment', 'شقة'),
  villa: tx('Villa', 'villa', 'فيلا'),
  siraev: tx('Sıra Ev', 'townhouse', 'تاون هاوس'),
  penthouse: tx('Penthouse', 'penthouse', 'بنتهاوس'),
  dubleks: tx('Dubleks Daire', 'duplex', 'شقة دوبلكس'),
  otel: tx('Otel Dairesi', 'hotel apartment', 'شقة فندقية'),
};
const dealTitle: Record<string, Text> = {
  satilik: tx('Satılık', 'for sale', 'للبيع'),
  kiralik: tx('Kiralık', 'for rent', 'للإيجار'),
  gunluk: tx('Günlük Kiralık', 'for holiday rent', 'للإيجار اليومي'),
  devren: tx('Devren Satılık', 'for transfer', 'للتنازل'),
};
const sizeByRooms: Record<string, [number, number]> = {
  s: [32, 48],
  '1': [62, 92],
  '2': [105, 145],
  '3': [150, 230],
  '4': [240, 420],
  '5': [380, 650],
  '6': [600, 1100],
};

function konut(): Draft {
  const type = pick(['daire', 'daire', 'daire', 'daire', 'villa', 'siraev', 'penthouse', 'dubleks', 'otel']);
  const deal =
    type === 'otel'
      ? pick(['gunluk', 'kiralik'])
      : pick(['satilik', 'satilik', 'satilik', 'kiralik', 'kiralik', 'kiralik', 'gunluk']);
  const villaLike = type === 'villa' || type === 'siraev';
  const area = villaLike
    ? pick<AreaId>(['dubai-hills', 'arabian-ranches', 'palm-jumeirah', 'jumeirah', 'mirdif'])
    : pick<AreaId>(['dubai-marina', 'downtown', 'business-bay', 'jvc', 'jlt', 'creek-harbour', 'palm-jumeirah', 'al-barsha', 'silicon-oasis', 'difc']);
  const rooms =
    type === 'villa'
      ? pick(['4', '5', '6'])
      : type === 'siraev'
        ? pick(['2', '3', '4'])
        : type === 'penthouse'
          ? pick(['3', '4', '5'])
          : pick(['s', '1', '1', '2', '2', '3']);
  const [minSize, maxSize] = sizeByRooms[rooms]!;
  const size = int(minSize, maxSize);
  const factor = getArea(area).price;
  const offPlan = deal === 'satilik' && chance(0.25);
  const furnished = deal === 'gunluk' ? 'esyali' : pick(['esyali', 'yari', 'esyasiz']);
  // Manzara bölgeye uygun seçilir (ör. Burj Khalifa yalnızca şehir merkezinden görünür).
  const views: Partial<Record<AreaId, string[]>> = {
    'dubai-marina': ['deniz', 'kanal', 'sehir'],
    'palm-jumeirah': ['deniz', 'deniz', 'sehir'],
    jumeirah: ['deniz', 'sehir', 'park'],
    downtown: ['burj', 'burj', 'sehir'],
    'business-bay': ['burj', 'kanal', 'sehir'],
    difc: ['burj', 'sehir'],
    'creek-harbour': ['kanal', 'burj', 'deniz'],
    jlt: ['kanal', 'sehir'],
  };
  const view = pick(views[area] ?? ['park', 'sehir']);
  const pool = yesNo(villaLike ? 0.6 : 0.85);

  const price =
    deal === 'satilik'
      ? round(size * int(15000, 22000) * factor, 5000)
      : deal === 'kiralik'
        ? round(size * int(850, 1300) * factor, 1000)
        : round(size * int(4, 7) * factor, 50);

  const adjective: Text | null =
    view === 'deniz' && chance(0.6)
      ? tx('Deniz Manzaralı', 'sea view', 'بإطلالة على البحر')
      : view === 'burj' && chance(0.6)
        ? tx('Burj Khalifa Manzaralı', 'Burj Khalifa view', 'بإطلالة على برج خليفة')
        : offPlan
          ? tx('Projeden', 'off-plan', 'على الخارطة')
          : furnished === 'esyali' && chance(0.5)
            ? tx('Eşyalı', 'furnished', 'مفروشة')
            : pool === 'yes' && villaLike
              ? tx('Havuzlu', 'with private pool', 'مع مسبح خاص')
              : null;

  const place = getArea(area).name;
  const room = roomTitle[rooms]!;
  const kind = typeTitle[type]!;
  const dealText = dealTitle[deal]!;
  const title: Text = {
    tr: [place.tr, adjective?.tr, room.tr, dealText.tr, kind.tr].filter(Boolean).join(' '),
    en: `${capital(room.en)} ${kind.en} ${dealText.en} in ${place.en}${adjective ? `, ${adjective.en}` : ''}`,
    ar: `${kind.ar} ${room.ar} ${dealText.ar} في ${place.ar}${adjective ? `، ${adjective.ar}` : ''}`,
  };

  return {
    group: 'emlak',
    sub: 'konut',
    title,
    price,
    period: deal === 'kiralik' ? 'year' : deal === 'gunluk' ? 'day' : null,
    area,
    attrs: {
      ilanTipi: deal,
      konutTipi: type,
      m2Brut: size,
      m2Net: Math.round(size * 0.88),
      oda: rooms,
      binaYasi: offPlan ? '0' : pick(['0', '1-5', '1-5', '6-10', '11-20']),
      kat: villaLike ? 'zemin' : pick(['1-5', '6-15', '6-15', '16-30', '31', 'cati']),
      katSayisi: villaLike ? int(2, 3) : int(12, 85),
      klima: pick(['merkezi', 'merkezi', 'split', 'chiller']),
      banyo: String(Math.min(rooms === 's' ? 1 : Number(rooms) + 1, 5)),
      balkon: yesNo(0.8),
      asansor: villaLike ? 'no' : 'yes',
      otopark: villaLike ? 'kapali' : pick(['kapali', 'kapali', 'acik']),
      esya: furnished,
      kullanim: offPlan ? 'bos' : pick(['bos', 'kiracili', 'sahibi']),
      tamamlanma: offPlan ? 'proje' : 'hazir',
      manzara: view,
      siteIci: yesNo(0.8),
      havuz: pool,
      krediye: deal === 'satilik' ? yesNo(0.7) : 'no',
      mulkiyet: 'freehold',
      kimdenEmlak: offPlan ? 'insaat' : pick(['sahibinden', 'ofis', 'ofis']),
      takas: yesNo(0.1),
    },
  };
}

/* ---------- İş yeri ve arsa ---------- */

function isYeri(): Draft {
  const type = pick(['ofis', 'ofis', 'dukkan', 'depo', 'restoran', 'plaza', 'showroom']);
  const deal = pick(['satilik', 'kiralik', 'kiralik', 'devren']);
  const area = type === 'depo' ? pick<AreaId>(['al-quoz', 'dubai-south', 'deira']) : pick<AreaId>(['business-bay', 'difc', 'jlt', 'downtown', 'deira', 'silicon-oasis', 'bur-dubai']);
  const size = type === 'depo' ? int(400, 3000) : type === 'plaza' ? int(800, 2000) : int(45, 400);
  const factor = getArea(area).price;
  const price =
    deal === 'kiralik' ? round(size * int(700, 1500) * factor, 1000) : round(size * int(9000, 18000) * factor, 5000);
  const kind = optionLabel('isyeriTipi', type);
  const dealText = dealTitle[deal]!;
  const place = getArea(area).name;
  return {
    group: 'emlak',
    sub: 'is-yeri',
    title: {
      tr: `${place.tr} ${dealText.tr} ${kind.tr} ${thousands(size)} m²`,
      en: `${kind.en} ${dealText.en} in ${place.en}, ${thousands(size)} m²`,
      ar: `${kind.ar} ${dealText.ar} في ${place.ar}، ${thousands(size)} م²`,
    },
    price,
    period: deal === 'kiralik' ? 'year' : null,
    area,
    attrs: {
      ilanTipi: deal,
      isyeriTipi: type,
      m2Brut: size,
      kat: type === 'depo' ? 'zemin' : pick(['zemin', '1-5', '6-15', '16-30']),
      otopark: pick(['acik', 'kapali']),
      mulkiyet: pick(['freehold', 'leasehold']),
      kimdenEmlak: pick(['sahibinden', 'ofis']),
      takas: yesNo(0.1),
    },
  };
}

function arsa(): Draft {
  const zoning = pick(['konut', 'konut', 'ticari', 'karma', 'sanayi']);
  const area = pick<AreaId>(['dubai-south', 'jvc', 'dubai-hills', 'arabian-ranches', 'al-quoz', 'jumeirah']);
  const size = int(450, 12000);
  const zone = optionLabel('imar', zoning);
  const place = getArea(area).name;
  return {
    group: 'emlak',
    sub: 'arsa',
    title: {
      tr: `${place.tr} ${zone.tr} İmarlı Satılık Arsa ${thousands(size)} m²`,
      en: `${zone.en} plot for sale in ${place.en}, ${thousands(size)} m²`,
      ar: `أرض ${zone.ar} للبيع في ${place.ar}، ${thousands(size)} م²`,
    },
    price: round(size * int(1800, 6500) * getArea(area).price, 10000),
    period: null,
    area,
    attrs: {
      ilanTipi: 'satilik',
      imar: zoning,
      m2: size,
      mulkiyet: 'freehold',
      krediye: yesNo(0.4),
      kimdenEmlak: pick(['sahibinden', 'ofis', 'insaat']),
      takas: yesNo(0.15),
    },
  };
}

/* ---------- Otomobil ---------- */

interface CarModel {
  brand: string;
  model: string;
  body: string;
  sub: 'otomobil' | 'arazi-suv-pickup' | 'elektrikli-araclar';
  price: number;
  fuel: string;
  hp: string;
  cc: string;
  drive: string;
}

const cars: CarModel[] = [
  { brand: 'Toyota', model: 'Land Cruiser GXR', body: 'suv', sub: 'arazi-suv-pickup', price: 330000, fuel: 'benzin', hp: '500', cc: '4000', drive: '4x4' },
  { brand: 'Toyota', model: 'Camry SE', body: 'sedan', sub: 'otomobil', price: 115000, fuel: 'benzin', hp: '300', cc: '2500', drive: 'onden' },
  { brand: 'Toyota', model: 'Hilux Double Cab', body: 'pickup', sub: 'arazi-suv-pickup', price: 135000, fuel: 'dizel', hp: '300', cc: '4000', drive: '4x4' },
  { brand: 'Nissan', model: 'Patrol LE Platinum', body: 'suv', sub: 'arazi-suv-pickup', price: 310000, fuel: 'benzin', hp: '501', cc: '4001', drive: '4x4' },
  { brand: 'Nissan', model: 'Altima SV', body: 'sedan', sub: 'otomobil', price: 92000, fuel: 'benzin', hp: '300', cc: '2500', drive: 'onden' },
  { brand: 'Lexus', model: 'LX 600', body: 'suv', sub: 'arazi-suv-pickup', price: 520000, fuel: 'benzin', hp: '501', cc: '4000', drive: '4x4' },
  { brand: 'Lexus', model: 'ES 350', body: 'sedan', sub: 'otomobil', price: 210000, fuel: 'benzin', hp: '300', cc: '4000', drive: 'onden' },
  { brand: 'Mercedes-Benz', model: 'G 63 AMG', body: 'suv', sub: 'arazi-suv-pickup', price: 850000, fuel: 'benzin', hp: '501', cc: '4000', drive: '4x4' },
  { brand: 'Mercedes-Benz', model: 'S 500', body: 'sedan', sub: 'otomobil', price: 560000, fuel: 'hibrit', hp: '500', cc: '4000', drive: 'awd' },
  { brand: 'Mercedes-Benz', model: 'C 200', body: 'sedan', sub: 'otomobil', price: 190000, fuel: 'benzin', hp: '300', cc: '2500', drive: 'arkadan' },
  { brand: 'BMW', model: 'X5 xDrive40i', body: 'suv', sub: 'arazi-suv-pickup', price: 360000, fuel: 'benzin', hp: '500', cc: '4000', drive: 'awd' },
  { brand: 'BMW', model: 'M4 Competition', body: 'coupe', sub: 'otomobil', price: 420000, fuel: 'benzin', hp: '501', cc: '4000', drive: 'arkadan' },
  { brand: 'Porsche', model: '911 Carrera S', body: 'coupe', sub: 'otomobil', price: 640000, fuel: 'benzin', hp: '500', cc: '4000', drive: 'arkadan' },
  { brand: 'Porsche', model: 'Cayenne', body: 'suv', sub: 'arazi-suv-pickup', price: 430000, fuel: 'benzin', hp: '500', cc: '4000', drive: 'awd' },
  { brand: 'Land Rover', model: 'Range Rover Sport', body: 'suv', sub: 'arazi-suv-pickup', price: 480000, fuel: 'benzin', hp: '500', cc: '4000', drive: '4x4' },
  { brand: 'Land Rover', model: 'Defender 110', body: 'suv', sub: 'arazi-suv-pickup', price: 390000, fuel: 'benzin', hp: '500', cc: '4000', drive: '4x4' },
  { brand: 'Ford', model: 'Mustang GT', body: 'coupe', sub: 'otomobil', price: 210000, fuel: 'benzin', hp: '501', cc: '4001', drive: 'arkadan' },
  { brand: 'Chevrolet', model: 'Tahoe LT', body: 'suv', sub: 'arazi-suv-pickup', price: 260000, fuel: 'benzin', hp: '500', cc: '4001', drive: '4x4' },
  { brand: 'Hyundai', model: 'Tucson', body: 'suv', sub: 'arazi-suv-pickup', price: 105000, fuel: 'benzin', hp: '300', cc: '2500', drive: 'onden' },
  { brand: 'Kia', model: 'K5 GT-Line', body: 'sedan', sub: 'otomobil', price: 98000, fuel: 'benzin', hp: '300', cc: '2500', drive: 'onden' },
  { brand: 'Volkswagen', model: 'Golf GTI', body: 'hatchback', sub: 'otomobil', price: 140000, fuel: 'benzin', hp: '300', cc: '2500', drive: 'onden' },
  { brand: 'Tesla', model: 'Model 3 Long Range', body: 'sedan', sub: 'elektrikli-araclar', price: 175000, fuel: 'elektrik', hp: '500', cc: '1600', drive: 'awd' },
  { brand: 'Tesla', model: 'Model Y Performance', body: 'suv', sub: 'elektrikli-araclar', price: 210000, fuel: 'elektrik', hp: '500', cc: '1600', drive: 'awd' },
  { brand: 'BMW', model: 'iX xDrive50', body: 'suv', sub: 'elektrikli-araclar', price: 360000, fuel: 'elektrik', hp: '501', cc: '1600', drive: 'awd' },
];

const specTitle: Record<string, Text> = {
  gcc: tx('GCC', 'GCC specs', 'مواصفات خليجية'),
  amerikan: tx('Amerikan Spec', 'US specs', 'مواصفات أمريكية'),
  japon: tx('Japon Spec', 'Japanese specs', 'مواصفات يابانية'),
  avrupa: tx('Avrupa Spec', 'European specs', 'مواصفات أوروبية'),
};
const carNotes: Text[] = [
  tx('Hatasız', 'accident-free', 'بدون حوادث'),
  tx('Bakımları Yetkili Serviste', 'full dealer service history', 'صيانة كاملة لدى الوكيل'),
  tx('Düşük Kilometre', 'low mileage', 'ممشى قليل'),
  tx('İlk Sahibinden', 'first owner', 'المالك الأول'),
  tx('Garantili', 'under warranty', 'تحت الضمان'),
];

function car(model: CarModel): Draft {
  const year = int(2016, 2026);
  const age = 2026 - year;
  const isNew = age === 0 && chance(0.5);
  const km = isNew ? int(0, 50) : round(age * int(9000, 22000) + int(0, 8000), 500);
  // GCC çoğunlukta; ithal araçlar markanın geldiği pazarın spesifikasyonunu taşır.
  const origin: Record<string, string> = {
    Toyota: 'japon',
    Nissan: 'japon',
    Lexus: 'japon',
    Ford: 'amerikan',
    Chevrolet: 'amerikan',
    Tesla: 'amerikan',
  };
  const spec = chance(0.75) ? 'gcc' : (origin[model.brand] ?? (['Hyundai', 'Kia'].includes(model.brand) ? 'gcc' : 'avrupa'));
  const note = isNew ? tx('Sıfır', 'brand new', 'جديدة') : pick(carNotes);
  const name = `${model.brand} ${model.model}`;
  const specText = specTitle[spec]!;
  return {
    group: 'vasita',
    sub: model.sub,
    title: {
      tr: `${year} ${name} ${specText.tr}, ${note.tr}`,
      en: `${year} ${name}, ${specText.en}, ${note.en}`,
      ar: `${name} ${year}، ${specText.ar}، ${note.ar}`,
    },
    price: round(model.price * Math.pow(0.88, age) * (0.9 + random() * 0.2), 500),
    period: null,
    area: pick(areaIds),
    attrs: {
      marka: slug(model.brand),
      yil: year,
      yakit: model.fuel,
      vites: 'otomatik',
      durum: isNew ? 'sifir' : 'ikinci',
      spec,
      km,
      kasa: model.body,
      motorGucu: model.hp,
      motorHacmi: model.cc,
      cekis: model.drive,
      renk: pick(['beyaz', 'beyaz', 'siyah', 'gri', 'gumus', 'mavi', 'kirmizi', 'bej']),
      garanti: age <= 2 ? 'yes' : 'no',
      agirHasar: yesNo(0.05),
      kayit: pick(['dubai', 'dubai', 'dubai', 'abudhabi', 'sharjah', 'diger']),
      kimdenVasita: pick(['sahibinden', 'galeri', 'galeri', 'yetkili']),
      takas: yesNo(0.2),
    },
  };
}

/* ---------- Motosiklet ve deniz araçları ---------- */

const bikes = [
  { brand: 'Harley-Davidson', model: 'Fat Boy 114', type: 'cruiser', price: 85000 },
  { brand: 'Ducati', model: 'Panigale V4 S', type: 'sport', price: 120000 },
  { brand: 'Kawasaki', model: 'Ninja 650', type: 'sport', price: 32000 },
  { brand: 'Yamaha', model: 'MT-07', type: 'naked', price: 30000 },
  { brand: 'BMW', model: 'R 1250 GS Adventure', type: 'enduro', price: 95000 },
  { brand: 'Honda', model: 'Gold Wing Tour', type: 'touring', price: 110000 },
];

function bike(model: (typeof bikes)[number]): Draft {
  const year = int(2017, 2026);
  const km = round((2026 - year) * int(2000, 7000) + int(0, 3000), 100);
  const name = `${model.brand} ${model.model}`;
  return {
    group: 'vasita',
    sub: 'motosiklet',
    title: {
      tr: `${year} ${name}, ${thousands(km)} km`,
      en: `${year} ${name}, ${thousands(km)} km`,
      ar: `${name} ${year}، ${thousands(km)} كم`,
    },
    price: round(model.price * Math.pow(0.9, 2026 - year), 500),
    period: null,
    area: pick(areaIds),
    attrs: {
      motoMarka: slug(model.brand),
      motoTipi: model.type,
      yil: year,
      km,
      durum: km < 100 ? 'sifir' : 'ikinci',
      renk: pick(['siyah', 'kirmizi', 'beyaz', 'gri']),
      kimdenVasita: pick(['sahibinden', 'galeri']),
      takas: yesNo(0.25),
    },
  };
}

const boats = [
  { model: 'Azimut 55 Fly', type: 'motoryat', length: 17, price: 3200000 },
  { model: 'Sunseeker Manhattan 52', type: 'motoryat', length: 16, price: 2900000 },
  { model: 'Gulf Craft Majesty 62', type: 'motoryat', length: 19, price: 4100000 },
  { model: 'Beneteau Oceanis 46.1', type: 'yelkenli', length: 14, price: 1250000 },
  { model: 'Yamaha 242X E-Series', type: 'surat', length: 7, price: 260000 },
  { model: 'Sea-Doo RXP-X 325', type: 'jetski', length: 3, price: 78000 },
];

function boat(model: (typeof boats)[number]): Draft {
  const year = int(2015, 2025);
  const kind = optionLabel('tekneTipi', model.type);
  return {
    group: 'vasita',
    sub: 'deniz-araclari',
    title: {
      tr: `${year} ${model.model} ${kind.tr}`,
      en: `${year} ${model.model} ${kind.en.toLowerCase()}`,
      ar: `${kind.ar} ${model.model} ${year}`,
    },
    price: round(model.price * Math.pow(0.93, 2026 - year), 1000),
    period: null,
    area: pick<AreaId>(['dubai-marina', 'palm-jumeirah', 'creek-harbour', 'jumeirah']),
    attrs: {
      tekneTipi: model.type,
      yil: year,
      uzunluk: model.length,
      durum: 'ikinci',
      kimdenVasita: pick(['sahibinden', 'galeri']),
      takas: yesNo(0.2),
    },
  };
}

/* ---------- Ürün ve hizmet ilanları ---------- */

interface Item {
  group: string;
  sub: string;
  title: Text;
  price: [number, number];
  period?: Period;
  attrs?: Record<string, string | number>;
  /** Ürünlerde başlığa eklenen durum (Sıfır / İkinci el). */
  condition?: boolean;
}

const conditionTitle: Record<string, Text> = {
  sifir: tx('Sıfır', 'new', 'جديد'),
  ikinci: tx('İkinci El', 'used', 'مستعمل'),
  yenilenmis: tx('Yenilenmiş', 'refurbished', 'مجدد'),
};

const item = (
  group: string,
  sub: string,
  title: Text,
  price: [number, number],
  extra: Partial<Item> = {},
): Item => ({ group, sub, title, price, condition: group === 'alisveris' || group === 'yedek-parca', ...extra });

const items: Item[] = [
  /* Emlak, üretilmeyen alt kategoriler */
  item('emlak', 'konut-projeleri', tx('Dubai Creek Harbour Yeni Proje, Stüdyodan 3+1’e', 'New launch at Dubai Creek Harbour, studio to 3 bedrooms', 'مشروع جديد في خور دبي، من استوديو إلى 3 غرف'), [950000, 1400000], { attrs: { ilanTipi: 'satilik', m2Brut: 48, kimdenEmlak: 'insaat', mulkiyet: 'freehold' } }),
  item('emlak', 'konut-projeleri', tx('Dubai South Ödeme Planlı Sıra Evler', 'Dubai South townhouses with payment plan', 'تاون هاوس في دبي الجنوب مع خطة سداد'), [1600000, 2100000], { attrs: { ilanTipi: 'satilik', m2Brut: 180, kimdenEmlak: 'insaat', mulkiyet: 'freehold' } }),
  item('emlak', 'konut-projeleri', tx('JVC Teslime Hazır Yeni Rezidans', 'Ready-to-move residence in JVC', 'مجمع سكني جاهز للتسليم في قرية جميرا الدائرية'), [680000, 900000], { attrs: { ilanTipi: 'satilik', m2Brut: 70, kimdenEmlak: 'insaat', mulkiyet: 'freehold' } }),
  item('emlak', 'bina', tx('Al Barsha Satılık 8 Katlı Bina, Tamamı Kiracılı', 'Fully tenanted 8-floor building for sale in Al Barsha', 'مبنى من 8 طوابق مؤجر بالكامل للبيع في البرشاء'), [38000000, 46000000], { attrs: { ilanTipi: 'satilik', m2Brut: 5400, kimdenEmlak: 'ofis', mulkiyet: 'freehold' } }),
  item('emlak', 'bina', tx('Deira Ticari ve Konut Karma Bina', 'Mixed-use building in Deira', 'مبنى متعدد الاستخدامات في ديرة'), [22000000, 28000000], { attrs: { ilanTipi: 'satilik', m2Brut: 3600, kimdenEmlak: 'sahibinden', mulkiyet: 'freehold' } }),
  item('emlak', 'devre-mulk', tx('Palm Jumeirah Otelde Yılda 2 Hafta Devre Mülk', 'Two weeks a year timeshare on Palm Jumeirah', 'أسبوعان سنويًا بنظام المشاركة الزمنية في نخلة جميرا'), [45000, 70000], { attrs: { ilanTipi: 'satilik', m2Brut: 65, kimdenEmlak: 'sahibinden', mulkiyet: 'leasehold' } }),
  item('emlak', 'turistik-tesis', tx('Jumeirah Sahile Yakın 40 Odalı Butik Otel', '40-room boutique hotel near Jumeirah beach', 'فندق بوتيك من 40 غرفة قرب شاطئ جميرا'), [65000000, 80000000], { attrs: { ilanTipi: 'satilik', m2Brut: 4200, kimdenEmlak: 'ofis', mulkiyet: 'freehold' } }),

  /* Vasıta, üretilmeyen alt kategoriler */
  item('vasita', 'minivan-panelvan', tx('2021 Toyota Hiace Panelvan, Bakımlı', '2021 Toyota Hiace panel van, well maintained', 'تويوتا هايس فان 2021، صيانة منتظمة'), [72000, 88000], { attrs: { marka: 'toyota', yil: 2021, km: 98000, yakit: 'dizel', vites: 'manuel', durum: 'ikinci', renk: 'beyaz', kimdenVasita: 'galeri', takas: 'no' } }),
  item('vasita', 'minivan-panelvan', tx('2023 Kia Carnival 8 Kişilik', '2023 Kia Carnival, 8 seats', 'كيا كرنفال 2023، 8 مقاعد'), [125000, 140000], { attrs: { marka: 'kia', yil: 2023, km: 31000, yakit: 'benzin', vites: 'otomatik', durum: 'ikinci', renk: 'gri', kimdenVasita: 'sahibinden', takas: 'yes' } }),
  item('vasita', 'ticari-araclar', tx('2020 Mitsubishi Canter Kamyonet, 4 Ton', '2020 Mitsubishi Canter truck, 4 tonnes', 'شاحنة ميتسوبيشي كانتر 2020، 4 أطنان'), [68000, 82000], { attrs: { marka: 'mitsubishi', yil: 2020, km: 142000, yakit: 'dizel', vites: 'manuel', durum: 'ikinci', renk: 'beyaz', kimdenVasita: 'galeri', takas: 'no' } }),
  item('vasita', 'kiralik-araclar', tx('Günlük Kiralık 2025 Nissan Patrol', '2025 Nissan Patrol for daily rent', 'نيسان باترول 2025 للإيجار اليومي'), [550, 750], { period: 'day', attrs: { marka: 'nissan', yil: 2025, yakit: 'benzin', vites: 'otomatik', durum: 'ikinci', renk: 'beyaz', kimdenVasita: 'galeri' } }),
  item('vasita', 'kiralik-araclar', tx('Aylık Kiralık 2024 Toyota Corolla', '2024 Toyota Corolla for monthly rent', 'تويوتا كورولا 2024 للإيجار الشهري'), [2200, 2800], { period: 'month', attrs: { marka: 'toyota', yil: 2024, yakit: 'benzin', vites: 'otomatik', durum: 'ikinci', renk: 'gumus', kimdenVasita: 'galeri' } }),
  item('vasita', 'hasarli-araclar', tx('2019 Chevrolet Camaro, Ön Hasarlı', '2019 Chevrolet Camaro, front damage', 'شيفروليه كامارو 2019، أضرار أمامية'), [38000, 52000], { attrs: { marka: 'chevrolet', yil: 2019, km: 76000, yakit: 'benzin', vites: 'otomatik', durum: 'ikinci', renk: 'kirmizi', kimdenVasita: 'sahibinden', takas: 'no' } }),
  item('vasita', 'klasik-araclar', tx('1972 Mercedes-Benz 280 SL Pagoda, Restore Edilmiş', '1972 Mercedes-Benz 280 SL Pagoda, restored', 'مرسيدس بنز 280 SL باغودا 1972، مجددة'), [420000, 520000], { attrs: { marka: 'mercedes-benz', yil: 1972, km: 118000, yakit: 'benzin', vites: 'manuel', durum: 'ikinci', renk: 'kirmizi', kimdenVasita: 'galeri', takas: 'no' } }),
  item('vasita', 'ozel-plaka', tx('Dubai Özel Plaka, Tek Harf 3 Rakam', 'Dubai number plate, single letter and 3 digits', 'لوحة دبي مميزة، حرف واحد و3 أرقام'), [45000, 90000], { attrs: { kayit: 'dubai', kimdenVasita: 'sahibinden' } }),
  item('vasita', 'ozel-plaka', tx('Abu Dabi Özel Plaka, Tekrarlı 4 Rakam', 'Abu Dhabi plate, repeating 4 digits', 'لوحة أبوظبي مميزة، 4 أرقام متكررة'), [30000, 60000], { attrs: { kayit: 'abudhabi', kimdenVasita: 'sahibinden' } }),

  /* Yedek parça */
  item('yedek-parca', 'otomotiv-ekipmanlari', tx('Land Cruiser Orijinal 20" Jant Seti', 'Original Land Cruiser 20" rim set', 'طقم جنوط أصلية لاند كروزر 20 إنش'), [3500, 5500]),
  item('yedek-parca', 'otomotiv-ekipmanlari', tx('Michelin Pilot Sport 4 Lastik Seti', 'Michelin Pilot Sport 4 tyre set', 'طقم إطارات Michelin Pilot Sport 4'), [2400, 3600]),
  item('yedek-parca', 'motosiklet-ekipmanlari', tx('Shoei NXR2 Kask, M Beden', 'Shoei NXR2 helmet, size M', 'خوذة Shoei NXR2 مقاس M'), [1400, 2100]),
  item('yedek-parca', 'deniz-araci-ekipmanlari', tx('Yamaha 200 HP Dıştan Takma Motor', 'Yamaha 200 HP outboard engine', 'محرك خارجي Yamaha بقوة 200 حصان'), [42000, 58000]),

  /* Alışveriş */
  item('alisveris', 'cep-telefonu', same('iPhone 16 Pro 256 GB'), [3600, 4600]),
  item('alisveris', 'cep-telefonu', same('iPhone 15 128 GB'), [2200, 2800]),
  item('alisveris', 'cep-telefonu', same('Samsung Galaxy S25 Ultra 512 GB'), [3800, 4800]),
  item('alisveris', 'cep-telefonu', same('Google Pixel 9 Pro 256 GB'), [2600, 3300]),
  item('alisveris', 'cep-telefonu', same('Samsung Galaxy Z Flip6'), [2400, 3200]),
  item('alisveris', 'bilgisayar', same('MacBook Air M3 13"'), [3200, 4200]),
  item('alisveris', 'bilgisayar', same('MacBook Pro 14" M4 Pro'), [6500, 8500]),
  item('alisveris', 'bilgisayar', same('Dell XPS 13 Plus'), [3000, 4200]),
  item('alisveris', 'bilgisayar', tx('Oyun Bilgisayarı RTX 4070, 32 GB RAM', 'Gaming PC RTX 4070, 32 GB RAM', 'حاسوب ألعاب RTX 4070، ذاكرة 32 جيجابايت'), [4500, 6500]),
  item('alisveris', 'bilgisayar', same('iPad Pro 11" M4'), [3300, 4300]),
  item('alisveris', 'fotograf-kamera', tx('Sony A7 IV Gövde', 'Sony A7 IV body', 'هيكل Sony A7 IV'), [6500, 8000]),
  item('alisveris', 'fotograf-kamera', same('Canon EOS R6 Mark II'), [7800, 9500]),
  item('alisveris', 'fotograf-kamera', tx('DJI Mini 4 Pro Drone', 'DJI Mini 4 Pro drone', 'طائرة DJI Mini 4 Pro'), [2800, 3600]),
  item('alisveris', 'ev-dekorasyonu', tx('3 Kişilik Keten Kanepe', 'Three-seater linen sofa', 'أريكة كتان لثلاثة أشخاص'), [900, 3500]),
  item('alisveris', 'ev-dekorasyonu', tx('6 Kişilik Masif Yemek Masası', 'Solid wood six-seat dining table', 'طاولة طعام خشبية لستة أشخاص'), [1200, 4000]),
  item('alisveris', 'ev-dekorasyonu', tx('El Dokuma Halı 200x300', 'Hand-woven rug 200x300', 'سجادة منسوجة يدويًا 200×300'), [1500, 6000]),
  item('alisveris', 'ev-dekorasyonu', tx('Yatak Odası Takımı, 160x200', 'Bedroom set, 160x200', 'طقم غرفة نوم 160×200'), [2500, 7000]),
  item('alisveris', 'ev-elektronigi', tx('65" OLED Televizyon', '65-inch OLED TV', 'تلفزيون OLED مقاس 65 بوصة'), [3800, 6500]),
  item('alisveris', 'ev-elektronigi', tx('Sonos Arc Soundbar', 'Sonos Arc soundbar', 'مكبر صوت Sonos Arc'), [2200, 3200]),
  item('alisveris', 'elektrikli-ev-aletleri', tx('Dyson V15 Detect Süpürge', 'Dyson V15 Detect vacuum', 'مكنسة Dyson V15 Detect'), [1500, 2400]),
  item('alisveris', 'elektrikli-ev-aletleri', tx('Bosch Bulaşık Makinesi, Seri 6', 'Bosch Series 6 dishwasher', 'غسالة صحون Bosch الفئة 6'), [1300, 2200]),
  item('alisveris', 'elektrikli-ev-aletleri', tx('Nespresso Vertuo Kahve Makinesi', 'Nespresso Vertuo coffee machine', 'آلة قهوة Nespresso Vertuo'), [350, 700]),
  item('alisveris', 'giyim-aksesuar', tx('El İşlemeli Abaya', 'Hand-embroidered abaya', 'عباءة مطرزة يدويًا'), [450, 1800]),
  item('alisveris', 'giyim-aksesuar', tx('Deri Ceket, L Beden', 'Leather jacket, size L', 'سترة جلدية مقاس L'), [400, 1500]),
  item('alisveris', 'saat', same('Rolex Submariner Date 41 mm'), [38000, 60000]),
  item('alisveris', 'saat', same('Omega Speedmaster Moonwatch'), [19000, 26000]),
  item('alisveris', 'saat', same('Apple Watch Ultra 2'), [2200, 3000]),
  item('alisveris', 'anne-bebek', tx('Bugaboo Fox 5 Bebek Arabası', 'Bugaboo Fox 5 stroller', 'عربة أطفال Bugaboo Fox 5'), [2200, 3800]),
  item('alisveris', 'anne-bebek', tx('Isofix Oto Koltuğu 0-4 Yaş', 'Isofix car seat, 0–4 years', 'مقعد سيارة Isofix من 0 إلى 4 سنوات'), [450, 1100]),
  item('alisveris', 'oyun-konsol', same('PlayStation 5 Slim 1 TB'), [1500, 2100]),
  item('alisveris', 'oyun-konsol', same('Nintendo Switch OLED'), [900, 1300]),
  item('alisveris', 'muzik', tx('Yamaha P-225 Dijital Piyano', 'Yamaha P-225 digital piano', 'بيانو رقمي Yamaha P-225'), [1800, 2600]),
  item('alisveris', 'spor', tx('Technogym Koşu Bandı', 'Technogym treadmill', 'جهاز مشي Technogym'), [6000, 14000]),
  item('alisveris', 'spor', tx('Karbon Yol Bisikleti, 56 cm', 'Carbon road bike, 56 cm', 'دراجة طريق كربونية مقاس 56 سم'), [3500, 9000]),

  /* İş makineleri */
  item('is-makineleri', 'agir-makine', tx('2018 CAT 320 Paletli Ekskavatör', '2018 CAT 320 crawler excavator', 'حفارة مجنزرة CAT 320 موديل 2018'), [320000, 410000], { attrs: { yil: 2018, durum: 'ikinci', kimdenFirma: 'firma', takas: 'no' } }),
  item('is-makineleri', 'agir-makine', tx('2021 Toyota Forklift, 3 Ton', '2021 Toyota forklift, 3 tonnes', 'رافعة شوكية Toyota موديل 2021، 3 أطنان'), [62000, 80000], { attrs: { yil: 2021, durum: 'ikinci', kimdenFirma: 'firma', takas: 'yes' } }),
  item('is-makineleri', 'elektrik-enerji', tx('Cummins Jeneratör 100 kVA', 'Cummins generator 100 kVA', 'مولد Cummins بقدرة 100 كيلو فولت أمبير'), [48000, 65000], { attrs: { yil: 2022, durum: 'ikinci', kimdenFirma: 'firma', takas: 'no' } }),

  /* Ustalar ve hizmetler */
  item('ustalar-hizmetler', 'nakliye', tx('Ev Taşıma, Paketleme ve Montaj Dahil', 'Home moving with packing and assembly', 'نقل منزلي مع التغليف والتركيب'), [900, 2500], { condition: false, attrs: { kimdenFirma: 'firma' } }),
  item('ustalar-hizmetler', 'klima-teknik', tx('Klima Bakım ve Kanal Temizliği', 'AC servicing and duct cleaning', 'صيانة المكيفات وتنظيف مجاري الهواء'), [180, 450], { condition: false, attrs: { kimdenFirma: 'firma' } }),
  item('ustalar-hizmetler', 'temizlik', tx('Ev Temizliği, Malzeme Dahil', 'Home cleaning, materials included', 'تنظيف المنازل مع المواد'), [35, 50], { condition: false, period: 'hour', attrs: { kimdenFirma: 'firma' } }),
  item('ustalar-hizmetler', 'ev-tadilat', tx('Boya, Badana ve Küçük Tadilat', 'Painting and small renovation jobs', 'دهان وأعمال تجديد صغيرة'), [1200, 4000], { condition: false, attrs: { kimdenFirma: 'bireysel' } }),

  /* Özel ders */
  item('ozel-ders', 'lise-universite', tx('Matematik Özel Ders, IB ve A-Level', 'Maths tutoring, IB and A-Level', 'دروس رياضيات خصوصية، IB و A-Level'), [180, 300], { condition: false, period: 'hour', attrs: { dersYeri: 'ogrenci', kimdenFirma: 'bireysel' } }),
  item('ozel-ders', 'yabanci-dil', tx('İngilizce Konuşma Dersi', 'English speaking lessons', 'دروس محادثة باللغة الإنجليزية'), [120, 200], { condition: false, period: 'hour', attrs: { dersYeri: 'online', kimdenFirma: 'bireysel' } }),
  item('ozel-ders', 'yabanci-dil', tx('Başlangıç Seviyesi Arapça', 'Arabic for beginners', 'العربية للمبتدئين'), [100, 180], { condition: false, period: 'hour', attrs: { dersYeri: 'egitmen', kimdenFirma: 'firma' } }),
  item('ozel-ders', 'muzik-dersi', tx('Piyano Dersi, Her Seviye', 'Piano lessons, all levels', 'دروس بيانو لجميع المستويات'), [150, 250], { condition: false, period: 'hour', attrs: { dersYeri: 'ogrenci', kimdenFirma: 'bireysel' } }),

  /* İş ilanları */
  item('is-ilanlari', 'satis-pazarlama', tx('Emlak Danışmanı, Türkçe Bilen', 'Real estate consultant, Turkish speaker', 'مستشار عقاري يتحدث التركية'), [8000, 15000], { condition: false, period: 'month', attrs: { calisma: 'tam', deneyim: '1-3', vize: 'yes', kimdenFirma: 'firma' } }),
  item('is-ilanlari', 'turizm-otel', tx('Otel Resepsiyonisti', 'Hotel receptionist', 'موظف استقبال فندق'), [5500, 7500], { condition: false, period: 'month', attrs: { calisma: 'tam', deneyim: '1-3', vize: 'yes', kimdenFirma: 'firma' } }),
  item('is-ilanlari', 'yeme-icme', tx('Barista, Vardiyalı', 'Barista, shift work', 'باريستا بنظام المناوبات'), [4000, 5500], { condition: false, period: 'month', attrs: { calisma: 'yari', deneyim: '0', vize: 'no', kimdenFirma: 'firma' } }),
  item('is-ilanlari', 'lojistik', tx('Teslimat Sürücüsü, Ehliyetli', 'Delivery driver, UAE licence', 'سائق توصيل برخصة إماراتية'), [4500, 6500], { condition: false, period: 'month', attrs: { calisma: 'tam', deneyim: '1-3', vize: 'yes', kimdenFirma: 'firma' } }),
  item('is-ilanlari', 'finans-muhasebe', tx('Muhasebe Uzmanı', 'Accountant', 'محاسب'), [10000, 16000], { condition: false, period: 'month', attrs: { calisma: 'tam', deneyim: '3-5', vize: 'yes', kimdenFirma: 'firma' } }),
  item('is-ilanlari', 'bilisim', tx('Kıdemli Yazılım Geliştirici', 'Senior software developer', 'مطوّر برمجيات أول'), [22000, 35000], { condition: false, period: 'month', attrs: { calisma: 'tam', deneyim: '5', vize: 'yes', kimdenFirma: 'firma' } }),

  /* Yardımcı arayanlar */
  item('yardimci-arayanlar', 'bebek-cocuk', tx('Yatılı Bebek Bakıcısı Aranıyor', 'Live-in nanny wanted', 'مطلوب مربية مقيمة'), [3500, 5000], { condition: false, period: 'month', attrs: { kimdenFirma: 'bireysel' } }),
  item('yardimci-arayanlar', 'ev-isleri', tx('Haftada 3 Gün Ev Yardımcısı', 'Housekeeper, 3 days a week', 'مدبرة منزل 3 أيام أسبوعيًا'), [1800, 2600], { condition: false, period: 'month', attrs: { kimdenFirma: 'bireysel' } }),

  /* Hayvanlar */
  item('hayvanlar-alemi', 'kedi', tx('İran Kedisi Yavruları, Aşıları Tam', 'Persian kittens, fully vaccinated', 'قطط فارسية صغيرة، مطعّمة بالكامل'), [900, 1800], { condition: false, attrs: { kimdenFirma: 'bireysel' } }),
  item('hayvanlar-alemi', 'akvaryum', tx('200 Litre Akvaryum Seti, Filtreli', '200-litre aquarium set with filter', 'حوض أسماك 200 لتر مع فلتر'), [700, 1400], { condition: false, attrs: { kimdenFirma: 'bireysel' } }),
  item('hayvanlar-alemi', 'evcil-urunler', tx('Büyük Boy Kedi Tırmalama Ağacı', 'Large cat tree', 'شجرة خدش كبيرة للقطط'), [250, 600]),
];

function fromItem(entry: Item): Draft {
  // "Yenilenmiş" yalnızca elektronik ürünlerde anlamlı.
  const electronic = ['cep-telefonu', 'bilgisayar', 'fotograf-kamera', 'ev-elektronigi', 'oyun-konsol'].includes(entry.sub);
  const condition = entry.condition
    ? pick(electronic ? ['ikinci', 'ikinci', 'sifir', 'yenilenmis'] : ['ikinci', 'ikinci', 'sifir'])
    : null;
  const label = condition ? conditionTitle[condition]! : null;
  const title: Text = label
    ? {
        tr: `${entry.title.tr}, ${label.tr}`,
        en: `${entry.title.en}, ${label.en}`,
        ar: `${entry.title.ar}، ${label.ar}`,
      }
    : entry.title;
  const attrs: Record<string, string | number> = condition
    ? {
        urunDurumu: condition,
        garanti: condition === 'sifir' ? 'yes' : yesNo(0.3),
        kimdenAlisveris: pick(['sahibinden', 'sahibinden', 'magaza']),
        takas: yesNo(0.2),
      }
    : {};
  const [min, max] = entry.price;
  const step = max > 100000 ? 10000 : max > 10000 ? 500 : max > 1000 ? 50 : 5;
  return {
    group: entry.group,
    sub: entry.sub,
    title,
    price: round(min + random() * (max - min), step),
    period: entry.period ?? null,
    area: pick(areaIds),
    attrs: { ...attrs, ...entry.attrs },
  };
}

/* ---------- Toplama ---------- */

const drafts: Draft[] = [
  ...Array.from({ length: 30 }, konut),
  ...Array.from({ length: 8 }, isYeri),
  ...Array.from({ length: 5 }, arsa),
  ...cars.map(car),
  ...cars.filter(() => chance(0.45)).map(car),
  ...bikes.map(bike),
  ...boats.map(boat),
  ...items.map(fromItem),
];

/** Vitrinde gösterilecek ilan sayısı (7 sütun x 8 satır). */
const SHOWCASE = 56;

export const demoListings: Listing[] = drafts.map((draft, index) => ({
  ...draft,
  id: String(1180000000 + index * 7919 + int(0, 999)),
  daysAgo: Math.floor(Math.pow(random(), 1.6) * 40),
  tone: ((index % 4) + 1) as Listing['tone'],
  urgent: chance(0.1),
  showcase: false,
}));

// Vitrin: kategorileri karıştırarak dengeli bir seçki.
const shuffled = [...demoListings].sort(() => random() - 0.5);
shuffled.slice(0, SHOWCASE).forEach((listing) => {
  listing.showcase = true;
});
export const showcaseOrder = shuffled.slice(0, SHOWCASE).map((listing) => listing.id);
