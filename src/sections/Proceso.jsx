import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Img from '../components/Img.jsx'
import Fit from '../components/Fit.jsx'

const steps = [
  ['01', 'cosecha', 'Solo cereza madura, recogida a mano entre mayo y agosto. Se separa el mismo día.', '/img/proceso-cosecha.webp'],
  ['02', 'tostado', 'Tostamos en lotes de 5 kg, cada semana. Tueste medio, para dulzor de panela y cacao.', '/img/proceso-tostado.webp'],
  ['03', 'taza', 'Molido al momento, 93 °C, 28 segundos. Lo que llega a tu mesa tiene menos de 15 días.', '/img/proceso-taza.webp'],
]

export default function Proceso() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Scroll horizontal: el carril mide 3 pantallas (300vw) y se desplaza 2 de 3 (-66.666% de su ancho)
  // mientras la sección, alta y con la vista fija (sticky), se recorre en vertical.
  const x = useTransform(p, [0, 1], ['0%', '-66.666%'])

  return (
    <section id="proceso" ref={ref} className="relative h-[400vh] bg-soft">
      <div className="sticky top-0 h-screen overflow-hidden">
        <svg className="absolute left-0 top-[88px] h-4 w-full text-accent" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
          <motion.path d="M0 5 Q 12 0 25 5 T 50 5 T 75 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: p }} />
        </svg>
        {/* willChange: el carril se mueve en cada frame de scroll; en su propia capa no se repinta. */}
        <motion.div style={{ x, willChange: 'transform' }} className="flex h-full w-[300vw]">
          {steps.map(([n, title, text, src]) => (
            <div key={n} className="grid h-full w-screen grid-cols-1 gap-5 px-5 pb-8 pt-28 md:grid-cols-2 md:gap-14 md:px-12">
              <div className="flex min-h-0 flex-col justify-center gap-4">
                <span className="text-sm tracking-[.3em] text-accent">{n} / 03</span>
                <Fit className="font-display font-light lowercase" max={200}>{title}</Fit>
                <p className="max-w-md text-base md:text-xl">{text}</p>
              </div>
              <Img src={src} alt={'Proceso: ' + title} className="h-full min-h-0 w-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
