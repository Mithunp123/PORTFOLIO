import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, Phone, MapPin, Linkedin, CheckCircle } from 'lucide-react'

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
    <section id="contact" className="relative py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            <span className="text-xs font-semibold tracking-[0.3em] text-accent-light uppercase">Reach Out</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold text-white sm:text-4xl">
            Contact Me
          </h2>
          <p className="mt-4 text-center text-slate-400">
            Have a question or want to work together? Let&apos;s connect!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            {[
              {
                icon: <Mail size={18} />,
                label: 'Email',
                value: 'mithunmithun71548@gmail.com',
                href: 'mailto:mithunmithun71548@gmail.com',
              },
              {
                icon: <Phone size={18} />,
                label: 'Phone',
                value: '8122762374',
                href: 'tel:8122762374',
              },
              {
                icon: <MapPin size={18} />,
                label: 'Location',
                value: 'Erode, Tamil Nadu',
                href: null,
              },
              {
                icon: <Linkedin size={18} />,
                label: 'LinkedIn',
                value: 'mithun-p2006',
                href: 'https://www.linkedin.com/in/mithun-p2006/',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-light group rounded-2xl p-5 transition-all hover:glow-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-light transition-colors group-hover:bg-accent/20">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="mt-0.5 block truncate text-sm font-medium text-white transition-colors hover:text-accent-light"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-dark-400 bg-dark-700/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-dark-400 bg-dark-700/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  className="w-full rounded-xl border border-dark-400 bg-dark-700/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="What's this about?"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-dark-400 bg-dark-700/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-accent/40 hover:brightness-110 disabled:opacity-60 sm:w-auto"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={16} /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
