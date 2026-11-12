# Tasarım sistemi

Tüm değerler `src/styles/tokens.css` içindedir. Bileşenler renk ya da ölçü yazmaz, token kullanır; bu yüzden tema tek dosyadan değişir.

## Fikir

Renkler BAE bayrağından gelir ve beyaz zemin ağırlıklı kullanılır:

| Token | Değer | Görev |
| --- | --- | --- |
| `--c-bg` | `#ffffff` | Sayfa zemini (bayrağın beyazı) |
| `--flag-green` | `#00732f` | Marka: bağlantılar, seçili durumlar, birincil düğme |
| `--flag-red` | `#e0242c` | Yalnızca "Ücretsiz İlan Ver" ve "Acil" |
| `--flag-black` | `#1b1d1c` | Metin |
| `--c-surface` | `#f6f8f7` | Zebra satırlar, kutu zemini |
| `--c-line` | `#e4e8e5` | Çizgi ve kenarlık |

Sayfanın en üstünde ve en altında ince bir bayrak şeridi (kırmızı, yeşil, beyaz, siyah) durur. Logo da aynı dört rengi taşır.

Site bilinçli olarak her zaman açık temadadır. Koyu tema ileride ayrı bir paletle eklenecek.

Kural: kırmızı yalnızca ilan verme ve acil ilanlar için kullanılır. Böylece sayfadaki en önemli düğme her zaman tek bakışta bulunur.

## Yazı

Tek aile: **Readex Pro**. Latin ve Arap alfabesini aynı çizgiyle taşır; dil değişince sitenin karakteri değişmez.

| Rol | Boyut | Kalınlık |
| --- | --- | --- |
| Ana başlık | 34–64 px (ekrana göre) | 300 |
| Bölüm başlığı | 24–34 px | 400 |
| Kart başlığı | 18 px | 500 |
| Metin | 16 px | 400 |
| Küçük metin | 14 / 13 px | 400 |

Fiyat ve ölçülerde rakamlar eşit genişliktedir (`tabular-nums`), listelerde hizalı durur.

## Köşe ve gölge

Köşe yarıçapı role göre değişir: denetimler 12, kartlar 16, arama kutusu ve büyük paneller 24 px. Gölge yalnızca öne çıkması gereken iki yerde var: arama kutusu ve üzerine gelinen ilan kartı.

## Bulunabilirlik ilkeleri

1. **Ana sayfada tek iş: aramak.** Arama kutusu ilk ekranda; ayrıntılı filtreler "Detaylı arama"ya basınca açılır.
2. **Üst menüde en fazla üç bağlantı.** Geri kalan kategoriler "Tüm kategoriler"de, dokununca açılan gruplar halinde.
3. **Telefonda başparmak menüsü.** Ana sayfa, Ara, İlan ver, Favoriler, Hesabım her zaman altta.
4. **Dil ve para birimi tek düğmede.** Sayfada yer kaplamaz, basınca açılır.
5. **Her şey açtıkça açılır.** Filtre grupları, kategori alt başlıkları ve mobil menü kapalı gelir.
6. **Boş durumlar yön gösterir.** İlan yoksa ne yapılacağı yazar.

## Erişilebilirlik

- Klavye odağı her öğede görünür.
- Metin kontrastı WCAG AA düzeyini hedefler.
- "Hareketi azalt" ayarına uyulur.
- Dokunma hedefleri en az 40 px.
