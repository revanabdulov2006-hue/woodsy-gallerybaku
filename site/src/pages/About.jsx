import { motion } from 'motion/react'
import { Craft } from '../components/Craft.jsx'
import { FadeUp, ImageReveal, Lines, PAGE_DELAY } from '../components/ui.jsx'
import { ease } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'

export default function About() {
  const { t } = useI18n()
  return (
    <>
      <section className="px-6 pb-20 pt-40 md:px-14 md:pb-32 md:pt-56">
        <h1 className="display-xl">
          <Lines lines={t.aboutTitle} onMount delay={PAGE_DELAY} />
        </h1>
        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-24">
          {t.aboutText.map((p, i) => (
            <motion.p
              key={i}
              className="measure text-lg text-bone-dim"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: PAGE_DELAY + 0.4 + i * 0.12, ease: ease.out }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>
      <section className="px-6 md:px-14">
        <div className="grid gap-5 md:grid-cols-[1.3fr_1fr] md:gap-6">
          <ImageReveal src="/img/products/p09.webp" alt={t.madeIn} className="aspect-[4/3] rounded-[16px]" />
          <ImageReveal src="/img/products/p07.webp" delay={0.12} className="aspect-[4/5] rounded-[16px] md:mt-24" />
        </div>
      </section>
      <Craft />
    </>
  )
}
