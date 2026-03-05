import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, Phone, MapPin, Linkedin, CheckCircle, ArrowUpRight, MessageSquare } from 'lucide-react'

const CONTACT_METHODS = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'mithunmithun71548@gmail.com',
    href: 'mailto:mithunmithun71548@gmail.com',
    color: '#6366f1',
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '+91 8122762374',
    href: 'tel:8122762374',
    color: '#22d3ee',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516-.173-.009-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487 2.082.899 2.503.719 2.949.676.446-.043 1.432-.586 1.633-1.151.202-.566.202-1.052.141-1.152z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: 'Message Me',
    href: 'https://wa.me/918122762374',
    color: '#25d366',
  },
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: 'mithun-p2006',
    href: 'https://www.linkedin.com/in/mithun-p2006/',
    color: '#0077b5',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="relative py-32 sm:py-40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* CTA Header — like Ram Maheshwari */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2 mb-8"
          >
            <MessageSquare size={14} className="text-accent-light" />
            <span className="text-xs font-bold tracking-wider text-accent-light uppercase">Get in Touch</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-6">
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-emerald-400">
              Great Together.
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have a project idea, need a developer, or just want to connect?
            I&apos;m always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {CONTACT_METHODS.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
                style={{ display: 'flex' }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: `${method.color}12`, color: method.color }}
                >
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold tracking-wider text-slate-600 uppercase">{method.label}</p>
                  <p className="text-sm font-medium text-white truncate group-hover:text-accent-light transition-colors">{method.value}</p>
                </div>
                <ArrowUpRight size={16} className="text-slate-700 group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            ))}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-slate-600 uppercase">Location</p>
                <p className="text-sm font-medium text-white">Erode, Tamil Nadu, India</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-8 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">Name</label>
                  <input
                    id="name" type="text" required
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none transition-all focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">Email</label>
                  <input
                    id="email" type="email" required
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none transition-all focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">Subject</label>
                <input
                  id="subject" type="text" required
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none transition-all focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                  placeholder="What's this about?"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">Message</label>
                <textarea
                  id="message" rows={5} required
                  className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-slate-700 outline-none transition-all focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="mt-6 group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-sm font-bold text-white transition-all disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-cyan opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-cyan opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                {submitted ? (
                  <span className="relative flex items-center gap-2">
                    <CheckCircle size={16} /> Message Sent!
                  </span>
                ) : (
                  <span className="relative flex items-center gap-2">
                    <Send size={16} /> Send Message
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
