import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import VisitorCounter from './VisitorCounter'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/[0.04] bg-dark-900/90">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-dark-800">
                <span className="text-xs font-black bg-gradient-to-br from-accent to-cyan bg-clip-text text-transparent">MP</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white">Mithun P</span>
                <span className="block text-[10px] text-slate-600 font-mono">AI & Data Science</span>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Mithun P. Crafted with React & Tailwind CSS.
            </p>
          </div>

          {/* Center - Visitor counter */}
          <VisitorCounter />

          {/* Social + Back to top */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={16} />, href: 'https://github.com/mithun-p', label: 'GitHub' },
              { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/mithun-p2006/', label: 'LinkedIn' },
              { icon: <Mail size={16} />, href: 'mailto:mithunmithun71548@gmail.com', label: 'Email' },
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-slate-600 transition-all hover:border-accent/30 hover:text-accent-light hover:bg-accent/5"
              >
                {social.icon}
              </a>
            ))}
            <div className="w-px h-5 bg-white/[0.06] mx-1" />
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-slate-600 transition-all hover:border-accent/30 hover:text-accent-light hover:bg-accent/5"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
