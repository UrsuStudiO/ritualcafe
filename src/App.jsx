import { useEffect } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import Navbar from './components/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Origen from './sections/Origen.jsx'
import Proceso from './sections/Proceso.jsx'
import Barra from './sections/Barra.jsx'
import Espacio from './sections/Espacio.jsx'
import Cierre from './sections/Cierre.jsx'

export default function App() {
  // Scroll suave con Lenis; no se activa si la persona prefiere movimiento reducido.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.085 })
    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="top">
        <Hero />
        <Origen />
        <Proceso />
        <Barra />
        <Espacio />
        <Cierre />
      </main>
    </MotionConfig>
  )
}
