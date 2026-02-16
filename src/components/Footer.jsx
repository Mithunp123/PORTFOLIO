import { Linkedin, Mail, ArrowUp } from 'lucide-react'
import VisitorCounter from './VisitorCounter'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-dark-500/50 bg-dark-900/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        {/* Brand */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-dark-700">
              <span className="text-xs font-bold text-gradient">MP</span>
            </div>
            <span className="text-sm font-medium text-slate-500">
              &copy; {new Date().getFullYear()} Mithun P. All rights reserved.
            </span>
          </div>
          <VisitorCounter />
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/mithun-p2006/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-400 text-slate-500 transition-all hover:border-accent/30 hover:text-accent-light"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:mithunmithun71548@gmail.com"
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-400 text-slate-500 transition-all hover:border-accent/30 hover:text-accent-light"
          >
            <Mail size={16} />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-dark-400 text-slate-500 transition-all hover:border-accent/30 hover:text-accent-light"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
