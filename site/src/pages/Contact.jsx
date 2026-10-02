import { motion } from 'motion/react'
import { FadeUp, Lines, PAGE_DELAY, SocialLinks } from '../components/ui.jsx'
import { ease } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'

export default function Contact() {
  const { t } = useI18n()
  return (
    <section className="flex min-h-[100dvh] flex-col justify-center px-6 pb-24 pt-40 md:px-14">
      <h1 className="display-xl">
        <Lines lines={t.contactTitle} onMount delay={PAGE_DELAY} />
      </h1>
      <motion.p
        className="measure mt-10 max-w-lg text-lg text-bone-dim"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: PAGE_DELAY + 0.4, ease: ease.out }}
      >
        {t.contactText}
      </motion.p>

      <FadeUp delay={0.1} className="mt-14 flex flex-wrap items-center gap-6">
        <SocialLinks size="lg" />
        <span className="text-bone-dim">{t.contactCity}</span>
      </FadeUp>
    </section>
  )
}
