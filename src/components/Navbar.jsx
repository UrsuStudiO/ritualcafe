import ThemeToggle from './ThemeToggle.jsx'

const links = [['Origen', '#origen'], ['Proceso', '#proceso'], ['Barra', '#barra'], ['Visítanos', '#visita']]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="font-display text-xl italic">ritual café</a>
        <div className="flex items-center gap-6 text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hidden transition hover:text-accent md:block">{label}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
