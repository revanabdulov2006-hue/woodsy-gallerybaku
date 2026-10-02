import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart, flyToCart } from '../lib/cart.jsx'
import { CURRENCY, INSTAGRAM, ease, waLink } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'
import { lockScroll, unlockScroll } from '../lib/scroll.js'
import { InstagramIcon, Stepper, WhatsAppIcon } from './ui.jsx'

export default function ProductDialog({ product, onClose }) {
  const { lang, t } = useI18n()
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const imgBox = useRef(null)
  const { add } = useCart()
  const { pathname } = useLocation()

  // Başqa səhifəyə keçid olanda kart bağlansın (eyni marşrutda qalan səhifələrdə də)
  useEffect(() => { onClose() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = () => {
    flyToCart(imgBox.current, product.images[idx])
    add(product.id, qty)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  useEffect(() => {
    if (!product) return
    setIdx(0)
    setQty(1)
    setJustAdded(false)
    lockScroll()
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); unlockScroll() }
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key={product.id}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/85 pt-24 backdrop-blur-md md:items-center md:px-10 md:pb-10 md:pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: ease.out }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={product.name[lang]}
        >
          <motion.div
            data-lenis-prevent
            className="relative grid max-h-full w-full overscroll-contain max-w-6xl grid-cols-1 overflow-y-auto rounded-t-[20px] bg-ink-2 ring-1 ring-bone/10 md:h-full md:grid-rows-[minmax(0,1fr)] md:grid-cols-[1.15fr_1fr] md:overflow-hidden md:rounded-[20px]"
            initial={reduce ? { opacity: 0 } : { y: 48, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: ease.out }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-ink-3">
              <div
                ref={imgBox}
                className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[560px]"
                style={{ touchAction: 'pan-y' }}
                onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
                onTouchEnd={(e) => {
                  if (touchX.current == null || product.images.length < 2) return
                  const dx = e.changedTouches[0].clientX - touchX.current
                  touchX.current = null
                  if (Math.abs(dx) < 40) return
                  const n = product.images.length
                  setIdx((i) => (dx < 0 ? (i + 1) % n : (i - 1 + n) % n))
                }}
              >
                {product.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === idx ? product.name[lang] : ''}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? 'scale(1)' : 'scale(1.04)', transition: 'opacity 700ms var(--ease-out-strong), transform 1200ms var(--ease-out-strong)' }}
                  />
                ))}
              </div>
              {product.images.length > 1 && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`${i + 1} / ${product.images.length}`}
                      onClick={() => setIdx(i)}
                      className="press grid h-8 w-8 cursor-pointer place-items-center"
                    >
                      <span className={`block h-1 rounded-full transition-all duration-500 ${i === idx ? 'w-8 bg-bone' : 'w-4 bg-bone/40'}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-8 p-7 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:p-12" data-lenis-prevent>
              <div>
                <p className="caps text-brass">{t.nav[product.cat]}</p>
                <h2 className="display-m mt-5 !text-[clamp(2rem,3.6vw,3.25rem)]">{product.name[lang]}</h2>
                <p className="mt-4 text-bone-dim">{product.material[lang]}</p>
                <p className="display-m tabular mt-6">{product.price} {CURRENCY}</p>
              </div>

              <div className="flex items-center justify-between gap-4 border-y border-bone/10 py-5">
                <div className="flex items-center gap-4">
                  <span className="caps text-bone-dim">{t.qty}</span>
                  <Stepper value={qty} onChange={(n) => setQty(Math.min(99, Math.max(1, n)))} label={t.qty} />
                </div>
                <p className="text-right">
                  <span className="caps block text-bone-dim">{t.total}</span>
                  <span className="font-display tabular text-2xl">{product.price * qty} {CURRENCY}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={addToCart}
                  className="group press inline-flex w-full cursor-pointer items-center justify-between gap-4 rounded-full bg-bone py-2 pl-7 pr-2 text-sm font-semibold tracking-[0.02em] text-ink hover:bg-white"
                >
                  <span aria-live="polite">{justAdded ? t.added : t.addToCart}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bone">
                    {justAdded
                      ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <svg width="18" height="18" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M14 22h36l-3 24a4 4 0 0 1-4 3H21a4 4 0 0 1-4-3L14 22zM24 22v-4a8 8 0 0 1 16 0v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={waLink(t.msgOrder(`• ${product.name[lang]} × ${qty} = ${product.price * qty} ${CURRENCY}`, `${product.price * qty} ${CURRENCY}`))}
                    target="_blank" rel="noreferrer" aria-label={t.orderWa}
                    className="press grid h-14 cursor-pointer place-items-center rounded-full bg-bone/10 text-bone ring-1 ring-bone/20 backdrop-blur-xl hover:bg-bone/20"
                  >
                    <WhatsAppIcon size={26} />
                  </a>
                  <a
                    href={`https://ig.me/m/${INSTAGRAM}`}
                    target="_blank" rel="noreferrer" aria-label="Instagram"
                    className="press grid h-14 cursor-pointer place-items-center rounded-full bg-bone/10 text-bone ring-1 ring-bone/20 backdrop-blur-xl hover:bg-bone/20"
                  >
                    <InstagramIcon size={26} />
                  </a>
                </div>
              </div>

              <dl className="border-t border-bone/10">
                {t.info.map(([title, text]) => (
                  <div key={title} className="border-b border-bone/10 py-5">
                    <dt className="caps text-brass">{title}</dt>
                    <dd className="mt-2 text-sm text-bone-dim">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={t.back}
              className="press absolute left-4 top-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink/40 text-bone ring-1 ring-bone/20 backdrop-blur-xl"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7.5 3.5L3 8l4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="press absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink/60 text-bone ring-1 ring-bone/20 backdrop-blur-md"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1.5 1.5l11 11M12.5 1.5l-11 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
