import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const dict = {
  az: {
    menu: 'Menyu', close: 'Bağla', skip: 'Məzmuna keç',
    nav: { home: 'Ana səhifə', nerd: 'Nərd', sahmat: 'Şahmat', masa: 'Masa', dekor: 'Dekor', saat: 'Saat', about: 'Haqqımızda', contact: 'Əlaqə' },
    heroTitle: ['Taxtanın hekayəsi,', 'əllərin işi.'],
    heroSub: 'Bakıda əl ilə hazırlanan nərd, şahmat, masa, dekor və saat. Hər əsər bir ağacın təkrarsız naxışından doğulur.',
    heroCta: 'Kolleksiyalara bax', scroll: 'Aşağı',
    manifesto: 'Hər taxta parçasının öz xarakteri var. Biz onu düzəltmirik, ona səs veririk. Epoksid isə yalnız ağacın çatlarında axan işıqdır.',
    collections: 'Kolleksiyalar', collectionsSub: 'Beş sənət, bir material.',
    pieces: (n) => (n === 1 ? '1 əsər' : `${n} əsər`),
    selected: 'Seçilmiş əsərlər',
    craftTitle: 'Emalatxanadan', craftLead: 'Bakıda, əllə. Hər əsər bir adamın yox, bir ağacın hekayəsidir.',
    craft: [
      ['Ağac seçilir', 'Qoz, zeytun və palıd kökləri naxışına və damarına görə əllə seçilir.'],
      ['Epoksid axıdılır', 'Çatlar və boşluqlar rəngli epoksidlə doldurulur. Nəticə hər dəfə təkrarsızdır.'],
      ['Sizin üçün həkk edilir', 'Ad, tarix və ya loqo ağaca həkk olunur. Hədiyyə bir daha eyni olmur.'],
    ],
    customTitle: 'Öz əsərinizi sifariş edin', customText: 'Ölçünü, ağac növünü və rəngi birlikdə seçək. Yazın, bir neçə saat ərzində cavab verək.',
    write: 'Bizə yazın', order: 'Sifariş et', priceOnRequest: 'Qiymət sorğu ilə',
    back: 'Geri', otherCollections: 'Digər kolleksiyalar', view: 'Bax',
    catDesc: {
      nerd: 'Hər nərd taxtası bir ağac kökündən və bir sıra epoksid axınından yaranır. Heç iki taxta eyni deyil.',
      sahmat: 'Oyun üçün hazırlanmış heykəl. Mərmər effektli və rəngli epoksid şahmat dəstləri.',
      masa: 'Ağac kəsimindən doğan masalar. Mavi çaylar və qara dərinliklər.',
      dekor: 'Qutular, dəstlər və hədiyyələr. Hamısı həkk edilə bilər.',
      saat: 'Divarda zamanı göstərən ağac parçası.',
    },
    aboutTitle: ['Əllər, ağac', 'və zaman.'],
    aboutText: ['Woodsy Gallery Bakıda əl ilə işləyən emalatxanadır. Biz taxtanı süni yox, olduğu kimi, öz damarları, çatları və düyünləri ilə göstəririk.', 'Hər əsər üçün ağac ayrıca seçilir, qurudulur, işlənir və epoksidlə birləşdirilir. Bu səbəbdən hər nərd, hər şahmat, hər masa bir nüsxədir.'],
    madeIn: 'Azərbaycanda hazırlanıb · Əl işi',
    contactTitle: ['Gəlin', 'danışaq.'], contactText: 'Sifariş, ölçü və həkk üçün yazın. Instagram və ya WhatsApp ilə cavab veririk.',
    contactInstagram: 'Instagram', contactCity: 'Bakı, Azərbaycan', contactWhatsapp: 'WhatsApp',
    footerLine: 'Əl ilə, Bakıda.', rights: 'Bütün hüquqlar qorunur.',
    msgProduct: (n) => `Salam! "${n}" haqqında məlumat almaq istəyirəm.`, msgCustom: 'Salam! Fərdi sifariş vermək istəyirəm.',
    qty: 'Say', total: 'Cəmi', addToCart: 'Səbətə at', added: 'Səbətə əlavə olundu', orderWa: 'WhatsApp ilə sifariş', callUs: 'Zəng et', price: 'Qiymət', each: 'ədəd',
    cart: 'Səbət', cartEmpty: 'Səbətiniz boşdur', cartEmptyText: 'Bəyəndiyiniz əsəri seçib səbətə əlavə edin.', remove: 'Sil', increase: 'Artır', decrease: 'Azalt', checkoutWa: 'WhatsApp ilə sifariş ver', orCall: 'Və ya zəng edin',
    info: [
      ['Hazırlanma müddəti', '7–15 gün. Hər əsər sifarişdən sonra əllə hazırlanır, qurutma və epoksid mərhələsi vaxt tələb edir.'],
      ['Çatdırılma', 'Bakı daxili və bölgələrə çatdırılma. Qablaşdırma zədələnmədən qoruyan ağac qutuda aparılır. Qiymət ünvana görə dəqiqləşir.'],
      ['Qaytarma siyasəti', 'Əsərlər sifarişlə hazırlandığı üçün geri qaytarılmır. Qüsur və ya daşınma zədəsi olarsa 3 gün ərzində bildirin, əvəz edək.'],
    ],
    msgOrder: (lines, total) => `Salam! Sifariş vermək istəyirəm:\n${lines}\nCəmi: ${total}`,
    lang: 'EN', langLabel: 'Switch to English', notFound: 'Səhifə tapılmadı', home: 'Ana səhifəyə qayıt',
  },
  en: {
    menu: 'Menu', close: 'Close', skip: 'Skip to content',
    nav: { home: 'Home', nerd: 'Backgammon', sahmat: 'Chess', masa: 'Tables', dekor: 'Décor', saat: 'Clocks', about: 'About', contact: 'Contact' },
    heroTitle: ['The story of wood,', 'made by hand.'],
    heroSub: 'Backgammon, chess, tables, décor and clocks handmade in Baku. Every piece is born from the one-of-a-kind grain of a single tree.',
    heroCta: 'View collections', scroll: 'Scroll',
    manifesto: 'Every piece of wood has a character of its own. We do not correct it, we give it a voice. The resin is only light flowing through the grain.',
    collections: 'Collections', collectionsSub: 'Five crafts, one material.',
    pieces: (n) => (n === 1 ? '1 piece' : `${n} pieces`),
    selected: 'Selected works',
    craftTitle: 'From the workshop', craftLead: 'In Baku, by hand. Every piece is the story of a tree, not of a person.',
    craft: [
      ['The wood is chosen', 'Walnut, olive and oak roots are picked by hand for their grain and figure.'],
      ['The resin is poured', 'Cracks and voids are filled with coloured epoxy. The result is never the same twice.'],
      ['Engraved for you', 'A name, a date or a logo is engraved into the wood. A gift that cannot be repeated.'],
    ],
    customTitle: 'Commission your own piece', customText: 'Let us choose the size, the wood and the colour together. Write to us and we reply within hours.',
    write: 'Message us', order: 'Order', priceOnRequest: 'Price on request',
    back: 'Back', otherCollections: 'Other collections', view: 'View',
    catDesc: {
      nerd: 'Each backgammon board grows from one tree root and one run of epoxy. No two are alike.',
      sahmat: 'Sculpture made for play. Marble-effect and coloured epoxy chess sets.',
      masa: 'Tables born from a cross-cut of wood. Blue rivers and black depths.',
      dekor: 'Boxes, sets and gifts. Every one can be engraved.',
      saat: 'A piece of wood that tells the time on your wall.',
    },
    aboutTitle: ['Hands, wood', 'and time.'],
    aboutText: ['Woodsy Gallery is a hand-working workshop in Baku. We show wood as it is, with its own grain, cracks and knots, never as an imitation.', 'For each piece the wood is selected, dried, worked and joined with epoxy. That is why every board, every chess set and every table is a single copy.'],
    madeIn: 'Made in Azerbaijan · Handmade',
    contactTitle: ['Let’s', 'talk.'], contactText: 'Write to us about orders, sizes and engraving. We reply on Instagram or WhatsApp.',
    contactInstagram: 'Instagram', contactCity: 'Baku, Azerbaijan', contactWhatsapp: 'WhatsApp',
    footerLine: 'By hand, in Baku.', rights: 'All rights reserved.',
    msgProduct: (n) => `Hello! I would like to know more about "${n}".`, msgCustom: 'Hello! I would like to commission a custom piece.',
    qty: 'Qty', total: 'Total', addToCart: 'Add to cart', added: 'Added to cart', orderWa: 'Order on WhatsApp', callUs: 'Call us', price: 'Price', each: 'each',
    cart: 'Cart', cartEmpty: 'Your cart is empty', cartEmptyText: 'Pick a piece you love and add it to the cart.', remove: 'Remove', increase: 'Increase', decrease: 'Decrease', checkoutWa: 'Order on WhatsApp', orCall: 'Or call us',
    info: [
      ['Production time', '7–15 days. Each piece is handmade after you order; drying and resin curing take time.'],
      ['Delivery', 'Delivery within Baku and to the regions. Packed in a protective wooden crate. Price depends on the address.'],
      ['Return policy', 'As pieces are made to order they cannot be returned. If there is a defect or transit damage, tell us within 3 days and we will replace it.'],
    ],
    msgOrder: (lines, total) => `Hello! I would like to order:\n${lines}\nTotal: ${total}`,
    lang: 'AZ', langLabel: 'Azərbaycan dilinə keç', notFound: 'Page not found', home: 'Back to home',
  },
}

const Ctx = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('woodsy-lang') || 'az' } catch { return 'az' }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('woodsy-lang', lang) } catch {}
  }, [lang])
  const value = useMemo(() => ({ lang, t: dict[lang], toggle: () => setLang((l) => (l === 'az' ? 'en' : 'az')) }), [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)
