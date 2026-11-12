# Vaha

Dubai için çok dilli ilan pazarı (emlak, vasıta, ikinci el). Bu depo sitenin **arayüz temelidir**: tasarım sistemi, sayfa iskeletleri ve dil altyapısı hazır; gerçek veri ve üyelik henüz bağlı değil.

> "Vaha" geçici çalışma adıdır. Değiştirmek için `src/config/site.ts` ve `src/i18n/locales/*.ts` içindeki `site` bölümü yeterli.

## Kurulum

```bash
npm install     # bir kez
npm run dev     # geliştirme: http://localhost:4321
npm run build   # yayın çıktısı: dist/
npm run check   # tip denetimi
```

Gereken: Node.js 22.23 veya üstü.

## Klasör yapısı

```
src/
├─ config/        Site ayarları: kategori ağacı, arama kriterleri, bölgeler, adresler
├─ i18n/          Dil altyapısı
│  └─ locales/    Her dil için bir sözlük (tr, en, ar)
├─ styles/        Tasarım tokenları ve ortak stiller
├─ layouts/       Sayfa iskeleti (head, üst menü, alt bilgi)
├─ components/
│  ├─ ui/         İkon, logo gibi küçük parçalar
│  ├─ layout/     Üst menü, alt bilgi, mobil alt menü
│  ├─ search/     Filtre paneli, kategori ağacı, sonuç listesi, kategori seçici
│  ├─ listing/    Vitrin karesi, fotoğraf yer tutucusu
│  └─ home/       Ana sayfa: sol kategori menüsü, hizmet bağlantıları
├─ data/          Örnek ilanlar (gerçek veri gelince silinir)
├─ lib/           Yardımcılar: adres, biçimlendirme, ilan veri katmanı
├─ scripts/       Tarayıcıdaki küçük betikler: favoriler/dil tercihi, sonuç filtreleme
└─ pages/         Adresler. [locale] klasörü her dil için sayfa üretir
docs/             Mimari ve tasarım kararları
```

## Sık yapılan işler

| İş | Nerede |
| --- | --- |
| Yeni dil eklemek | `src/i18n/config.ts`, `src/i18n/text.ts` (tx fonksiyonu), `src/i18n/locales/` altına sözlük |
| Açılış dilini değiştirmek | `src/i18n/config.ts` → `defaultLocale` |
| Arayüz metni değiştirmek | `src/i18n/locales/tr.ts` (diğer dillerde aynı anahtar) |
| Kategori eklemek | `src/config/categories.ts` (adı üç dilde, kriter seti) |
| Arama kriteri eklemek | `src/config/filters.ts` (alanı tanımla, ilgili sete ekle) |
| Renk ya da yazı değiştirmek | `src/styles/tokens.css` |
| Yeni sayfa | `src/pages/[locale]/` altına dosya, adresi `src/config/routes.ts` içine |
| Gerçek veriyi bağlamak | Yalnızca `src/lib/listings.ts` |

Eksik çeviri derlemeyi durdurur: bir dile metin eklenip diğerinde unutulursa `npm run check` hata verir.

## Yayınlama

`.github/workflows/deploy.yml` hazır. Depoda **Settings → Pages → Source: GitHub Actions** seçildiğinde `main` dalına her gönderimde site derlenip GitHub Pages'te yayınlanır. Adres ve alt klasör otomatik ayarlanır.

Başka bir sunucu için: `SITE_URL=https://alanadi.com npm run build` çıktısını (`dist/`) herhangi bir statik barındırmaya yüklemek yeterli.

## Sırada ne var

1. Marka adı, alan adı ve logo kararı
2. Gerçek ilan verisi için sunucu (API) ve veritabanı
3. Üyelik, ilan verme akışı, mesajlaşma
4. Arapça metinlerin ana dili Arapça olan biri tarafından gözden geçirilmesi

Ayrıntılar: [docs/MIMARI.md](docs/MIMARI.md), [docs/TASARIM.md](docs/TASARIM.md)
