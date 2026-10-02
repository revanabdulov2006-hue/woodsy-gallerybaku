import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'
import { CURRENCY, PHONE, PHONE_TEL, ease, waLink } from '../lib/config.js'
import { useCart } from '../lib/cart.jsx'
import { useI18n } from '../lib/i18n.jsx'
import { byId } from '../lib/products.js'
import { lockScroll, unlockScroll } from '../lib/scroll.js'
import { PillButton, Stepper } from './ui.jsx'

export default function CartDrawer() {
  const { t, lang } = useI18n()
  const reduce = useReducedMotion()
  const { items, open, setOpen, setQty, remove, total } = useCart()

  useEffect(() => {
    if (!open) return
    lockScroll()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); unlockScroll() }
  }, [open, setOpen])

  const lines = items.map((i) => `• ${byId[i.id].name[lang]} × ${i.qty} = ${i.qty * byId[i.id].price} ${CURRENCY}`).join('\n')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75] bg-ink/70 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: ease.out }}
          onClick={() => setOpen(false)}
        >
          <motion.aside
            role="dialog" aria-modal="true" aria-label={t.cart}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-2 ring-1 ring-bone/10"
            initial={reduce ? { opacity: 0 } : { x: '100%' }} animate={{ x: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.6, ease: ease.drawer }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-6">
              <h2 className="display-m">{t.cart}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="press grid h-11 w-11 cursor-pointer place-items-center rounded-full ring-1 ring-bone/20">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1.5 1.5l11 11M12.5 1.5l-11 11" stroke="currentColor" strokeLinecap="round" /></svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="grid flex-1 place-items-center px-8 text-center">
                <div>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto text-brass" aria-hidden="true"><path d="M14 22h36l-3 24a4 4 0 0 1-4 3H21a4 4 0 0 1-4-3L14 22zM24 22v-4a8 8 0 0 1 16 0v4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <p className="display-m mt-6">{t.cartEmpty}</p>
                  <p className="mt-3 text-bone-dim">{t.cartEmptyText}</p>
                </div>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {items.map((i) => {
                      const p = byId[i.id]
                      return (
                        <motion.li key={i.id} layout={!reduce} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4, ease: ease.out }} className="flex gap-4 border-t border-bone/10 py-5">
                          <img src={p.images[0]} alt="" className="h-24 w-20 shrink-0 rounded-[12px] object-cover" />
                          <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div>
                              <p className="font-display text-xl leading-tight">{p.name[lang]}</p>
                              <p className="tabular mt-1 text-sm text-bone-dim">{p.price} {CURRENCY}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <Stepper value={i.qty} onChange={(q) => setQty(i.id, q)} label={t.qty} />
                              <button type="button" onClick={() => remove(i.id)} className="caps draw press cursor-pointer text-bone-dim hover:text-bone">{t.remove}</button>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-bone/10 p-6">
                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="caps text-bone-dim">{t.total}</span>
                    <span className="display-m tabular">{total} {CURRENCY}</span>
                  </div>
                  <PillButton as="a" href={waLink(t.msgOrder(lines, `${total} ${CURRENCY}`))} target="_blank" rel="noreferrer" className="w-full justify-between">{t.checkoutWa}</PillButton>
                  <p className="mt-4 text-center text-sm text-bone-dim">{t.orCall} <a href={`tel:${PHONE_TEL}`} className="draw text-bone no-underline">{PHONE}</a></p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
