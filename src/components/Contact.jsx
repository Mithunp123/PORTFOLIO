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
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516-.173-.009-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487 2.082.899 2.503.719 2.949.676.446-.043 1.432-.586 1.633-1.151.202-.566.202-1.052.141-1.152z" />
                  </svg>
                ),
                label: 'WhatsApp',
                value: 'Message Me',
                href: 'https://wa.me/918122762374',
              },
              {
                icon: <MapPin size={18} />,
                label: 'Location',
                value: 'Erode, Tamil Nadu',
                href: null,
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                ),
                label: 'Discord',
                value: 'Join My Discord',
                href: 'https://discordapp.com/users/944594954313932841',
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
