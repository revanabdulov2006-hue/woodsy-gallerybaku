import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useI18n } from '../lib/i18n.jsx'
import { FadeUp, Lines } from './ui.jsx'

export function Craft() {
  const { t } = useI18n()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-35, 55])

  return (
    <section ref={ref} className="relative overflow-x-clip px-6 py-28 md:px-14 md:py-44">
      <div className="grid items-center gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        <FadeUp className="mx-auto w-full max-w-[420px]">
          <motion.img
            src="/img/logo.webp"
            alt="Woodsy Gallery · Made in Azerbaijan · Handmade"
            width="420"
            height="420"
            loading="lazy"
            className="aspect-square w-full rounded-full shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            style={{ rotate }}
          />
        </FadeUp>
        <div>
          <h2 className="display-l">
            <Lines lines={[t.craftTitle]} />
          </h2>
          <FadeUp delay={0.1}>
            <p className="measure mt-8 max-w-md text-lg text-bone-dim">{t.craftLead}</p>
          </FadeUp>
          <ol className="mt-14">
            {t.craft.map(([title, text], i) => (
              <FadeUp as="li" key={title} delay={i * 0.08} className="grid gap-3 border-t border-bone/10 py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
                <h3 className="font-display text-2xl font-medium tracking-[-0.01em] md:text-[1.75rem]">{title}</h3>
                <p className="measure text-bone-dim">{text}</p>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
