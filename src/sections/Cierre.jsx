import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import Fit from '../components/Fit.jsx'

export default function Cierre() {
  const [showCredit, setShowCredit] = useState(false)

  return (
    <footer id="visita" className="px-5 pb-8 pt-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs uppercase tracking-[.4em] text-accent">Te guardamos una mesa</p>
        <Fit as="h2" className="font-display font-light lowercase" max={420}>ritual café</Fit>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 text-lg md:flex-row md:justify-between">
          <p className="flex items-center gap-3"><MapPin size={18} className="text-accent" />Calle 21 de Calacoto, zona sur · La Paz</p>
          <p className="flex items-center gap-3"><Clock size={18} className="text-accent" />Lun–Sáb 8:00–21:00 · Dom 9:00–18:00</p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="m-0 text-xs opacity-60">© 2026 Ritual Café</p>

          <div
            className="relative"
            onMouseEnter={() => setShowCredit(true)}
            onMouseLeave={() => setShowCredit(false)}
            onFocus={() => setShowCredit(true)}
            onBlur={() => setShowCredit(false)}
          >
            {/* El contenedor recorta el texto para que "suba" desde abajo al aparecer */}
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 overflow-hidden whitespace-nowrap">
              <span
                className={
                  'block font-display text-[1.58rem] tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
                  (showCredit ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0')
                }
              >
                Ursu<span className="text-accent">Studio</span>
              </span>
            </div>

            <a
              href="https://ursustudio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-line px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] transition-all duration-300"
            >
              Créditos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
