import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Craft } from '../components/Craft.jsx'
import ProductDialog from '../components/ProductDialog.jsx'
import { Arrow, FadeUp, GoLink, ImageReveal, Lines, PAGE_DELAY, PillButton, useMedia } from '../components/ui.jsx'
import { INSTAGRAM, ease, orderLink } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'
import { byCat, byId, categories, featured } from '../lib/products.js'
import { scrollToEl } from '../lib/scroll.js'

export default function Home() {
  const { t } = useI18n()
  const [open, setOpen] = useState(null)
  return (
    <>
      <Hero />
      <Manifesto />
      <Collections />
      <Selected onOpen={setOpen} />
      <Craft />
      <section className="px-6 pb-28 pt-8 text-center md:px-14 md:pb-44">
        <FadeUp>
          <h2 className="display-xl mx-auto max-w-5xl">{t.customTitle}</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="measure mx-auto mt-8 max-w-xl text-lg text-bone-dim">{t.customText}</p>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-12 flex justify-center">
          <PillButton as="a" href={orderLink(t.msgCustom)} target="_blank" rel="noreferrer">
            {t.write}
          </PillButton>
        </FadeUp>
      </section>
      <ProductDialog product={open} onClose={() => setOpen(null)} />
    </>
  )
}

function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15])
  const yT = useMotionTemplate`translate3d(0, ${y}, 0) scale(1.08)`

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: fade }}>
        {!reduce && (
          <motion.video
            className="h-full w-full object-cover"
            style={{ transform: yT }}
            src="/videos/video4.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/55" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-12 pt-32 md:px-14 md:pb-20">
        <h1 className="display-xl max-w-[16ch] md:max-w-none">
          <Lines lines={t.heroTitle} onMount delay={PAGE_DELAY} />
        </h1>
        <div className="mt-10 flex flex-col items-start justify-between gap-10 md:mt-14 md:flex-row md:items-end">
          <motion.p
            className="measure max-w-md text-bone/80"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: PAGE_DELAY + 0.5, ease: ease.out }}
          >
            {t.heroSub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: PAGE_DELAY + 0.65, ease: ease.out }}>
            <PillButton type="button" onClick={() => scrollToEl(document.getElementById('collections'), -40)}>
              {t.heroCta}
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Manifesto() {
  const { t } = useI18n()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = t.manifesto.split(' ')
  return (
    <section ref={ref} className="px-6 py-32 md:px-14 md:py-52">
      <p className="display-l mx-auto max-w-5xl !leading-[1.08]" aria-label={t.manifesto}>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 3) / words.length)]}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }} aria-hidden="true">{children}</motion.span>{' '}
    </>
  )
}

function Collections() {
  const { t, lang } = useI18n()
  const layout = [
    'md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto md:min-h-[680px]',
    'md:col-span-5 md:mt-28 aspect-[4/5] md:aspect-[5/6]',
    'md:col-span-4 aspect-[4/5]',
    'md:col-span-4 md:mt-16 aspect-[4/5]',
    'md:col-span-4 aspect-[4/5]',
  ]
  return (
    <section id="collections" className="px-6 pb-28 md:px-14 md:pb-44">
      <div className="mb-14 flex flex-col justify-between gap-4 md:mb-20 md:flex-row md:items-end">
        <h2 className="display-l"><Lines lines={[t.collections]} /></h2>
        <FadeUp><p className="text-bone-dim">{t.collectionsSub}</p></FadeUp>
      </div>
      <div className="grid gap-5 md:grid-cols-12 md:gap-6">
        {categories.map((c, i) => (
          <FadeUp key={c.id} delay={(i % 3) * 0.07} className={layout[i]}>
            <GoLink
              to={`/kolleksiya/${c.id}`}
              label={t.nav[c.id]}
              className="group relative block h-full rounded-[18px] bg-bone/[0.04] p-1 ring-1 ring-bone/10 no-underline"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-ink-3">
                <img
                  src={c.cover}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out-strong)] md:group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <h3 className="font-display text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.02em] text-bone">{t.nav[c.id]}</h3>
                    <p className="mt-3 text-sm text-bone/75">{t.pieces(byCat(c.id).length)}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 [transition-timing-function:var(--ease-out-strong)] md:group-hover:translate-x-0.5 md:group-hover:-translate-y-px md:group-hover:scale-105">
                    <Arrow size={16} />
                  </span>
                </div>
              </div>
            </GoLink>
          </FadeUp>
        ))}
        <FadeUp delay={0.14} className="flex items-center md:col-span-4 md:p-8">
          <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer" className="draw display-m w-fit text-bone no-underline">
            @{INSTAGRAM}
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

function Selected({ onOpen }) {
  const { t, lang } = useI18n()
  const desktop = useMedia('(min-width: 768px)')
  const ref = useRef(null)
  const trackRef = useRef(null)
  const [dist, setDist] = useState(0)
  const [vh, setVh] = useState(800)

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
      setVh(window.innerHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    trackRef.current && ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [desktop])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const transform = useMotionTemplate`translate3d(${x}px, 0, 0)`

  const items = featured.map((id) => byId[id])

  const card = (p, i) => (
    <button
      key={p.id}
      type="button"
      onClick={() => onOpen(p)}
      className="group press w-[72vw] shrink-0 cursor-pointer text-left md:w-[26vw] md:max-w-[440px]"
    >
      <div className="rounded-[18px] bg-bone/[0.04] p-1 ring-1 ring-bone/10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-ink-3">
          <img src={p.images[0]} alt={p.name[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out-strong)] md:group-hover:scale-[1.05]" />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 px-1">
        <h3 className="font-display text-2xl font-medium tracking-[-0.01em]">{p.name[lang]}</h3>
        <span className="caps shrink-0 text-bone-dim">{t.nav[p.cat]}</span>
      </div>
      <p className="mt-1 px-1 text-sm text-bone-dim">{p.material[lang]}</p>
    </button>
  )

  const head = (
    <div className="w-[80vw] shrink-0 self-center pr-10 md:w-[34vw]">
      <h2 className="display-l">{t.selected}</h2>
    </div>
  )

  if (!desktop) {
    return (
      <section className="pb-28">
        <div className="px-6">{head}</div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [&>*]:snap-start">{items.map(card)}</div>
      </section>
    )
  }

  return (
    <section ref={ref} style={{ height: dist + vh }} className="relative">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ transform }} className="flex items-center gap-10 px-14">
          {head}
          {items.map(card)}
          <div className="w-[12vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  )
}
