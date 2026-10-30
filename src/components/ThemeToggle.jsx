import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const ref = useRef(null)
  // El tema inicial ya lo dejó puesto el script del <head> en index.html.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    const apply = () => {
      document.documentElement.classList.toggle('dark', next)
      try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch { /* almacenamiento bloqueado: se ignora */ }
      setDark(next)
    }

    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply()

    // Círculo que se expande desde el botón hasta cubrir la pantalla.
    const r = ref.current.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    // flushSync: el DOM debe quedar actualizado dentro del callback para que la captura "nueva" sea correcta.
    document.startViewTransition(() => flushSync(apply)).ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }
      )
    ).catch(() => {}) // la transición puede cancelarse (pestaña oculta, doble clic): el tema ya se aplicó
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label="Cambiar tema"
      className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:text-accent"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
