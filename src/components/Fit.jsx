import { useLayoutEffect, useRef } from 'react'

const MIN_SIZE = 14

// Ajusta el font-size para que el texto ocupe justo el ancho disponible y nunca se desborde.
// Mide con un tamaño de referencia de 100px y escala de forma proporcional (máximo `max`).
export default function Fit({ children, as: T = 'h2', max = 260, className = '' }) {
  const box = useRef(null)
  const el = useRef(null)

  useLayoutEffect(() => {
    const b = box.current
    const e = el.current
    if (!b || !e) return

    let lastWidth = 0
    const run = (force) => {
      const available = b.clientWidth
      // Solo el ancho importa: evita medir de nuevo (reflow) cuando cambia únicamente la altura.
      if (!force && available === lastWidth) return
      lastWidth = available
      e.style.fontSize = '100px'
      const natural = e.scrollWidth
      if (!natural || !available) return
      e.style.fontSize = Math.max(MIN_SIZE, Math.min(max, (100 * available) / natural)) + 'px'
    }

    run(true)
    const ro = new ResizeObserver(() => run(false))
    ro.observe(b)
    // La tipografía web cambia el ancho natural del texto: hay que medir otra vez al cargarla.
    document.fonts?.ready.then(() => run(true))
    return () => ro.disconnect()
  }, [children, max])

  return (
    <div ref={box} className="w-full overflow-hidden">
      <T ref={el} className={'inline-block whitespace-nowrap leading-[.95] ' + className}>
        {children}
      </T>
    </div>
  )
}
