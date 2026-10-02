import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { INSTAGRAM, WHATSAPP, ease } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'
import { useTransition } from '../lib/transition.jsx'

export const PAGE_DELAY = 0.45 // sayfa girişi: keçid pərdəsi solarkən başlayır

export function useMedia(query) {
  const [m, setM] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

export function Arrow({ className = '', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 12.5L12.5 3.5M12.5 3.5H5.5M12.5 3.5V10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Yumşaq yuxarı qalxma: blur → aydın */
export function FadeUp({ children, delay = 0, y = 28, className = '', as: Tag = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const M = motion[Tag]
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Maskalanmış sətir açılışı (başlıqlar üçün) */
export function Lines({ lines, className = '', delay = 0, onMount = false, stagger = 0.09 }) {
  const reduce = useReducedMotion()
  const view = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <span className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            initial="hide"
            {...view}
            variants={{ hide: reduce ? { opacity: 0 } : { y: '108%' }, show: reduce ? { opacity: 1 } : { y: '0%' } }}
            transition={{ duration: 1.25, delay: delay + i * stagger, ease: ease.out }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Şəkil: clip-path ilə açılış + yavaş miqyas */
export function ImageReveal({ src, alt = '', className = '', imgClassName = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.3, delay, ease: ease.drawer }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease: ease.out }}
      />
    </motion.div>
  )
}

/** Düymə içində düymə: dairəvi ox */
export function PillButton({ children, as: Tag = 'button', tone = 'light', className = '', ...rest }) {
  const light = tone === 'light'
  return (
    <Tag
      {...rest}
      className={`group press inline-flex cursor-pointer items-center gap-4 rounded-full py-2 pl-7 pr-2 text-sm font-semibold tracking-[0.02em] no-underline ${
        light ? 'bg-bone text-ink hover:bg-white' : 'bg-bone/10 text-bone ring-1 ring-bone/20 hover:bg-bone/15'
      } ${className}`}
    >
      {children}
      <span
        className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 [transition-timing-function:var(--ease-out-strong)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${
          light ? 'bg-ink text-bone' : 'bg-bone text-ink'
        }`}
      >
        <Arrow />
      </span>
    </Tag>
  )
}

export function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}

/** Dairəvi ikon keçidi: WhatsApp / Instagram */
export function SocialLinks({ className = '', size = 'md' }) {
  const box = size === 'lg' ? 'h-16 w-16' : 'h-11 w-11'
  const icon = size === 'lg' ? 28 : 20
  const cls = `press grid ${box} cursor-pointer place-items-center rounded-full text-bone ring-1 ring-bone/25 transition-colors duration-300 hover:bg-bone hover:text-ink`
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={cls}><WhatsAppIcon size={icon} /></a>
      <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer" aria-label="Instagram" className={cls}><InstagramIcon size={icon} /></a>
    </div>
  )
}

/** Say seçici (− 1 +) */
export function Stepper({ value, onChange, label }) {
  const { t } = useI18n()
  const btn = 'press grid h-9 w-9 cursor-pointer place-items-center rounded-full text-lg text-bone hover:bg-bone/10'
  return (
    <div className="inline-flex items-center rounded-full ring-1 ring-bone/20" role="group" aria-label={label}>
      <button type="button" className={btn} aria-label={t.decrease} onClick={() => onChange(value - 1)}>−</button>
      <span className="tabular w-8 text-center text-sm" aria-live="polite">{value}</span>
      <button type="button" className={btn} aria-label={t.increase} onClick={() => onChange(value + 1)}>+</button>
    </div>
  )
}

/** Film keçidi ilə naviqasiya edən keçid */
export function GoLink({ to, label, long = false, children, className = '', ...rest }) {
  const { go } = useTransition()
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        go(to, { label, long })
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}
