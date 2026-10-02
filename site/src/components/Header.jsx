import { motion } from 'motion/react'
import { useCart } from '../lib/cart.jsx'
import { useI18n } from '../lib/i18n.jsx'
import { useTransition } from '../lib/transition.jsx'
import { GoLink } from './ui.jsx'

export default function Header() {
  const { t, toggle } = useI18n()
  const { count, bump, setOpen: setCartOpen } = useCart()
  const { menuOpen, openMenu, closeMenu } = useTransition()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-4 pt-4 md:px-10 md:pt-7">
      <GoLink to="/" label="Woodsy Gallery" aria-label="Woodsy Gallery" className="pointer-events-auto press block h-12 w-12 overflow-hidden rounded-full ring-1 ring-bone/20 md:h-14 md:w-14">
        <img src="/img/logo.webp" alt="" width="56" height="56" className="h-full w-full object-cover" />
      </GoLink>

      <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-ink/45 p-1.5 pl-5 ring-1 ring-bone/15 backdrop-blur-xl">
        <button type="button" onClick={toggle} aria-label={t.langLabel} className="caps press cursor-pointer pr-3 text-bone-dim transition-colors hover:text-bone">
          {t.lang}
        </button>
        <button
          id="cart-button"
          type="button"
          onClick={() => setCartOpen(true)}
          aria-label={`${t.cart} (${count})`}
          className="press relative mr-1 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-bone-dim transition-colors hover:text-bone"
        >
          <motion.svg key={bump} width="20" height="20" viewBox="0 0 64 64" fill="none" aria-hidden="true" initial={bump ? { scale: 1.3 } : false} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5, bounce: 0.5 }}>
            <path d="M14 22h36l-3 24a4 4 0 0 1-4 3H21a4 4 0 0 1-4-3L14 22zM24 22v-4a8 8 0 0 1 16 0v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          {count > 0 && <span className="tabular absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brass px-1 text-[10px] font-bold leading-none text-ink">{count}</span>}
        </button>
        <button
          type="button"
          onClick={menuOpen ? closeMenu : openMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t.close : t.menu}
          className="burger press flex h-11 cursor-pointer items-center gap-3 rounded-full bg-bone px-5 text-ink"
        >
          <span className="caps">{menuOpen ? t.close : t.menu}</span>
          <span className="bars flex flex-col gap-[6px]" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  )
}
