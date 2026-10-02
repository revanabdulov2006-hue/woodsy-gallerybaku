// Lenis nümunəsi burada saxlanır ki, keçid sistemi scroll-u dayandıra və başa qaytara bilsin.
let lenis = null

export const setLenis = (l) => { lenis = l }
export const lockScroll = () => { lenis?.stop(); document.documentElement.style.overflow = 'hidden' }
export const unlockScroll = () => { document.documentElement.style.overflow = ''; lenis?.start() }
export const scrollTop = () => { if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else window.scrollTo(0, 0) }
export const scrollToEl = (el, offset = 0) => { if (lenis) lenis.scrollTo(el, { offset, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) }); else el?.scrollIntoView({ behavior: 'smooth' }) }
