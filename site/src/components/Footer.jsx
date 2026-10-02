import { INSTAGRAM } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'
import { MENU } from '../lib/transition.jsx'
import { GoLink } from './ui.jsx'

export default function Footer() {
  const { t, toggle } = useI18n()
  return (
    <footer className="relative border-t border-bone/10 px-6 pb-10 pt-20 md:px-14 md:pt-28">
      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img src="/img/logo.webp" alt="Woodsy Gallery" width="96" height="96" className="h-24 w-24 rounded-full" loading="lazy" />
          <p className="display-m mt-8 max-w-xs">{t.footerLine}</p>
          <p className="caps mt-6 text-bone-dim">{t.madeIn}</p>
        </div>
        <ul className="flex flex-col gap-3">
          {MENU.map((m) => (
            <li key={m.key}>
              <GoLink to={m.path} label={t.nav[m.key]} className="draw text-bone-dim no-underline hover:text-bone">{t.nav[m.key]}</GoLink>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 text-bone-dim">
          <a className="draw w-fit text-bone no-underline" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer">@{INSTAGRAM}</a>
          <span>{t.contactCity}</span>
          <button type="button" onClick={toggle} aria-label={t.langLabel} className="caps press mt-4 w-fit cursor-pointer text-bone">{t.lang}</button>
        </div>
      </div>
      <p className="mt-20 text-xs text-bone-dim">© {new Date().getFullYear()} Woodsy Gallery. {t.rights}</p>
    </footer>
  )
}
