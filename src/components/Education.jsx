import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="relative py-28 sm:py-36 bg-dark-900">
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
            <span className="text-xs font-semibold tracking-[0.3em] text-accent-light uppercase">Academic</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold text-white sm:text-4xl">
            Education
          </h2>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-dark-700/60 border border-white/[0.08]">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-accent/10 to-transparent" />

            <div className="relative">
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-cyan text-white shadow-lg">
                <GraduationCap size={26} />
              </div>

              {/* Degree */}
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                B.Tech in Artificial Intelligence &amp; Data Science
              </h3>

              {/* College */}
              <p className="mt-2 text-base font-medium text-accent-light">
                K.S. Rangasamy College of Technology
              </p>

              {/* Meta info */}
              <div className="mt-5 flex flex-wrap gap-4">
                <span className="flex items-center gap-2 rounded-full border border-dark-400 bg-dark-700/60 px-4 py-2 text-sm text-slate-400">
                  <Calendar size={14} className="text-accent-light" />
                  2023 – 2027
                </span>
                <span className="flex items-center gap-2 rounded-full border border-dark-400 bg-dark-700/60 px-4 py-2 text-sm text-slate-400">
                  <MapPin size={14} className="text-accent-light" />
                  Tamil Nadu, India
                </span>
              </div>

              {/* Highlights */}
              <div className="mt-8 border-t border-dark-400/50 pt-6">
                <h4 className="mb-3 text-sm font-semibold tracking-wider text-slate-500 uppercase">
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {[
                    'Hands-on experience with Power BI, Python, SQL',
                    'Built 7+ real-world projects including AI & full-stack apps',
                    'Presented deepfake detection research to Namakkal Cyber Cell',
                    'Won 2nd Prize for TrueSight AI project',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
