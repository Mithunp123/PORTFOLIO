import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { MapPin, Briefcase, Zap, ArrowUpRight, Code2, LayoutDashboard, Target } from 'lucide-react'

// Animated counter component
function Counter({ from = 0, to, suffix = '', duration = 2, inView }) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, v => Math.round(v))
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: 'easeOut' })
      const unsub = rounded.on('change', v => setDisplay(v))
      return () => { controls.stop(); unsub() }
    }
  }, [inView, count, rounded, to, duration])

  return <>{display}{suffix}</>
}

const IMPACT_STATS = [
  { value: 12, suffix: '+', label: 'Projects Built', color: '#6366f1' },
  { value: 3, suffix: '+', label: 'Years Coding', color: '#22d3ee' },
  { value: 15, suffix: '', label: 'Technologies', color: '#a78bfa' },
  { value: 5, suffix: '+', label: 'Live Products', color: '#10b981' },
]

const SERVICES = [
  {
    icon: <Code2 size={24} />,
    title: 'Full-Stack Development',
    desc: 'End-to-end web applications with Python, Flask, React, and modern databases.',
    color: '#6366f1',
  },
  {
    icon: <LayoutDashboard size={24} />,
    title: 'Data Analytics & BI',
    desc: 'Transform raw data into actionable insights with Power BI dashboards and SQL analytics.',
    color: '#22d3ee',
  },
  {
    icon: <Target size={24} />,
    title: 'AI & Machine Learning',
    desc: 'Intelligent systems from deepfake detection to emotion analysis using trained models.',
    color: '#a78bfa',
  },
]

const TIMELINE = [
  { year: '2023', event: 'Started B.Tech in AI & Data Science at KSRCT' },
  { year: '2024', event: 'Built Time2Order, Time2Due & Time2Farm — live products' },
  { year: '2025', event: 'Won 2nd Prize — TrueSight AI • Completed AI/ML Internship' },
  { year: '2026', event: 'Building advanced AI apps & exploring new frontiers' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-accent" />
            <span className="text-accent font-mono tracking-widest uppercase text-xs">About Me</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-6">
            Turning Data Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-purple-400">
              Impact.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            I&apos;m a B.Tech AI & Data Science student at KSRCT who builds things that matter —
            from <strong className="text-white">real-time bus tracking</strong> to <strong className="text-white">deepfake detection</strong> for
            cyber police. I ship products, not just projects.
          </p>
        </motion.div>

        {/* Impact Stats — Big numbers like Ram Maheshwari */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8 text-center transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${stat.color}08, transparent 70%)` }}
              />
              <p className="text-5xl md:text-6xl font-black mb-2 relative" style={{ color: stat.color }}>
                <Counter from={0} to={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="text-xs font-mono text-slate-600 tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content: Bio + Image */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5 mb-6">
              <Zap size={12} className="text-accent-light" />
              <span className="text-[11px] font-bold tracking-wider text-accent-light uppercase">Who I Am</span>
            </div>

            <p className="text-lg leading-relaxed text-slate-400 mb-6">
              I&apos;m <strong className="text-white">Mithun P</strong>, a passionate Data Analytics student
              from <strong className="text-white">Erode, Tamil Nadu</strong>. I bridge the gap between
              data and decisions — from Power BI dashboards to full‑stack web apps.
            </p>
            <p className="text-lg leading-relaxed text-slate-400 mb-8">
              I&apos;ve presented deepfake detection research to the <strong className="text-white">Namakkal
              Cyber Cell</strong>, built preorder management systems for local shops, and created
              AI-powered farm finance tools. Every project I build solves a real problem.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: <MapPin size={14} />, text: 'Erode, Tamil Nadu' },
                { icon: <Briefcase size={14} />, text: 'AI & Data Science' },
              ].map(tag => (
                <span
                  key={tag.text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-slate-400"
                >
                  <span className="text-accent-light">{tag.icon}</span>
                  {tag.text}
                </span>
              ))}
            </div>

            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors"
            >
              <span>Download Resume</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>

          {/* Right: Profile image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative group">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-cyan/15 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="/Mithun.png"
                  alt="Mithun P"
                  className="w-full max-w-md h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-dark-800/90 backdrop-blur-xl px-5 py-3 shadow-xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-sm font-bold text-emerald-300">Available for Work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* What I Do — Services section like Matt Farley */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-24"
        >
          <h3 className="text-2xl font-bold text-white mb-10">What I Do</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${service.color}12`, color: service.color }}
                >
                  {service.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{service.title}</h4>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-10">My Journey</h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-cyan/20 to-transparent" />

            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-[14px] h-[14px] rounded-full border-[3px] border-accent/60 bg-dark-900 relative z-10" />
                    {i === TIMELINE.length - 1 && (
                      <div className="absolute inset-0 w-[14px] h-[14px] rounded-full bg-accent/30 animate-ping" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-mono font-bold text-accent">{t.year}</span>
                    <p className="text-slate-400 mt-1 leading-relaxed">{t.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
