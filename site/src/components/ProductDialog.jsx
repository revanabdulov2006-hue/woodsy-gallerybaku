import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ease, orderLink } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'
import { lockScroll, unlockScroll } from '../lib/scroll.js'
import { PillButton } from './ui.jsx'

export default function ProductDialog({ product, onClose }) {
  const { lang, t } = useI18n()
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!product) return
    setIdx(0)
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
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/85 backdrop-blur-md md:items-center md:p-10"
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
            className="relative grid max-h-[100dvh] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-t-[20px] bg-ink-2 ring-1 ring-bone/10 md:max-h-[88vh] md:grid-cols-[1.15fr_1fr] md:overflow-hidden md:rounded-[20px]"
            initial={reduce ? { opacity: 0 } : { y: 48, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: ease.out }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-ink-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[560px]">
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

            <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
              <div>
                <p className="caps text-brass">{t.nav[product.cat]}</p>
                <h2 className="display-m mt-5 !text-[clamp(2rem,3.6vw,3.25rem)]">{product.name[lang]}</h2>
                <p className="mt-5 text-bone-dim">{product.material[lang]}</p>
                <p className="mt-8 border-t border-bone/10 pt-6 text-sm text-bone-dim">{t.priceOnRequest}</p>
              </div>
              <PillButton as="a" href={orderLink(t.msgProduct(product.name[lang]))} target="_blank" rel="noreferrer" className="self-start">
                {t.order}
              </PillButton>
            </div>

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
