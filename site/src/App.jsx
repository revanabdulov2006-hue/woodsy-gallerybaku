import Lenis from 'lenis'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CartDrawer from './components/CartDrawer.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import { useI18n } from './lib/i18n.jsx'
import { setLenis } from './lib/scroll.js'
import About from './pages/About.jsx'
import Category from './pages/Category.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import { GoLink } from './components/ui.jsx'

function NotFound() {
  const { t } = useI18n()
  return (
    <section className="grid min-h-[100dvh] place-items-center px-6 text-center">
      <div>
        <h1 className="display-l">{t.notFound}</h1>
        <GoLink to="/" label="Woodsy Gallery" className="draw mt-8 inline-block text-bone no-underline">{t.home}</GoLink>
      </div>
    </section>
  )
}

export default function App() {
  const { t } = useI18n()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: (x) => 1 - Math.pow(1 - x, 4), smoothWheel: true })
    setLenis(lenis)
    let raf
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null) }
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-ink">{t.skip}</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kolleksiya/:id" element={<Category />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
