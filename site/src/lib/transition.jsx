import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { useI18n } from './i18n.jsx'
import { INSTAGRAM } from './config.js'
import { lockScroll, scrollTop, unlockScroll } from './scroll.js'

const VIDEOS = ['/videos/video1.mp4', '/videos/video2.mp4', '/videos/video3.mp4', '/videos/video4.mp4']
const FILM_LONG = 3000 // menyu keçidi: video 3 saniyə oynayır
const FILM_SHORT = 1700 // kateqoriya / məhsul keçidləri
const FADE_OUT = 1200

export const MENU = [
  { key: 'home', path: '/' },
  { key: 'nerd', path: '/kolleksiya/nerd' },
  { key: 'sahmat', path: '/kolleksiya/sahmat' },
  { key: 'masa', path: '/kolleksiya/masa' },
  { key: 'dekor', path: '/kolleksiya/dekor' },
  { key: 'saat', path: '/kolleksiya/saat' },
  { key: 'about', path: '/haqqimizda' },
  { key: 'contact', path: '/elaqe' },
]

const Ctx = createContext(null)
export const useTransition = () => useContext(Ctx)

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('closed') // closed | open | fading
  const [mode, setMode] = useState('menu') // menu | film
  const [bg, setBg] = useState(0)
  const [label, setLabel] = useState('')
  const [dur, setDur] = useState(FILM_LONG)
  const [instant, setInstant] = useState(false)
  const timers = useRef([])
  const busy = useRef(false)
  const rr = useRef(0)
  const pathRef = useRef(location.pathname)
  pathRef.current = location.pathname

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const openMenu = useCallback(() => {
    if (busy.current) return
    setMode('menu'); setBg(0); setPhase('open'); lockScroll()
  }, [])

  const closeMenu = useCallback(() => {
    if (busy.current) return
    setPhase('closed'); unlockScroll()
  }, [])

  // Əsas keçid: video fon + yazı + yavaş solma. long=true → 3 saniyə.
  const go = useCallback((path, { label: text = '', long = false } = {}) => {
    if (busy.current) return
    if (path === pathRef.current) { setPhase('closed'); unlockScroll(); return }
    busy.current = true
    const total = reduce ? 600 : long ? FILM_LONG : FILM_SHORT
    const next = 1 + (rr.current++ % 3) // video2, video3, video4 dövri
    setDur(total); setLabel(text); setBg(next); setMode('film'); setPhase('open'); lockScroll()
    later(() => { navigate(path); scrollTop() }, total)
    later(() => setPhase('fading'), total + 150)
    later(() => {
      setInstant(true); setPhase('closed'); setMode('menu'); setBg(0)
      unlockScroll(); busy.current = false
      requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)))
    }, total + 150 + FADE_OUT)
  }, [navigate, reduce])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && phase === 'open' && mode === 'menu') closeMenu() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, mode, closeMenu])

  const value = useMemo(() => ({ phase, mode, openMenu, closeMenu, go, menuOpen: phase === 'open' && mode === 'menu' }), [phase, mode, openMenu, closeMenu, go])

  return (
    <Ctx.Provider value={value}>
      {children}
      <Veil phase={phase} mode={mode} bg={bg} label={label} dur={dur} instant={instant} reduce={reduce} />
    </Ctx.Provider>
  )
}

function Veil({ phase, mode, bg, label, dur, instant, reduce }) {
  const { t, toggle } = useI18n()
  const { go } = useContext(Ctx)
  const refs = useRef([])
  const menuShown = phase === 'open' && mode === 'menu'
  const filmShown = mode === 'film' && phase !== 'closed'

  useEffect(() => {
    const vs = refs.current
    if (phase === 'closed') {
      const id = setTimeout(() => vs.forEach((v) => v && v.pause()), 1100)
      return () => clearTimeout(id)
    }
    const v = vs[bg]
    if (v && v.paused) {
      if (mode === 'film') { try { v.currentTime = 0 } catch {} }
      v.play().catch(() => {})
    }
    const id = setTimeout(() => vs.forEach((o, i) => { if (o && i !== bg) o.pause() }), 1300)
    return () => clearTimeout(id)
  }, [phase, bg, mode])

  return (
    <div
      className="veil"
      data-phase={phase}
      data-instant={instant ? 'true' : 'false'}
      role="dialog"
      aria-modal="true"
      aria-label={t.menu}
      aria-hidden={phase === 'closed'}
      inert={phase === 'closed'}
    >
      {!reduce && VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => (refs.current[i] = el)}
          className="veil-video"
          data-on={bg === i && phase !== 'closed' ? 'true' : 'false'}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      ))}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_50%,rgba(18,13,9,0.78),rgba(18,13,9,0.15)_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />

      {/* Menyu */}
      <nav
        aria-label={t.menu}
        className="relative z-10 flex h-full flex-col justify-center px-6 pb-24 pt-28 md:px-16"
        style={{ pointerEvents: menuShown ? 'auto' : 'none' }}
      >
        <ul className="menu-list flex flex-col gap-[0.4vh]">
          {MENU.map((item, i) => (
            <li key={item.key} className="overflow-hidden py-[0.2vh]">
              <a
                href={item.path}
                tabIndex={menuShown ? 0 : -1}
                onClick={(e) => { e.preventDefault(); go(item.path, { label: t.nav[item.key], long: true }) }}
                className="font-display block text-[clamp(2.1rem,6.6vh,4.6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-bone no-underline transition-[opacity,transform,color] will-change-transform"
                style={{
                  transform: menuShown ? 'translateY(0)' : 'translateY(115%)',
                  opacity: menuShown ? 1 : 0,
                  transitionDuration: menuShown ? '1000ms, 1000ms, 400ms' : '350ms, 350ms, 400ms',
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  transitionDelay: menuShown ? `${380 + i * 55}ms, ${380 + i * 55}ms, 0ms` : '0ms',
                }}
              >
                {t.nav[item.key]}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="absolute bottom-8 left-6 right-6 flex items-end justify-between gap-6 md:bottom-12 md:left-16 md:right-16"
          style={{ opacity: menuShown ? 1 : 0, transition: `opacity ${menuShown ? 900 : 250}ms var(--ease-out-strong) ${menuShown ? 900 : 0}ms` }}
        >
          <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer" tabIndex={menuShown ? 0 : -1} className="caps draw text-bone no-underline">
            @{INSTAGRAM}
          </a>
          <button type="button" onClick={toggle} tabIndex={menuShown ? 0 : -1} aria-label={t.langLabel} className="caps press cursor-pointer text-bone">
            {t.lang}
          </button>
        </div>
      </nav>

      {/* Keçid yazısı */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        aria-live="polite"
        style={{ opacity: filmShown ? 1 : 0, transition: `opacity ${filmShown ? 900 : 400}ms var(--ease-out-strong) ${filmShown ? 650 : 0}ms` }}
      >
        <p
          key={label}
          className="font-display text-[clamp(3rem,11vw,9rem)] font-medium italic leading-[0.95] tracking-[-0.025em] text-bone"
          style={{ transform: filmShown ? 'translateY(0)' : 'translateY(16px)', filter: filmShown ? 'blur(0)' : 'blur(8px)', transition: `transform 1400ms var(--ease-out-strong) 650ms, filter 1400ms var(--ease-out-strong) 650ms` }}
        >
          {label}
        </p>
        <div className="mt-10 h-px w-40 overflow-hidden bg-bone/20">
          {filmShown && <div key={label + dur} className="h-full origin-left bg-brass" style={{ animation: `veil-fill ${dur}ms linear forwards` }} />}
        </div>
      </div>

      <style>{`@keyframes veil-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @media (hover: hover) and (pointer: fine) { .menu-list:hover a { opacity: .4 !important } .menu-list a:hover { opacity: 1 !important; font-style: italic } }`}</style>
    </div>
  )
}
