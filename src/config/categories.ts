import type { IconName } from '@/components/ui/icons';
import type { FilterSetId } from './filters';
import { tx, type Text } from '@/i18n/text';

export interface SubCategory {
  id: string;
  name: Text;
  /** Bu alt kategoride kullanılacak arama kriterleri seti. */
  set: FilterSetId;
}

export interface CategoryGroup {
  id: string;
  name: Text;
  icon: IconName;
  /** Ana sayfada açık görünen alt kategori sayısı; gerisi "Tümünü Göster" ile açılır. */
  visible: number;
  subs: SubCategory[];
}

const sub = (id: string, set: FilterSetId, tr: string, en: string, ar: string): SubCategory => ({
  id,
  set,
  name: tx(tr, en, ar),
});

/** Kategori ağacı. Sıra, ana sayfadaki sıradır. */
export const groups: CategoryGroup[] = [
  {
    id: 'emlak',
    name: tx('Emlak', 'Real Estate', 'عقارات'),
    icon: 'house',
    visible: 7,
    subs: [
      sub('konut', 'konut', 'Konut', 'Residential', 'سكني'),
      sub('is-yeri', 'isyeri', 'İş Yeri', 'Commercial', 'تجاري'),
      sub('arsa', 'arsa', 'Arsa', 'Land', 'أراضٍ'),
      sub('konut-projeleri', 'emlak', 'Konut Projeleri', 'New Projects', 'مشاريع جديدة'),
      sub('bina', 'emlak', 'Bina', 'Whole Buildings', 'مبانٍ كاملة'),
      sub('devre-mulk', 'emlak', 'Devre Mülk', 'Timeshare', 'تملك بالمشاركة الزمنية'),
      sub('turistik-tesis', 'emlak', 'Turistik Tesis', 'Hotels & Resorts', 'منشآت سياحية'),
    ],
  },
  {
    id: 'vasita',
    name: tx('Vasıta', 'Motors', 'مركبات'),
    icon: 'car',
    visible: 9,
    subs: [
      sub('otomobil', 'otomobil', 'Otomobil', 'Cars', 'سيارات'),
      sub('arazi-suv-pickup', 'otomobil', 'Arazi, SUV & Pickup', '4x4, SUV & Pickup', 'دفع رباعي وبيك أب'),
      sub('elektrikli-araclar', 'otomobil', 'Elektrikli Araçlar', 'Electric Vehicles', 'سيارات كهربائية'),
      sub('motosiklet', 'motosiklet', 'Motosiklet', 'Motorcycles', 'دراجات نارية'),
      sub('minivan-panelvan', 'vasita', 'Minivan & Panelvan', 'Vans', 'فانات'),
      sub('ticari-araclar', 'vasita', 'Ticari Araçlar', 'Commercial Vehicles', 'مركبات تجارية'),
      sub('kiralik-araclar', 'vasita', 'Kiralık Araçlar', 'Car Rental', 'سيارات للإيجار'),
      sub('deniz-araclari', 'deniz', 'Deniz Araçları', 'Boats', 'قوارب'),
      sub('hasarli-araclar', 'vasita', 'Hasarlı Araçlar', 'Damaged Vehicles', 'مركبات متضررة'),
      sub('karavan', 'vasita', 'Karavan', 'Caravans', 'كرفانات'),
      sub('klasik-araclar', 'vasita', 'Klasik Araçlar', 'Classic Cars', 'سيارات كلاسيكية'),
      sub('atv-utv', 'vasita', 'ATV & UTV', 'ATV & UTV', 'دراجات رباعية'),
      sub('ozel-plaka', 'plaka', 'Özel Plaka', 'Number Plates', 'لوحات مميزة'),
    ],
  },
  {
    id: 'yedek-parca',
    name: tx('Yedek Parça, Aksesuar & Tuning', 'Parts & Accessories', 'قطع غيار وإكسسوارات'),
    icon: 'wrench',
    visible: 3,
    subs: [
      sub('otomotiv-ekipmanlari', 'alisveris', 'Otomotiv Ekipmanları', 'Car Parts', 'قطع غيار السيارات'),
      sub(
        'motosiklet-ekipmanlari',
        'alisveris',
        'Motosiklet Ekipmanları',
        'Motorcycle Parts',
        'قطع غيار الدراجات النارية',
      ),
      sub('deniz-araci-ekipmanlari', 'alisveris', 'Deniz Aracı Ekipmanları', 'Marine Parts', 'معدات بحرية'),
    ],
  },
  {
    id: 'alisveris',
    name: tx('İkinci El ve Sıfır Alışveriş', 'Classifieds', 'البيع والشراء'),
    icon: 'shopping-bag',
    visible: 9,
    subs: [
      sub('bilgisayar', 'alisveris', 'Bilgisayar', 'Computers', 'حواسيب'),
      sub('cep-telefonu', 'alisveris', 'Cep Telefonu & Aksesuar', 'Mobile Phones', 'هواتف محمولة'),
      sub('fotograf-kamera', 'alisveris', 'Fotoğraf & Kamera', 'Cameras', 'كاميرات'),
      sub('ev-dekorasyonu', 'alisveris', 'Ev Dekorasyonu', 'Home & Furniture', 'أثاث وديكور'),
      sub('ev-elektronigi', 'alisveris', 'Ev Elektroniği', 'TV & Audio', 'تلفزيونات وصوتيات'),
      sub('elektrikli-ev-aletleri', 'alisveris', 'Elektrikli Ev Aletleri', 'Home Appliances', 'أجهزة منزلية'),
      sub('giyim-aksesuar', 'alisveris', 'Giyim & Aksesuar', 'Clothing & Accessories', 'ملابس وإكسسوارات'),
      sub('saat', 'alisveris', 'Saat', 'Watches', 'ساعات'),
      sub('anne-bebek', 'alisveris', 'Anne & Bebek', 'Baby & Kids', 'مستلزمات الأطفال'),
      sub('kisisel-bakim', 'alisveris', 'Kişisel Bakım & Kozmetik', 'Health & Beauty', 'الصحة والجمال'),
      sub('oyun-konsol', 'alisveris', 'Video Oyun & Konsol', 'Gaming', 'ألعاب الفيديو'),
      sub('hobi-oyuncak', 'alisveris', 'Hobi & Oyuncak', 'Toys & Hobbies', 'ألعاب وهوايات'),
      sub('kitap-dergi-film', 'alisveris', 'Kitap, Dergi & Film', 'Books & Media', 'كتب ووسائط'),
      sub('muzik', 'alisveris', 'Müzik', 'Musical Instruments', 'آلات موسيقية'),
      sub('spor', 'alisveris', 'Spor', 'Sports Equipment', 'معدات رياضية'),
      sub('taki-mucevher', 'alisveris', 'Takı & Mücevher', 'Jewellery', 'مجوهرات'),
      sub('koleksiyon', 'alisveris', 'Koleksiyon', 'Collectibles', 'مقتنيات'),
      sub('bahce-yapi-market', 'alisveris', 'Bahçe & Yapı Market', 'Garden & DIY', 'الحديقة والأدوات'),
      sub('ofis-kirtasiye', 'alisveris', 'Ofis & Kırtasiye', 'Office Supplies', 'مستلزمات مكتبية'),
      sub('diger', 'alisveris', 'Diğer Her Şey', 'Everything Else', 'أخرى'),
    ],
  },
  {
    id: 'is-makineleri',
    name: tx('İş Makineleri & Sanayi', 'Machinery & Industry', 'معدات وصناعة'),
    icon: 'tractor',
    visible: 4,
    subs: [
      sub('agir-makine', 'makine', 'İş Makineleri', 'Heavy Equipment', 'معدات ثقيلة'),
      sub('tarim', 'makine', 'Tarım Makineleri', 'Farm Equipment', 'معدات زراعية'),
      sub('sanayi', 'makine', 'Sanayi', 'Industrial', 'صناعي'),
      sub('elektrik-enerji', 'makine', 'Elektrik & Enerji', 'Power & Energy', 'الكهرباء والطاقة'),
    ],
  },
  {
    id: 'ustalar-hizmetler',
    name: tx('Ustalar ve Hizmetler', 'Services', 'خدمات'),
    icon: 'hammer',
    visible: 6,
    subs: [
      sub('ev-tadilat', 'hizmet', 'Ev Tadilat & Dekorasyon', 'Renovation', 'تجديد المنازل'),
      sub('nakliye', 'hizmet', 'Nakliye', 'Movers', 'نقل الأثاث'),
      sub('klima-teknik', 'hizmet', 'Klima & Teknik Servis', 'AC & Technical', 'تكييف وصيانة فنية'),
      sub('temizlik', 'hizmet', 'Temizlik', 'Cleaning', 'تنظيف'),
      sub('arac-servis', 'hizmet', 'Araç Servis & Bakım', 'Car Services', 'خدمات السيارات'),
      sub('etkinlik', 'hizmet', 'Düğün & Etkinlik', 'Events', 'مناسبات وفعاليات'),
    ],
  },
  {
    id: 'ozel-ders',
    name: tx('Özel Ders Verenler', 'Tutors & Classes', 'دروس خصوصية'),
    icon: 'graduation-cap',
    visible: 6,
    subs: [
      sub('lise-universite', 'ders', 'Lise & Üniversite', 'High School & University', 'ثانوي وجامعي'),
      sub('ilkokul-ortaokul', 'ders', 'İlkokul & Ortaokul', 'Primary & Middle School', 'ابتدائي ومتوسط'),
      sub('yabanci-dil', 'ders', 'Yabancı Dil', 'Languages', 'لغات'),
      sub('bilgisayar-dersi', 'ders', 'Bilgisayar', 'Computer Skills', 'حاسوب'),
      sub('muzik-dersi', 'ders', 'Müzik & Enstrüman', 'Music', 'موسيقى'),
      sub('spor-dersi', 'ders', 'Spor', 'Sports Coaching', 'تدريب رياضي'),
    ],
  },
  {
    id: 'is-ilanlari',
    name: tx('İş İlanları', 'Jobs', 'وظائف'),
    icon: 'briefcase',
    visible: 8,
    subs: [
      sub('satis-pazarlama', 'is', 'Satış & Pazarlama', 'Sales & Marketing', 'مبيعات وتسويق'),
      sub('turizm-otel', 'is', 'Turizm & Otelcilik', 'Hospitality', 'ضيافة وفنادق'),
      sub('yeme-icme', 'is', 'Yeme & İçme', 'Food & Beverage', 'مطاعم ومقاهٍ'),
      sub('lojistik', 'is', 'Lojistik & Ulaşım', 'Logistics & Driving', 'لوجستيات ونقل'),
      sub('finans-muhasebe', 'is', 'Finans & Muhasebe', 'Finance & Accounting', 'مالية ومحاسبة'),
      sub('bilisim', 'is', 'Bilişim', 'IT & Software', 'تقنية المعلومات'),
      sub('saglik', 'is', 'Sağlık', 'Healthcare', 'رعاية صحية'),
      sub('insaat', 'is', 'İnşaat', 'Construction', 'إنشاءات'),
    ],
  },
  {
    id: 'yardimci-arayanlar',
    name: tx('Yardımcı Arayanlar', 'Domestic Help', 'مساعدة منزلية'),
    icon: 'hand-heart',
    visible: 4,
    subs: [
      sub('bebek-cocuk', 'hizmet', 'Bebek & Çocuk Bakıcısı', 'Nannies', 'مربيات أطفال'),
      sub('yasli-hasta', 'hizmet', 'Yaşlı & Hasta Bakıcısı', 'Elderly Care', 'رعاية كبار السن'),
      sub('ev-isleri', 'hizmet', 'Temizlikçi & Ev İşleri', 'Housekeepers', 'مدبرات منزل'),
      sub('sofor', 'hizmet', 'Özel Şoför', 'Private Drivers', 'سائقون خاصون'),
    ],
  },
  {
    id: 'hayvanlar-alemi',
    name: tx('Hayvanlar Alemi', 'Pets', 'حيوانات أليفة'),
    icon: 'paw-print',
    visible: 5,
    subs: [
      sub('kedi', 'hizmet', 'Kedi', 'Cats', 'قطط'),
      sub('kopek', 'hizmet', 'Köpek', 'Dogs', 'كلاب'),
      sub('kus', 'hizmet', 'Kuş', 'Birds', 'طيور'),
      sub('akvaryum', 'hizmet', 'Akvaryum Balıkları', 'Fish & Aquariums', 'أسماك وأحواض'),
      sub('evcil-urunler', 'alisveris', 'Evcil Hayvan Ürünleri', 'Pet Supplies', 'مستلزمات الحيوانات'),
    ],
  },
];

export const getGroup = (id: string) => {
  const group = groups.find((item) => item.id === id);
  if (!group) throw new Error(`Kategori yok: ${id}`);
  return group;
};

export const getSub = (groupId: string, subId: string) => {
  const found = getGroup(groupId).subs.find((item) => item.id === subId);
  if (!found) throw new Error(`Alt kategori yok: ${groupId}/${subId}`);
  return found;
};
