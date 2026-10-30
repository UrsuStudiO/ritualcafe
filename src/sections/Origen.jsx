import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import Img from '../components/Img.jsx'
import Fit from '../components/Fit.jsx'

const words = 'Nuestro grano nace en Caranavi, entre neblina y pendientes de los Yungas. Lo cosechan a mano familias que conocemos por nombre, y llega a La Paz todavía con olor a monte.'.split(' ')

const format = (n) => Math.round(n).toLocaleString('es-BO')

// Cada palabra se ilumina en su tramo del scroll (de 0.1 a 0.7 del progreso total).
function Word({ word, index, progress, reduced }) {
  const start = (index / words.length) * 0.6 + 0.1
  const opacity = useTransform(progress, [start, start + 0.1], [0.15, 1])
  return <motion.span style={{ opacity: reduced ? 1 : opacity }}>{word} </motion.span>
}

function Count({ to, progress, suffix, label, reduced }) {
  const number = useRef(null)
  const value = useTransform(progress, [0.3, 0.85], [0, to])
  // Se escribe directo en el DOM: un setState por frame de scroll re-renderizaba el componente sin necesidad.
  useMotionValueEvent(value, 'change', (x) => {
    if (!reduced && number.current) number.current.textContent = format(x)
  })
  return (
    <div>
      <div className="font-display text-4xl md:text-6xl">
        <span ref={number}>{format(reduced ? to : 0)}</span>
        <span className="ml-1 text-xl text-accent md:text-2xl">{suffix}</span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-widest opacity-70">{label}</div>
    </div>
  )
}

export default function Origen() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const clip = useTransform(p, [0, 0.4], ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'])

  return (
    <section id="origen" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 grid h-screen grid-cols-1 gap-6 px-5 pb-8 pt-24 md:grid-cols-2 md:gap-14 md:px-12">
        <motion.div style={{ clipPath: reduced ? 'inset(0%)' : clip }} className="min-h-0">
          <Img src="/img/origen.webp" alt="Cafetales de Caranavi, Yungas" className="h-full w-full" />
        </motion.div>
        <div className="flex min-h-0 flex-col justify-center gap-6">
          <Fit className="font-display font-light lowercase" max={110}>de caranavi</Fit>
          <p className="font-display text-xl leading-snug md:text-3xl">
            {words.map((w, i) => <Word key={i} word={w} index={i} progress={p} reduced={reduced} />)}
          </p>
          <div className="grid grid-cols-3 gap-3 border-t border-line pt-5">
            <Count to={1650} progress={p} suffix="m" label="de altura" reduced={reduced} />
            <Count to={14} progress={p} suffix="" label="familias" reduced={reduced} />
            <Count to={38} progress={p} suffix="días" label="de secado" reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  )
}
