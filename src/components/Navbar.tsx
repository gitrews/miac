import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks: Array<{ href?: string; label: string; step?: number }> = [
  { href: '#hero', label: 'Главная' },
  { href: '#process', label: 'Схема' },
  { href: '#timeline', label: 'Этапы' },
  { href: '#roles', label: 'Роли и задачи' },
  { label: 'Интеграция', step: 6 },
]

interface NavbarProps {
  onOpenStep?: (step: number) => void
}

export default function Navbar({ onOpenStep }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[number]) => {
    e.preventDefault()
    setMenuOpen(false)
    if (link.step) {
      onOpenStep?.(link.step)
      return
    }

    if (!link.href) return

    const href = link.href
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <a href="#hero" onClick={(e) => handleClick(e, navLinks[0])} className="flex items-center gap-2.5">
          <img src="./images/yamal-checkup-logo.svg" alt="Logo" className="h-8 w-auto object-contain" />
          <span className="font-display text-xl font-bold text-slate-900">
            Ямальский чек-ап
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href || link.label}
              href={link.href || '#'}
              onClick={(e) => handleClick(e, link)}
              className="relative type-nav text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} className="text-slate-700" /> : <Menu size={22} className="text-slate-700" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/60">
          <div className="container-wide flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href || link.label}
                href={link.href || '#'}
                onClick={(e) => handleClick(e, link)}
                className="type-nav px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
