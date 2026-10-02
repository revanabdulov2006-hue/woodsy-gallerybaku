# Woodsy Gallery Baku — Analiz və Görüşlər

Tarix: 2026-10-02 · Mənbə: Instagram `@woodsy_gallerybaku`

## 1. Səhifə haqqında faktlar (yoxlanılmış)

| Məlumat | Dəyər |
|---|---|
| Profil adı (bio) | **Şahmat • Nərd • Masa • Dekor • Saat** |
| İzləyici | ~10K |
| İzlədiyi | 15 |
| Post sayı | 467 |
| Profil URL | https://www.instagram.com/woodsy_gallerybaku/ |

Nəticə: kiçik, lakin sadiq auditoriyası olan, böyük kataloqlu (467 post) premium taxta məhsulları brendi. İzlədiyi sayının 15 olması brendin "özünü ciddi göstərən" mağaza kimi qurulduğunu göstərir.

## 2. Məhsul kateqoriyaları (bio-dan)

1. **Şahmat** — taxta şahmat dəstləri / taxtaları
2. **Nərd** — əl işi nərd dəstləri
3. **Masa** — taxta masalar (jurnal masası, epoksid və s. ola bilər — təsdiq lazımdır)
4. **Dekor** — divar / interyer dekorları
5. **Saat** — taxta divar saatları

## 3. Şəkil URL-ləri — VACİB MƏHDUDİYYƏT

Instagram post şəkillərini giriş (login) olmadan vermir. Sınadığım yollar:

- Profil səhifəsi (brauzer UA) → yalnız JS qabığı, post datası yoxdur
- Crawler UA (facebookexternalhit) → yalnız profil şəkli və meta
- `/embed/` endpoint → postsuz boş qabıq
- Daxili API (`web_profile_info`) → **429** (rate-limit/blok)
- Üçüncü tərəf görüntüləyicilər (imginn, picuki) → 403 / 404

**Əldə olunan yeganə şəkil:**
- Profil şəkli (100×100): `assets/profile-100.jpg`
  Mənbə: `https://scontent.cdninstagram.com/v/t51.75761-19/510323505_17988771137819445_5994970511560293980_n.jpg` (imzalı, müvəqqəti URL — saxlanılan lokal nüsxədən istifadə edin)

**Vacib texniki qeyd:** Instagram CDN linkləri imzalıdır (`oh=`, `oe=` parametrləri) və bir neçə gün/həftə sonra **vaxtı bitir**. Hətta tapılsaydı da, saytda birbaşa hotlink etmək etibarlı olmazdı. Şəkillər mütləq **lokal yüklənib** layihəyə qoyulmalıdır (`/assets/products/`).

Uydurma/təsadüfi stok şəkil URL-ləri yazmadım — real məhsulları əks etdirməzdi.

## 4. Şəkilləri əldə etmək üçün variantlar

1. **Ən yaxşısı:** Sahibindən orijinal fotoları (telefon/Drive) istənilir — Instagram sıxılmış 1080px versiyasından xeyli keyfiyyətlidir, premium sayt üçün vacibdir.
2. Siz brauzerdə login olub mənə 15–30 ən yaxşı postun şəkillərini yükləyib qovluğa atırsınız (`assets/products/`); mən adlandırıb optimallaşdırıram (WebP, çoxlu ölçü).
3. Chrome əlavəsi (Claude in Chrome / brauzer paneli) varsa, sizin login sessiyanızla mən özüm səhifəni gəzib yükləyə bilərəm — bunun üçün həmin alətin aktiv olması lazımdır.

## 5. Dizayn və strategiya görüşlərim

### Brend mövqeyi
- "Premium taxta" → **istilik, toxuma (grain), əl işi, uzunömürlülük**. Hədəf: hədiyyə alanlar (nərd/şahmat klassik hədiyyədir), interyer sevənlər, korporativ hədiyyələr.
- Azərbaycan mədəniyyətində nərd və şahmat güclü emosional yer tutur → **"miras / ənənə + müasir dizayn"** hekayəsi.

### Vizual istiqamət (təklif)
- **Palitra:** isti qara-qəhvəyi (`#1a1410`), krem (`#f3ebdd`), qızılı-mis aksent (`#b08a57`), cakar/qoz ağacı tonları.
- **Tipoqrafiya:** başlıqlarda editorial serif (Cormorant Garamond / Playfair), mətndə təmiz sans (Inter / Manrope). Azərbaycan hərfləri (ə, ş, ğ, ı, ö, ü, ç) dəstəklənməlidir — şrift seçimində yoxlanmalıdır.
- **Hiss:** böyük tam-ekran fotolar, yavaş parallax, minimal naviqasiya, çox boş sahə (whitespace).

### Sayt strukturu (təklif)
1. **Hero** — tam ekran videolu/şəkilli giriş, bir cümlə + "Kolleksiyaya bax"
2. **5 kateqoriya** — Şahmat / Nərd / Masa / Dekor / Saat (böyük kartlar, hover-də ikinci şəkil)
3. **Seçilmiş məhsullar** — qiymət + "WhatsApp ilə sifariş"
4. **Hekayə / emalatxana** — taxta növləri (qoz, palıd, cakar), əl işi prosesi
5. **Fərdi sifariş** — həkk (gravür), ölçü, ağac seçimi
6. **Instagram axını / rəylər**
7. **Əlaqə** — WhatsApp, Instagram, ünvan/xəritə

### Konversiya
- Azərbaycanda satış çox vaxt **WhatsApp / Instagram DM** ilə olur → səbət əvəzinə **"WhatsApp-da sifariş et"** düyməsi (məhsul adı və linki ilə hazır mesaj) ən real həllidir.
- Dil: **AZ əsas**, istəyə görə RU/EN.
- Mobil birinci (auditoriya əsasən Instagram-dan telefonla gələcək), sürətli yüklənmə (WebP, lazy-load).

### Texniki təklif
- Statik sayt (HTML/CSS/JS və ya Astro/Next.js), məhsul datası `products.json`-da — sonradan yeni məhsul əlavə etmək asan olsun.
- SEO: "taxta nərd Bakı", "şahmat dəsti sifariş", "taxta divar saatı" açar sözləri.

## 6. Mənə lazım olan məlumatlar

- [ ] Orijinal məhsul şəkilləri (və ya yuxarıdakı variant 2/3)
- [ ] Brend loqosu (varsa; yoxdursa profil şəklindən yenisini təklif edərəm)
- [ ] Qiymətlər və məhsul adları / ağac növləri
- [ ] WhatsApp nömrəsi, ünvan, iş saatları
- [ ] Dil seçimi (yalnız AZ, yoxsa AZ+EN+RU)
- [ ] Referans saytlar / bəyəndiyiniz üslub

## 7. Növbəti addım

Siz vebsaytın necə olacağını izah edin; şəkil mənbəyi məsələsi (bölmə 4) həll olunan kimi real fotolarla qurmağa başlayaram.
