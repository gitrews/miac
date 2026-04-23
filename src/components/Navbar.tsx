import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/patient', label: 'Пациент' },
  { path: '/registrar', label: 'Регистратор' },
  { path: '/doctor', label: 'Врач' },
  { path: '/integration', label: 'Интеграция' },
  { path: '/flow', label: 'Процесс' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 h-[72px] flex items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-2.5">
        <img src="/images/yamal-checkup-logo.svg" alt="Logo" className="h-8 w-auto object-contain" />
        <span className="font-display text-xl font-bold text-[#1A2B3C] hidden sm:block">
          Ямальский чек-ап
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-sm font-medium text-[#4A5568] hover:text-[#1A2B3C] transition-colors"
            >
              {link.label}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2EC4B6] rounded-full" />
              )}
            </Link>
          )
        })}
      </div>

      <button
        className="lg:hidden ml-auto p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-black/5 shadow-lg lg:hidden">
          <div className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-[#2EC4B6] bg-[#2EC4B6]/5' : 'text-[#4A5568] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
