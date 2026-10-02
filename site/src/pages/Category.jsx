import { motion } from 'motion/react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ProductDialog from '../components/ProductDialog.jsx'
import { Arrow, FadeUp, GoLink, Lines, PAGE_DELAY } from '../components/ui.jsx'
import { ease } from '../lib/config.js'
import { useI18n } from '../lib/i18n.jsx'
import { byCat, categories } from '../lib/products.js'

export default function Category() {
  const { id } = useParams()
  const { t, lang } = useI18n()
  const [open, setOpen] = useState(null)
  const cat = categories.find((c) => c.id === id)
  if (!cat) return <Navigate to="/" replace />
  const list = byCat(id)
  const others = categories.filter((c) => c.id !== id)

  return (
    <>
      <section className="px-6 pb-16 pt-40 md:px-14 md:pb-24 md:pt-56">
        <h1 className="display-xl">
          <Lines lines={[t.nav[id]]} onMount delay={PAGE_DELAY} />
        </h1>
        <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.p
            className="measure max-w-lg text-lg text-bone-dim"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: PAGE_DELAY + 0.35, ease: ease.out }}
          >
            {t.catDesc[id]}
          </motion.p>
          <motion.p className="caps tabular text-bone-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: PAGE_DELAY + 0.5 }}>
            {t.pieces(list.length)}
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-14 md:pb-40">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {list.map((p, i) => (
            <FadeUp key={p.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <button type="button" onClick={() => setOpen(p)} className="group press block w-full cursor-pointer text-left">
                <div className="rounded-[18px] bg-bone/[0.04] p-1 ring-1 ring-bone/10">
                  <div className="overflow-hidden rounded-[14px] bg-ink-3">
                    <img src={p.images[0]} alt={p.name[lang]} loading="lazy" className="block h-auto w-full transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out-strong)] md:group-hover:scale-[1.04]" />
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 px-1">
                  <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">{p.name[lang]}</h2>
                  {p.images.length > 1 && <span className="caps tabular shrink-0 text-bone-dim">{p.images.length}</span>}
                </div>
                <p className="mt-1 px-1 text-sm text-bone-dim">{p.material[lang]}</p>
              </button>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="border-t border-bone/10 px-6 py-24 md:px-14 md:py-32">
        <FadeUp><h2 className="display-m mb-12 text-bone-dim">{t.otherCollections}</h2></FadeUp>
        <ul className="grid gap-x-10 md:grid-cols-2">
          {others.map((c, i) => (
            <FadeUp as="li" key={c.id} delay={i * 0.06} className="border-b border-bone/10">
              <GoLink to={`/kolleksiya/${c.id}`} label={t.nav[c.id]} className="group flex items-center justify-between py-7 text-bone no-underline">
                <span className="display-m transition-transform duration-500 [transition-timing-function:var(--ease-out-strong)] md:group-hover:translate-x-2">{t.nav[c.id]}</span>
                <Arrow size={20} className="text-brass transition-transform duration-500 [transition-timing-function:var(--ease-out-strong)] md:group-hover:translate-x-1 md:group-hover:-translate-y-0.5" />
              </GoLink>
            </FadeUp>
          ))}
        </ul>
      </section>
      <ProductDialog product={open} onClose={() => setOpen(null)} />
    </>
  )
}
