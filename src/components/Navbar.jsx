import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      // Track active section
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-dark-900/70 border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="group relative flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-dark-800/80 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            <span className="text-sm font-black bg-gradient-to-br from-accent to-cyan bg-clip-text text-transparent">MP</span>
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-accent/20 via-transparent to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-bold tracking-tight text-white">
              Mithun<span className="text-accent">.</span>
            </span>
            <span className="block text-[10px] font-mono text-slate-600 tracking-wider">AI & DATA SCIENCE</span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-gradient-to-r from-accent to-cyan"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
          <li className="ml-3">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-5 py-2 text-[13px] font-semibold text-white transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-cyan opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-cyan opacity-0 group-hover:opacity-100 blur-lg transition-opacity" />
              <span className="relative">Let&apos;s Talk</span>
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all hover:border-white/20 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-1 bg-dark-900/95 backdrop-blur-2xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`group flex items-center gap-4 rounded-xl px-8 py-4 text-3xl font-bold transition-colors ${
                  activeSection === link.href.slice(1) ? 'text-white' : 'text-slate-600 hover:text-white'
                }`}
              >
                <span className="font-mono text-xs text-accent/60">0{i + 1}</span>
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.07 + 0.1 }}
              className="mt-8 rounded-xl bg-gradient-to-r from-accent to-cyan px-10 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
