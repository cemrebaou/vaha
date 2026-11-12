import { same, tx, type Text } from '@/i18n/text';

/**
 * Arama kriterleri. Her alt kategori aşağıdaki setlerden birini kullanır;
 * filtre paneli, sonuç tablosu sütunları ve ilan detayındaki bilgi tablosu buradan üretilir.
 * Yeni kriter: `library` içine bir alan, ilgili sete alan kimliği.
 */

export interface Option {
  id: string;
  label: Text;
}

interface Base {
  id: string;
  label: Text;
}

export type Field =
  | (Base & { kind: 'range'; unit?: Text; plain?: boolean })
  | (Base & { kind: 'multi'; options: Option[] })
  | (Base & { kind: 'bool' });

export const YES = tx('Evet', 'Yes', 'نعم');
export const NO = tx('Hayır', 'No', 'لا');

const o = (id: string, tr: string, en: string = tr, ar: string = en): Option => ({
  id,
  label: tx(tr, en, ar),
});
const range = (id: string, label: Text, unit?: Text, plain = false): Field => ({
  id,
  label,
  kind: 'range',
  unit,
  plain,
});
const multi = (id: string, label: Text, options: Option[]): Field => ({
  id,
  label,
  kind: 'multi',
  options,
});
const bool = (id: string, label: Text): Field => ({ id, label, kind: 'bool' });

const M2 = tx('m²', 'm²', 'م²');
const KM = tx('km', 'km', 'كم');
const METRE = tx('m', 'm', 'م');

const carBrands = [
  'Audi',
  'BMW',
  'Chevrolet',
  'Ford',
  'Hyundai',
  'Kia',
  'Land Rover',
  'Lexus',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Porsche',
  'Tesla',
  'Toyota',
  'Volkswagen',
].map((name) => ({ id: slug(name), label: same(name) }));

const motoBrands = ['BMW', 'Ducati', 'Harley-Davidson', 'Honda', 'Kawasaki', 'Yamaha'].map(
  (name) => ({ id: slug(name), label: same(name) }),
);

export function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const library: Field[] = [
  /* ---------- Emlak ---------- */
  multi('ilanTipi', tx('İlan Tipi', 'Listing type', 'نوع الإعلان'), [
    o('satilik', 'Satılık', 'For sale', 'للبيع'),
    o('kiralik', 'Kiralık', 'For rent', 'للإيجار'),
    o('gunluk', 'Turistik Günlük Kiralık', 'Holiday home (daily)', 'إيجار سياحي يومي'),
    o('devren', 'Devren Satılık', 'Business transfer', 'للتنازل'),
  ]),
  multi('konutTipi', tx('Konut Tipi', 'Property type', 'نوع العقار'), [
    o('daire', 'Daire', 'Apartment', 'شقة'),
    o('villa', 'Villa', 'Villa', 'فيلا'),
    o('siraev', 'Sıra Ev', 'Townhouse', 'تاون هاوس'),
    o('penthouse', 'Penthouse', 'Penthouse', 'بنتهاوس'),
    o('dubleks', 'Dubleks', 'Duplex', 'دوبلكس'),
    o('otel', 'Otel Dairesi', 'Hotel apartment', 'شقة فندقية'),
  ]),
  multi('isyeriTipi', tx('İş Yeri Tipi', 'Commercial type', 'نوع العقار التجاري'), [
    o('ofis', 'Ofis', 'Office', 'مكتب'),
    o('dukkan', 'Dükkan & Mağaza', 'Shop & retail', 'محل تجاري'),
    o('depo', 'Depo & Antrepo', 'Warehouse', 'مستودع'),
    o('restoran', 'Restoran & Kafe', 'Restaurant & café', 'مطعم ومقهى'),
    o('plaza', 'Plaza Katı', 'Full floor', 'طابق كامل'),
    o('showroom', 'Showroom', 'Showroom', 'صالة عرض'),
  ]),
  multi('imar', tx('İmar Durumu', 'Zoning', 'التصنيف'), [
    o('konut', 'Konut', 'Residential', 'سكني'),
    o('ticari', 'Ticari', 'Commercial', 'تجاري'),
    o('karma', 'Karma Kullanım', 'Mixed use', 'استخدام مختلط'),
    o('sanayi', 'Sanayi', 'Industrial', 'صناعي'),
  ]),
  range('m2Brut', tx('m² (Brüt)', 'Size (gross)', 'المساحة الإجمالية'), M2),
  range('m2Net', tx('m² (Net)', 'Size (net)', 'المساحة الصافية'), M2),
  range('m2', tx('m²', 'Plot size', 'مساحة الأرض'), M2),
  multi('oda', tx('Oda Sayısı', 'Bedrooms', 'عدد الغرف'), [
    o('s', 'Stüdyo (1+0)', 'Studio', 'استوديو'),
    o('1', '1+1', '1 bedroom', 'غرفة نوم واحدة'),
    o('2', '2+1', '2 bedrooms', 'غرفتا نوم'),
    o('3', '3+1', '3 bedrooms', '3 غرف نوم'),
    o('4', '4+1', '4 bedrooms', '4 غرف نوم'),
    o('5', '5+1', '5 bedrooms', '5 غرف نوم'),
    o('6', '6+1 ve üzeri', '6+ bedrooms', '6 غرف نوم فأكثر'),
  ]),
  multi('binaYasi', tx('Bina Yaşı', 'Building age', 'عمر المبنى'), [
    o('0', '0 (Yeni)', 'New', 'جديد'),
    o('1-5', '1-5 arası', '1–5 years', '1–5 سنوات'),
    o('6-10', '6-10 arası', '6–10 years', '6–10 سنوات'),
    o('11-20', '11-20 arası', '11–20 years', '11–20 سنة'),
    o('21', '21 ve üzeri', '21+ years', '21 سنة فأكثر'),
  ]),
  multi('kat', tx('Bulunduğu Kat', 'Floor', 'الطابق'), [
    o('zemin', 'Zemin Kat', 'Ground floor', 'الطابق الأرضي'),
    o('bahce', 'Bahçe Katı', 'Garden level', 'طابق الحديقة'),
    o('1-5', '1-5. Kat', 'Floors 1–5', 'الطوابق 1–5'),
    o('6-15', '6-15. Kat', 'Floors 6–15', 'الطوابق 6–15'),
    o('16-30', '16-30. Kat', 'Floors 16–30', 'الطوابق 16–30'),
    o('31', '31. Kat ve üzeri', 'Floor 31+', 'الطابق 31 فأعلى'),
    o('cati', 'Çatı Katı', 'Top floor', 'الطابق الأخير'),
  ]),
  range('katSayisi', tx('Kat Sayısı', 'Floors in building', 'عدد الطوابق'), undefined, true),
  multi('klima', tx('Klima', 'Air conditioning', 'التكييف'), [
    o('merkezi', 'Merkezi', 'Central', 'مركزي'),
    o('split', 'Split', 'Split units', 'سبليت'),
    o('chiller', 'Soğutma dahil (chiller free)', 'Chiller free', 'التبريد مشمول'),
  ]),
  multi('banyo', tx('Banyo Sayısı', 'Bathrooms', 'الحمّامات'), [
    o('1', '1'),
    o('2', '2'),
    o('3', '3'),
    o('4', '4'),
    o('5', '5 ve üzeri', '5+', '5 فأكثر'),
  ]),
  bool('balkon', tx('Balkon', 'Balcony', 'شرفة')),
  bool('asansor', tx('Asansör', 'Elevator', 'مصعد')),
  multi('otopark', tx('Otopark', 'Parking', 'موقف سيارات'), [
    o('acik', 'Açık Otopark', 'Open', 'مكشوف'),
    o('kapali', 'Kapalı Otopark', 'Covered', 'مغطى'),
    o('yok', 'Yok', 'None', 'لا يوجد'),
  ]),
  multi('esya', tx('Eşya Durumu', 'Furnishing', 'الأثاث'), [
    o('esyali', 'Eşyalı', 'Furnished', 'مفروش'),
    o('yari', 'Yarı Eşyalı', 'Semi-furnished', 'مفروش جزئيًا'),
    o('esyasiz', 'Eşyasız', 'Unfurnished', 'غير مفروش'),
  ]),
  multi('kullanim', tx('Kullanım Durumu', 'Occupancy', 'حالة الإشغال'), [
    o('bos', 'Boş', 'Vacant', 'شاغر'),
    o('kiracili', 'Kiracılı', 'Tenanted', 'مؤجر'),
    o('sahibi', 'Mülk Sahibi', 'Owner-occupied', 'يسكنه المالك'),
  ]),
  multi('tamamlanma', tx('Tamamlanma Durumu', 'Completion', 'حالة الإنجاز'), [
    o('hazir', 'Hazır', 'Ready', 'جاهز'),
    o('proje', 'Projeden (Off-plan)', 'Off-plan', 'على الخارطة'),
  ]),
  multi('manzara', tx('Manzara', 'View', 'الإطلالة'), [
    o('deniz', 'Deniz', 'Sea', 'البحر'),
    o('kanal', 'Kanal veya Göl', 'Canal or lake', 'القناة أو البحيرة'),
    o('burj', 'Burj Khalifa', 'Burj Khalifa', 'برج خليفة'),
    o('sehir', 'Şehir', 'City', 'المدينة'),
    o('park', 'Park', 'Park', 'الحديقة'),
  ]),
  bool('siteIci', tx('Site İçerisinde', 'In a gated community', 'داخل مجمع سكني')),
  bool('havuz', tx('Havuz', 'Pool', 'مسبح')),
  bool('krediye', tx('Krediye Uygun', 'Mortgage eligible', 'مؤهل للتمويل العقاري')),
  multi('mulkiyet', tx('Mülkiyet', 'Tenure', 'نوع التملك'), [
    o('freehold', 'Freehold (Tam Mülkiyet)', 'Freehold', 'تملك حر'),
    o('leasehold', 'Leasehold (Uzun Süreli Kira)', 'Leasehold', 'حق انتفاع'),
  ]),
  multi('kimdenEmlak', tx('Kimden', 'Listed by', 'المعلن'), [
    o('sahibinden', 'Sahibinden', 'Owner', 'المالك'),
    o('ofis', 'Emlak Ofisinden', 'Agency', 'مكتب عقاري'),
    o('insaat', 'İnşaat Firmasından', 'Developer', 'المطوّر'),
    o('banka', 'Bankadan', 'Bank', 'البنك'),
  ]),

  /* ---------- Vasıta ---------- */
  multi('marka', tx('Marka', 'Make', 'الماركة'), carBrands),
  multi('motoMarka', tx('Marka', 'Make', 'الماركة'), motoBrands),
  range('yil', tx('Yıl', 'Year', 'السنة'), undefined, true),
  range('km', tx('KM', 'Kilometres', 'الكيلومترات'), KM),
  multi('yakit', tx('Yakıt', 'Fuel', 'الوقود'), [
    o('benzin', 'Benzin', 'Petrol', 'بنزين'),
    o('dizel', 'Dizel', 'Diesel', 'ديزل'),
    o('hibrit', 'Hibrit', 'Hybrid', 'هجين'),
    o('elektrik', 'Elektrik', 'Electric', 'كهربائي'),
  ]),
  multi('vites', tx('Vites', 'Transmission', 'ناقل الحركة'), [
    o('otomatik', 'Otomatik', 'Automatic', 'أوتوماتيك'),
    o('manuel', 'Manuel', 'Manual', 'يدوي'),
    o('yari', 'Yarı Otomatik', 'Semi-automatic', 'نصف أوتوماتيك'),
  ]),
  multi('durum', tx('Araç Durumu', 'Condition', 'الحالة'), [
    o('ikinci', 'İkinci El', 'Used', 'مستعمل'),
    o('sifir', 'Sıfır', 'New', 'جديد'),
  ]),
  multi('spec', tx('Spesifikasyon', 'Regional specs', 'المواصفات'), [
    o('gcc', 'GCC (Körfez)', 'GCC', 'خليجية'),
    o('amerikan', 'Amerikan', 'American', 'أمريكية'),
    o('japon', 'Japon', 'Japanese', 'يابانية'),
    o('avrupa', 'Avrupa', 'European', 'أوروبية'),
  ]),
  multi('kasa', tx('Kasa Tipi', 'Body type', 'نوع الهيكل'), [
    o('sedan', 'Sedan', 'Sedan', 'سيدان'),
    o('hatchback', 'Hatchback', 'Hatchback', 'هاتشباك'),
    o('suv', 'SUV', 'SUV', 'دفع رباعي'),
    o('coupe', 'Coupe', 'Coupé', 'كوبيه'),
    o('cabrio', 'Cabrio', 'Convertible', 'مكشوفة'),
    o('pickup', 'Pick-up', 'Pickup', 'بيك أب'),
    o('van', 'Minivan & Panelvan', 'Van', 'فان'),
  ]),
  multi('motorGucu', tx('Motor Gücü', 'Horsepower', 'قوة المحرك'), [
    o('150', '150 hp’ye kadar', 'Up to 150 hp', 'حتى 150 حصانًا'),
    o('300', '151 - 300 hp', '151–300 hp', '151–300 حصان'),
    o('500', '301 - 500 hp', '301–500 hp', '301–500 حصان'),
    o('501', '501 hp ve üzeri', '501+ hp', '501 حصان فأكثر'),
  ]),
  multi('motorHacmi', tx('Motor Hacmi', 'Engine size', 'سعة المحرك'), [
    o('1600', '1600 cc’ye kadar', 'Up to 1.6 L', 'حتى 1.6 لتر'),
    o('2500', '1601 - 2500 cc', '1.6–2.5 L', '1.6–2.5 لتر'),
    o('4000', '2501 - 4000 cc', '2.5–4.0 L', '2.5–4.0 لتر'),
    o('4001', '4001 cc ve üzeri', 'Over 4.0 L', 'أكثر من 4.0 لتر'),
  ]),
  multi('cekis', tx('Çekiş', 'Drivetrain', 'نظام الدفع'), [
    o('onden', 'Önden Çekiş', 'Front-wheel drive', 'دفع أمامي'),
    o('arkadan', 'Arkadan İtiş', 'Rear-wheel drive', 'دفع خلفي'),
    o('4x4', '4x4', '4WD', 'دفع رباعي'),
    o('awd', 'AWD (Elektronik)', 'AWD', 'دفع كلي'),
  ]),
  multi('renk', tx('Renk', 'Colour', 'اللون'), [
    o('beyaz', 'Beyaz', 'White', 'أبيض'),
    o('siyah', 'Siyah', 'Black', 'أسود'),
    o('gri', 'Gri', 'Grey', 'رمادي'),
    o('gumus', 'Gümüş', 'Silver', 'فضي'),
    o('mavi', 'Mavi', 'Blue', 'أزرق'),
    o('kirmizi', 'Kırmızı', 'Red', 'أحمر'),
    o('bej', 'Bej', 'Beige', 'بيج'),
    o('yesil', 'Yeşil', 'Green', 'أخضر'),
  ]),
  bool('garanti', tx('Garanti', 'Warranty', 'ضمان')),
  bool('agirHasar', tx('Ağır Hasar Kayıtlı', 'Major accident record', 'سجل حادث كبير')),
  multi('kayit', tx('Kayıt Yeri', 'Registered in', 'مكان التسجيل'), [
    o('dubai', 'Dubai', 'Dubai', 'دبي'),
    o('abudhabi', 'Abu Dabi', 'Abu Dhabi', 'أبوظبي'),
    o('sharjah', 'Şarika', 'Sharjah', 'الشارقة'),
    o('diger', 'Diğer Emirlikler', 'Other emirates', 'إمارات أخرى'),
    o('ihracat', 'İhracata Uygun', 'Export only', 'للتصدير'),
  ]),
  multi('motoTipi', tx('Motosiklet Tipi', 'Motorcycle type', 'نوع الدراجة'), [
    o('naked', 'Naked', 'Naked', 'نيكد'),
    o('sport', 'Sport', 'Sport', 'رياضية'),
    o('touring', 'Touring', 'Touring', 'سياحية'),
    o('cruiser', 'Chopper & Cruiser', 'Cruiser', 'كروزر'),
    o('enduro', 'Enduro & Adventure', 'Adventure', 'مغامرات'),
  ]),
  multi('tekneTipi', tx('Tekne Tipi', 'Boat type', 'نوع القارب'), [
    o('motoryat', 'Motoryat', 'Motor yacht', 'يخت بمحرك'),
    o('yelkenli', 'Yelkenli', 'Sailboat', 'قارب شراعي'),
    o('surat', 'Sürat Teknesi', 'Speedboat', 'قارب سريع'),
    o('jetski', 'Jet Ski', 'Jet ski', 'جت سكي'),
  ]),
  range('uzunluk', tx('Boy', 'Length', 'الطول'), METRE),
  multi('kimdenVasita', tx('Kimden', 'Seller', 'البائع'), [
    o('sahibinden', 'Sahibinden', 'Owner', 'المالك'),
    o('galeri', 'Galeriden', 'Dealer', 'معرض سيارات'),
    o('yetkili', 'Yetkili Bayiden', 'Authorised dealer', 'وكيل معتمد'),
  ]),

  /* ---------- Alışveriş, hizmet, iş ---------- */
  multi('urunDurumu', tx('Durumu', 'Condition', 'الحالة'), [
    o('sifir', 'Sıfır', 'New', 'جديد'),
    o('ikinci', 'İkinci El', 'Used', 'مستعمل'),
    o('yenilenmis', 'Yenilenmiş', 'Refurbished', 'مجدد'),
  ]),
  multi('kimdenAlisveris', tx('Kimden', 'Seller', 'البائع'), [
    o('sahibinden', 'Sahibinden', 'Private seller', 'بائع فردي'),
    o('magaza', 'Mağazadan', 'Store', 'متجر'),
  ]),
  multi('kimdenFirma', tx('Kimden', 'Provided by', 'مقدم الخدمة'), [
    o('bireysel', 'Bireysel', 'Individual', 'فرد'),
    o('firma', 'Firma', 'Company', 'شركة'),
  ]),
  multi('dersYeri', tx('Ders Yeri', 'Lesson location', 'مكان الدرس'), [
    o('ogrenci', 'Öğrencinin Evinde', 'At student’s home', 'في منزل الطالب'),
    o('egitmen', 'Eğitmenin Yerinde', 'At tutor’s place', 'لدى المعلم'),
    o('online', 'Online', 'Online', 'عبر الإنترنت'),
  ]),
  multi('calisma', tx('Çalışma Şekli', 'Job type', 'نوع الدوام'), [
    o('tam', 'Tam Zamanlı', 'Full-time', 'دوام كامل'),
    o('yari', 'Yarı Zamanlı', 'Part-time', 'دوام جزئي'),
    o('donemsel', 'Dönemsel', 'Contract', 'عقد مؤقت'),
    o('staj', 'Stajyer', 'Internship', 'تدريب'),
  ]),
  multi('deneyim', tx('Deneyim', 'Experience', 'الخبرة'), [
    o('0', 'Deneyimsiz', 'No experience', 'بدون خبرة'),
    o('1-3', '1-3 Yıl', '1–3 years', '1–3 سنوات'),
    o('3-5', '3-5 Yıl', '3–5 years', '3–5 سنوات'),
    o('5', '5 Yıl ve Üzeri', '5+ years', '5 سنوات فأكثر'),
  ]),
  bool('vize', tx('Vize Sağlanır', 'Visa provided', 'التأشيرة مقدمة')),
  bool('takas', tx('Takaslı', 'Open to swap', 'قابل للمبادلة')),
];

export const fields: Record<string, Field> = Object.fromEntries(
  library.map((field) => [field.id, field]),
);

/** Kategori setleri: panelde gösterilecek alanlar ve sonuç tablosu sütunları. */
export const filterSets = {
  konut: {
    fields: [
      'ilanTipi',
      'konutTipi',
      'm2Brut',
      'm2Net',
      'oda',
      'binaYasi',
      'kat',
      'katSayisi',
      'klima',
      'banyo',
      'balkon',
      'asansor',
      'otopark',
      'esya',
      'kullanim',
      'tamamlanma',
      'manzara',
      'siteIci',
      'havuz',
      'krediye',
      'mulkiyet',
      'kimdenEmlak',
      'takas',
    ],
    columns: ['m2Brut', 'oda'],
  },
  isyeri: {
    fields: ['ilanTipi', 'isyeriTipi', 'm2Brut', 'kat', 'otopark', 'mulkiyet', 'kimdenEmlak', 'takas'],
    columns: ['m2Brut'],
  },
  arsa: {
    fields: ['ilanTipi', 'imar', 'm2', 'mulkiyet', 'krediye', 'kimdenEmlak', 'takas'],
    columns: ['m2'],
  },
  emlak: {
    fields: ['ilanTipi', 'm2Brut', 'mulkiyet', 'kimdenEmlak', 'takas'],
    columns: ['m2Brut'],
  },
  otomobil: {
    fields: [
      'marka',
      'yil',
      'yakit',
      'vites',
      'durum',
      'spec',
      'km',
      'kasa',
      'motorGucu',
      'motorHacmi',
      'cekis',
      'renk',
      'garanti',
      'agirHasar',
      'kayit',
      'kimdenVasita',
      'takas',
    ],
    columns: ['yil', 'km', 'renk'],
  },
  vasita: {
    fields: ['marka', 'yil', 'km', 'yakit', 'vites', 'durum', 'renk', 'kimdenVasita', 'takas'],
    columns: ['yil', 'km'],
  },
  motosiklet: {
    fields: ['motoMarka', 'motoTipi', 'yil', 'km', 'durum', 'renk', 'kimdenVasita', 'takas'],
    columns: ['yil', 'km'],
  },
  deniz: {
    fields: ['tekneTipi', 'yil', 'uzunluk', 'durum', 'kimdenVasita', 'takas'],
    columns: ['yil', 'uzunluk'],
  },
  plaka: {
    fields: ['kayit', 'kimdenVasita'],
    columns: [],
  },
  alisveris: {
    fields: ['urunDurumu', 'garanti', 'kimdenAlisveris', 'takas'],
    columns: ['urunDurumu'],
  },
  makine: {
    fields: ['yil', 'durum', 'kimdenFirma', 'takas'],
    columns: ['yil'],
  },
  hizmet: {
    fields: ['kimdenFirma'],
    columns: [],
  },
  ders: {
    fields: ['dersYeri', 'kimdenFirma'],
    columns: ['dersYeri'],
  },
  is: {
    fields: ['calisma', 'deneyim', 'vize', 'kimdenFirma'],
    columns: ['calisma'],
  },
} as const satisfies Record<string, { fields: readonly string[]; columns: readonly string[] }>;

export type FilterSetId = keyof typeof filterSets;

export const setFields = (id: FilterSetId) => filterSets[id].fields.map((key) => fields[key]!);
export const setColumns = (id: FilterSetId) => filterSets[id].columns.map((key) => fields[key]!);

/** Bir seçeneğin etiketi; örnek ilan başlıkları da buradan beslenir. */
export function optionLabel(fieldId: string, optionId: string): Text {
  const field = fields[fieldId];
  if (field?.kind !== 'multi') throw new Error(`Seçenekli alan değil: ${fieldId}`);
  const option = field.options.find((item) => item.id === optionId);
  if (!option) throw new Error(`Seçenek yok: ${fieldId}.${optionId}`);
  return option.label;
}
