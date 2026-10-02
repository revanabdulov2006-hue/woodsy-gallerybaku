const img = (n) => `/img/products/p${String(n).padStart(2, '0')}.webp`

export const categories = [
  { id: 'nerd', cover: img(4) },
  { id: 'sahmat', cover: img(12) },
  { id: 'masa', cover: img(2) },
  { id: 'dekor', cover: img(8) },
  { id: 'saat', cover: img(14) },
]

export const products = [
  { id: 'zumrud-nerd', cat: 'nerd', images: [img(1)], name: { az: 'Zümrüd Nərd', en: 'Emerald Backgammon' }, material: { az: 'Kök ağacı · yaşıl epoksid', en: 'Burl wood · green epoxy' } },
  { id: 'xezer-nerd', cat: 'nerd', images: [img(4)], name: { az: 'Xəzər Nərdi', en: 'Caspian Backgammon' }, material: { az: 'Qoz ağacı · mavi epoksid', en: 'Walnut · blue epoxy' } },
  { id: 'mese-nerd', cat: 'nerd', images: [img(5)], name: { az: 'Meşə Xəritəsi Nərdi', en: 'Forest Map Backgammon' }, material: { az: 'Qoz ağacı · zümrüd epoksid', en: 'Walnut · emerald epoxy' } },
  { id: 'buz-nerd', cat: 'nerd', images: [img(6)], name: { az: 'Buz Nərd', en: 'Glacier Backgammon' }, material: { az: 'Kök ağacı · ağ-mavi epoksid', en: 'Burl wood · ice-blue epoxy' } },
  { id: 'okean-nerd', cat: 'nerd', images: [img(19)], name: { az: 'Okean Nərd', en: 'Ocean Backgammon' }, material: { az: 'Zeytun kökü · mavi epoksid', en: 'Olive burl · blue epoxy' } },
  { id: 'mermer-sahmat', cat: 'sahmat', images: [img(12), img(11), img(10)], name: { az: 'Mərmər Şahmat', en: 'Marble Chess' }, material: { az: 'Epoksid mərmər effekti', en: 'Marble-effect epoxy' } },
  { id: 'deniz-sahmat', cat: 'sahmat', images: [img(18)], name: { az: 'Dəniz Şahmatı', en: 'Lagoon Chess' }, material: { az: 'Kök ağacı · turkuaz epoksid', en: 'Burl wood · turquoise epoxy' } },
  { id: 'okean-masa', cat: 'masa', images: [img(2), img(3)], name: { az: 'Okean Jurnal Masası', en: 'Ocean Coffee Table' }, material: { az: 'Ağac kəsimi · mavi epoksid · metal ayaq', en: 'Live-edge wood · blue epoxy · steel base' } },
  { id: 'vitrin-masa', cat: 'masa', images: [img(15), img(16)], name: { az: 'Vitrin Masası', en: 'Showcase Table' }, material: { az: 'Qara epoksid · şəxsi kolleksiya', en: 'Black epoxy · personal collection' } },
  { id: 'kolleksiyaci-masa', cat: 'masa', images: [img(17)], name: { az: 'Kolleksiyaçı Yan Masası', en: 'Collector’s Side Table' }, material: { az: 'Qara epoksid · metal çərçivə', en: 'Black epoxy · steel frame' } },
  { id: 'teras-desti', cat: 'dekor', images: [img(8), img(7), img(9)], name: { az: 'Qoz Təraş Dəsti', en: 'Walnut Grooming Set' }, material: { az: 'Qoz ağacı · yaşıl epoksid · həkk', en: 'Walnut · green epoxy · engraved' } },
  { id: 'kazino-qutu', cat: 'dekor', images: [img(13)], name: { az: 'Kazino Epoksid Qutu', en: 'Casino Resin Box' }, material: { az: 'Kök ağacı · epoksid', en: 'Burl wood · epoxy' } },
  { id: 'okean-saat', cat: 'saat', images: [img(14)], name: { az: 'Okean Divar Saatı', en: 'Ocean Wall Clock' }, material: { az: 'Zeytun ağacı · mavi epoksid', en: 'Olive wood · blue epoxy' } },
]

export const featured = ['xezer-nerd', 'mermer-sahmat', 'okean-masa', 'okean-saat', 'mese-nerd', 'deniz-sahmat', 'teras-desti', 'zumrud-nerd']
export const byId = Object.fromEntries(products.map((p) => [p.id, p]))
export const byCat = (cat) => products.filter((p) => p.cat === cat)
