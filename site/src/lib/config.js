// WhatsApp nömrəsi beynəlxalq formatda: 055 347-57-37
export const WHATSAPP = '994553475737'
export const PHONE = '055 347-57-37'
export const PHONE_TEL = '+994553475737'
export const CURRENCY = '₼'
export const INSTAGRAM = 'woodsy_gallerybaku'

export function waLink(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
}

export function orderLink(text) {
  if (WHATSAPP) return waLink(text)
  return `https://ig.me/m/${INSTAGRAM}`
}

export const ease = {
  out: [0.23, 1, 0.32, 1],
  drawer: [0.32, 0.72, 0, 1],
  inOut: [0.77, 0, 0.175, 1],
}
