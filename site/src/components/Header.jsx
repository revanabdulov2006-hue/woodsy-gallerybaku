import { useI18n } from '../lib/i18n.jsx'
import { useTransition } from '../lib/transition.jsx'
import { GoLink } from './ui.jsx'

export default function Header() {
  const { t, toggle } = useI18n()
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
