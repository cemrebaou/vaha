# Tasarım sistemi

Tüm değerler `src/styles/tokens.css` içindedir. Bileşenler renk ya da ölçü yazmaz, token kullanır; bu yüzden tema tek dosyadan değişir.

## Fikir

Dubai bir inci avcılığı kasabasından büyüdü. Palet oradan gelir: inci beyazı zemin, körfezin lagün yeşili, gece denizinin koyu mürekkebi ve tek bir sıcak vurgu olarak safran.

Sitenin tek gösterişli öğesi **meşrebiye kafesi**: geleneksel Körfez evlerinde ışığı süzen sekiz köşeli yıldız örgüsü. Ana sayfanın köşesinde, ilan ver çağrısında ve fotoğraf yer tutucularında tekrar eder. Geri kalan her şey bilerek sakindir.

## Renk

| Token | Açık tema | Görev |
| --- | --- | --- |
| `--c-bg` | `#ffffff` | Sayfa zemini |
| `--c-surface` | `#f5f9fa` | Bölüm ve kutu zemini |
| `--c-ink` | `#1e3a46` | Ana metin |
| `--c-ink-2` | `#557079` | İkincil metin |
| `--c-brand` | `#167a80` | Marka: bağlantı, birincil düğme |
| `--c-accent` | `#f6c453` | Yalnızca "İlan ver" eylemi |
| `--c-line` | `#e3ecee` | Çizgi ve kenarlık |

Site bilinçli olarak her zaman açık temadadır (beyaz ağırlıklı, ferah). Cihaz karanlık modda olsa da aynı görünür.

Kural: safran yalnızca ilan verme eylemlerinde kullanılır. Böylece sayfadaki en önemli düğme her zaman tek bakışta bulunur.

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
