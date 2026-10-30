import { motion } from 'motion/react'
import Img from '../components/Img.jsx'
import Fit from '../components/Fit.jsx'

const ease = [0.22, 1, 0.36, 1]

const items = [
  ['Flat white Caranavi', 'doble espresso, leche cremada', 22],
  ['Espresso tónica', 'cáscara de naranja, hielo claro', 28],
  ['Cold brew cítrico', '18 h en frío, mandarina de Yungas', 26],
  ['Latte de canela y miel', 'miel de Sorata, canela molida', 25],
  ['Brownie de cacao beniano', 'sin harina, sal de Uyuni', 20],
  ['Cuñapé caliente', 'queso criollo, horneado al día', 12],
]

export default function Barra() {
  return (
    <section id="barra" className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-28 md:grid-cols-[1.2fr_1fr] md:px-12">
      <div>
        <Fit className="mb-10 font-display font-light lowercase" max={170}>la barra</Fit>
        {items.map(([name, desc, price], i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.05, ease }}
            className="group relative flex items-baseline justify-between gap-4 py-5"
          >
            <div>
              <h3 className="font-display text-2xl transition group-hover:text-accent group-hover:italic md:text-4xl">{name}</h3>
              <p className="text-sm opacity-70">{desc}</p>
            </div>
            <span className="font-display text-xl md:text-2xl">Bs {price}</span>
            {/* Línea divisoria que se dibuja de izquierda a derecha */}
            <motion.i
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-line"
            />
          </motion.div>
        ))}
      </div>
      <div className="md:sticky md:top-28 md:self-start">
        <Img src="/img/barra.webp" alt="Bebida de autor sobre la barra" ratio="4/5" className="w-full" />
      </div>
    </section>
  )
}
