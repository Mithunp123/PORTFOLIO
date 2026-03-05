import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Trophy } from 'lucide-react'

const CERTIFICATIONS = [
  { title: 'AI & Machine Learning Internship', org: 'Virtual • 10 weeks', period: 'Apr–Jun 2025' },
]

const HIGHLIGHTS = [
  { icon: <Trophy size={16} />, text: 'Won 2nd Prize for TrueSight AI — Deepfake Detection' },
  { icon: <Award size={16} />, text: 'Presented research to Namakkal Cyber Cell' },
  { icon: <BookOpen size={16} />, text: 'Built 12+ real-world projects across AI, IoT, and Web' },
  { icon: <Trophy size={16} />, text: 'Participated in SIH and multiple national hackathons' },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="relative py-32 sm:py-40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-purple-400" />
            <span className="text-purple-400 font-mono tracking-widest uppercase text-xs">Education</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white">
            Academic{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent">
              Background.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main education card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 relative rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden"
          >
            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-accent via-purple-400 to-cyan" />

            <div className="p-8 md:p-10">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white shadow-lg shadow-accent/20">
                  <GraduationCap size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    B.Tech in Artificial Intelligence & Data Science
                  </h3>
                  <p className="text-accent-light font-medium text-lg">
                    K.S. Rangasamy College of Technology
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-slate-400">
                  <Calendar size={14} className="text-accent-light" />
                  2023 – 2027
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-slate-400">
                  <MapPin size={14} className="text-accent-light" />
                  Tamil Nadu, India
                </span>
              </div>

              <p className="text-slate-400 leading-relaxed mb-8">
                Focused on machine learning, data preprocessing, model training, evaluation &
                optimization. Hands-on with Python, SQL, Power BI, and building full-stack applications
                that solve real business problems.
              </p>

              {/* Certification */}
              <div className="border-t border-white/[0.04] pt-6">
                <h4 className="text-xs font-bold tracking-wider text-slate-600 uppercase mb-4">Certifications</h4>
                {CERTIFICATIONS.map(cert => (
                  <div key={cert.title} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div>
                      <p className="text-sm font-medium text-white">{cert.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{cert.org}</p>
                    </div>
                    <span className="text-xs font-mono text-accent-light">{cert.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievements sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-8">
              <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-6 flex items-center gap-2">
                <Award size={16} className="text-yellow-400" />
                Key Achievements
              </h4>

              <div className="space-y-4">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.text}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent-light flex items-center justify-center mt-0.5 group-hover:bg-accent/20 transition-colors">
                      {h.icon}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{h.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-accent/5 to-cyan/5 p-6 text-center"
            >
              <p className="text-4xl font-black text-white mb-1">3+</p>
              <p className="text-xs font-mono text-slate-500 tracking-wider uppercase">Years of Hands-on Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
