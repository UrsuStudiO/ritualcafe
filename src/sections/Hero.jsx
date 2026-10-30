import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Fit from '../components/Fit.jsx'
import Img from '../components/Img.jsx'

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Línea de tiempo (p = 0..1): la foto pasa de arco central a pantalla completa (0–0.75),
  // el título sube y se desvanece (0.1–0.45) y la frase final aparece (0.7–0.95).
  const clip = useTransform(p, [0, 0.75], ['inset(34% 33% 0% 33% round 999px 999px 0px 0px)', 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)'])
  const scale = useTransform(p, [0, 1], [1.25, 1])
  const titleY = useTransform(p, [0, 0.5], ['0%', '-60%'])
  const titleOpacity = useTransform(p, [0.1, 0.45], [1, 0])
  const tagline = useTransform(p, [0.7, 0.95], [0, 1])

  // Con movimiento reducido no hay animación: foto completa, título y frase visibles a la vez.
  return (
    <section ref={ref} className={'relative ' + (reduced ? 'h-screen' : 'h-[260vh]')}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ clipPath: reduced ? 'inset(0%)' : clip, scale: reduced ? 1 : scale }} className="absolute inset-0">
          <Img src="/img/hero.webp" alt="Barra de Ritual Café al atardecer" className="h-full w-full" priority />
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
        <motion.div
          style={{ y: reduced ? 0 : titleY, opacity: reduced ? 1 : titleOpacity }}
          className={'absolute inset-x-0 top-24 px-5 ' + (reduced ? 'text-[#F0E4D0]' : '')}
        >
          <p className="mb-3 text-center text-xs uppercase tracking-[.4em]">Café de especialidad · La Paz</p>
          <Fit as="h1" className="font-display font-light lowercase" max={420}>ritual</Fit>
        </motion.div>
        <motion.p
          style={{ opacity: reduced ? 1 : tagline }}
          className="absolute inset-x-5 bottom-16 text-center font-display text-3xl italic text-[#F0E4D0] md:text-6xl"
        >
          el ritual de quedarse.
        </motion.p>
      </div>
    </section>
  )
}
