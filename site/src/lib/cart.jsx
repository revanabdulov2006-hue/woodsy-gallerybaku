import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { byId } from './products.js'

const Ctx = createContext(null)
const KEY = 'woodsy-cart'

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return raw.filter((i) => byId[i.id] && i.qty > 0)
  } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(0)

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {} }, [items])

  const add = useCallback((id, qty = 1) => {
    setItems((l) => (l.some((i) => i.id === id) ? l.map((i) => (i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i)) : [...l, { id, qty }]))
    setBump((b) => b + 1)
  }, [])
  const setQty = useCallback((id, qty) => setItems((l) => (qty <= 0 ? l.filter((i) => i.id !== id) : l.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i)))), [])
  const remove = useCallback((id) => setItems((l) => l.filter((i) => i.id !== id)), [])

  const value = useMemo(() => ({
    items, add, setQty, remove, open, setOpen, bump,
    count: items.reduce((n, i) => n + i.qty, 0),
    total: items.reduce((n, i) => n + i.qty * byId[i.id].price, 0),
  }), [items, add, setQty, remove, open, bump])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useCart = () => useContext(Ctx)

/** Məhsul şəklini səbət düyməsinə uçuran ilustrasiya */
export function flyToCart(fromEl, src) {
  const target = document.getElementById('cart-button')
  if (!fromEl || !target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const a = fromEl.getBoundingClientRect()
  const b = target.getBoundingClientRect()
  const size = Math.min(a.width, a.height, 180)
  const ghost = document.createElement('img')
  ghost.src = src
  Object.assign(ghost.style, {
    position: 'fixed', zIndex: '90', left: '0', top: '0', width: `${size}px`, height: `${size}px`, objectFit: 'cover',
    borderRadius: '18px', pointerEvents: 'none', boxShadow: '0 20px 60px rgba(0,0,0,.5)', willChange: 'transform',
  })
  document.body.appendChild(ghost)
  const sx = a.left + a.width / 2 - size / 2
  const sy = a.top + a.height / 2 - size / 2
  const dx = b.left + b.width / 2 - size / 2
  const dy = b.top + b.height / 2 - size / 2
  const anim = ghost.animate([
    { transform: `translate(${sx}px, ${sy}px) scale(1)`, opacity: 1, borderRadius: '18px', offset: 0 },
    { transform: `translate(${sx + (dx - sx) * 0.2}px, ${sy - 80}px) scale(0.8)`, opacity: 1, borderRadius: '28px', offset: 0.35, easing: 'cubic-bezier(0.5, 0, 0.9, 0.6)' },
    { transform: `translate(${dx}px, ${dy}px) scale(0.1)`, opacity: 0.3, borderRadius: '50%', offset: 1 },
  ], { duration: 850, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' })
  anim.onfinish = anim.oncancel = () => ghost.remove()
}
