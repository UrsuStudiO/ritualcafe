import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Img from '../components/Img.jsx'
import Fit from '../components/Fit.jsx'

export default function Espacio() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Parallax: cada foto sube a distinta velocidad. Se anula con movimiento reducido.
  const y1 = useTransform(p, [0, 1], ['6%', '-10%'])
  const y2 = useTransform(p, [0, 1], ['18%', '-18%'])

  return (
    <section ref={ref} className="overflow-hidden bg-soft px-5 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Fit className="font-display font-light lowercase" max={200}>tardes frescas,</Fit>
        <Fit className="font-display font-light italic text-accent lowercase" max={200}>mesa tibia</Fit>
        <div className="mt-14 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1fr_.8fr]">
          <motion.div style={{ y: reduced ? 0 : y1, willChange: 'transform' }}>
            <Img src="/img/espacio-1.webp" alt="Mesas de trabajo junto a la ventana" ratio="3/4" className="w-full" />
          </motion.div>
          <motion.div style={{ y: reduced ? 0 : y2, willChange: 'transform' }}>
            <Img src="/img/espacio-2.webp" alt="Rincón de lectura con luz cálida" ratio="3/4" className="w-full" />
          </motion.div>
          <p className="font-display text-xl leading-snug md:pt-24 md:text-2xl">
            Enchufes en cada mesa, wifi de 200 Mb y música baja. Aquí se escribe la tesis, se cierra el trato o simplemente se espera que pase el frío.
          </p>
        </div>
      </div>
    </section>
  )
}
