import { motion } from 'motion/react'
import { Arrow, FadeUp, Lines, PAGE_DELAY, PillButton } from '../components/ui.jsx'
import { INSTAGRAM, WHATSAPP, ease, orderLink } from '../lib/config.js'
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
        <PillButton as="a" href={orderLink(t.msgCustom)} target="_blank" rel="noreferrer">
          {WHATSAPP ? t.contactWhatsapp : t.contactInstagram}
        </PillButton>
        <span className="text-bone-dim">{t.contactCity}</span>
      </FadeUp>

      <ul className="mt-20 max-w-2xl border-t border-bone/10">
        <li className="border-b border-bone/10">
          <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-6 text-bone no-underline">
            <span className="display-m">@{INSTAGRAM}</span>
            <Arrow size={20} className="text-brass transition-transform duration-500 [transition-timing-function:var(--ease-out-strong)] md:group-hover:translate-x-1 md:group-hover:-translate-y-0.5" />
          </a>
        </li>
      </ul>
    </section>
  )
}
