// WhatsApp nömrəsi beynəlxalq formatda (məs. "994501234567"). Boşdursa Instagram DM istifadə olunur.
export const WHATSAPP = ''
export const INSTAGRAM = 'woodsy_gallerybaku'

export function orderLink(text) {
  if (WHATSAPP) return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
  return `https://ig.me/m/${INSTAGRAM}`
}

export const ease = {
  out: [0.23, 1, 0.32, 1],
  drawer: [0.32, 0.72, 0, 1],
  inOut: [0.77, 0, 0.175, 1],
}
