import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ease } from '../lib/config.js'
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
