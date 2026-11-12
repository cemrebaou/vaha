# Mimari kararlar

## Hedef

Sahibinden / Hürriyet Emlak tarzı, Dubai'ye yönelik, çok dilli bir ilan sitesi. Öncelik sırası: **hız, sadelik, bulunabilirlik**. Bu aşamada yalnızca arayüz temeli atıldı; içerik örnek.

Varsayım: site emlak öncelikli ama vasıta ve diğer kategorilere açık bir ilan pazarı. Kategori ağacı tek dosyadan yönetildiği için yalnızca emlağa indirmek ya da genişletmek kolay.

## Neden Astro, neden statik

- Sayfalar derleme anında düz HTML'e dönüşür. Ziyaretçiye çerçeve (React vb.) gönderilmez.
- Tarayıcıya giden betik toplamı yaklaşık 3 KB: bağlantı ön yükleme ve favori/dil tercihi.
- Menüler, açılır pencereler, filtre grupları ve mobil menü tarayıcının kendi özellikleriyle (`popover`, `details`, `:target`) çalışır; betik gerekmez.
- Statik çıktı her yerde barınır (GitHub Pages, Vercel, Cloudflare) ve CDN'den saniyenin altında açılır.
- İleride dinamik sayfalar gerektiğinde aynı proje sunucu tarafı çalışmaya (`output: 'server'`) geçirilebilir; bileşenler değişmez.

## Hız için alınan önlemler

| Önlem | Nerede |
| --- | --- |
| Yazı tipi siteyle birlikte sunulur, dış sunucuya istek yok | `src/styles/global.css` |
| Tek yazı ailesi (Latin + Arapça), değişken dosya, yalnızca gereken alfabe iner | Readex Pro |
| İkonlar derlemede HTML'e gömülür, istek üretmez | `src/components/ui/Icon.astro` |
| Bağlantının üzerine gelince sayfa önceden yüklenir | `astro.config.ts` → `prefetch` |
| Sayfalar arası geçiş animasyonu tarayıcıya bırakıldı | `src/styles/base.css` → `@view-transition` |
| Fotoğraf alanlarının oranı sabit, sayfa zıplamaz | `PhotoPlaceholder.astro` |

Bütçe: sayfa başına HTML + CSS + JS sıkıştırılmış halde 40 KB'ın altında kalmalı (fotoğraflar hariç).

## Çok dillilik

- Her dilin kendi adresi var: `/tr/`, `/en/`, `/ar/`. Arama motorları için `hreflang` ve site haritası otomatik üretilir.
- Metinler `src/i18n/locales/` altında. Türkçe sözlük şablondur; diğer diller aynı şekle uymak zorundadır, eksik anahtar derlemeyi durdurur.
- Arapça sağdan sola çalışır. Stiller yön bağımsız yazıldı (`margin-inline`, `inset-inline` vb.), bu yüzden ayrı bir RTL stil dosyası yok.
- Fiyat, sayı ve tarih biçimleri dile göre `src/lib/format.ts` içinden gelir.
- Kök adres (`/`) ziyaretçiyi son seçtiği dile, yoksa varsayılan dile yönlendirir.

## Düzen ve arama

- Düzen sahibinden.com'un alışılmış yapısını izler: üstte arama çubuğu ve Detaylı Arama, solda sayılarıyla kategori ağacı, ortada Anasayfa Vitrini.
- Kategori ağacı (10 ana, 70+ alt kategori) `src/config/categories.ts` içinde. Her alt kategori bir kriter setine bağlıdır.
- Kriterler (`src/config/filters.ts`) tek kaynaktır: filtre paneli, sonuç tablosu sütunları ve ilan detayındaki bilgi tablosu aynı tanımdan üretilir.
- Dubai'ye uyarlananlar: adres yerine Dubai bölgeleri, fiyat AED, yıllık kira, GCC/Amerikan spesifikasyon, kayıt yeri (emirlik), freehold/leasehold, off-plan, soğutma dahil (chiller free), iş ilanlarında vize.
- Sonuç sayfalarında filtreleme ve sıralama tarayıcıda yapılır (`src/scripts/results.ts`, yaklaşık 2 KB); seçimler adres çubuğuna yazılır, bağlantı paylaşılabilir. Sunucu geldiğinde aynı form sunucuya sorgu gönderecek.

## Veri katmanı

Sayfalar ilanlara yalnızca `src/lib/listings.ts` üzerinden ulaşır. Şu an örnek veriyi döndürür. Gerçek API geldiğinde yalnızca bu dosya değişir.

Adresler `src/config/routes.ts` içinde toplanmıştır; bileşenler adres yazmaz, oradan ister.

## Sunucu tarafı için öneri (henüz yapılmadı)

| İhtiyaç | Öneri |
| --- | --- |
| İlan ve üye verisi | PostgreSQL (konum sorguları için PostGIS) |
| Arama ve filtreleme | Ayrı arama motoru (Meilisearch ya da Typesense); Arapça ve yazım hatası desteği |
| Fotoğraflar | Nesne depolama + görsel CDN (otomatik boyutlandırma, AVIF/WebP) |
| Üyelik | E-posta/telefon doğrulama; Dubai için UAE Pass seçeneği |
| Emlak ilanları | Dubai'de emlak ilanı için resmî izin numarası gerekir; ilan detayında alanı hazır |

Bu seçimler kesin değil; ürün kararları netleşince birlikte gözden geçirilmeli.

## Bilinen sınırlar

- Filtreler yalnızca sayfadaki örnek ilanlar üzerinde çalışır; sunucu araması henüz yok.
- İlanlar, satıcı bilgileri ve sayılar örnektir.
- Arapça çeviri taslaktır.
