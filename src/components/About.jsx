import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Mail, Briefcase, Zap, Tv, Gamepad2, Film, Code2, LayoutDashboard, Sparkles, Target } from 'lucide-react'

const DETAILS = [
  { icon: <MapPin size={15} />, label: 'Location', value: 'Erode, Tamil Nadu' },
  { icon: <Briefcase size={15} />, label: 'Focus', value: 'AI & Data Science' },
  { icon: <Phone size={15} />, label: 'Phone', value: '8122762374' },
  { icon: <Mail size={15} />, label: 'Email', value: 'mithunmithun71548@gmail.com' },
]

const TIMELINE = [
  { year: '2023', event: 'Started B.Tech in AI & Data Science at KSRCT' },
  { year: '2024', event: 'Built Time2Order, Time2Due & Time2Farm platforms' },
  { year: '2025', event: 'Won 2nd Prize — TrueSight AI (Deepfake Detection)' },
  { year: '2026', event: 'Building full-stack apps & exploring advanced AI' },
]

const HOBBIES = [
  { icon: <Tv size={20} />, title: 'Web Series', subtitle: 'Game of Thrones', color: '#ef4444' },
  { icon: <Gamepad2 size={20} />, title: 'Gaming', subtitle: 'Battle Royale Games', color: '#8b5cf6' },
  { icon: <Film size={20} />, title: 'Movies', subtitle: 'English & Tamil Films', color: '#f59e0b' },
]

const LEARNING = [
  { icon: <Code2 size={20} />, title: 'FiveM Development', desc: 'Creating custom game servers & scripts', color: '#22d3ee' },
  { icon: <LayoutDashboard size={20} />, title: 'Battle Royale Panels', desc: 'Building tournament management systems', color: '#10b981' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 sm:py-36">
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
            <span className="text-xs font-semibold tracking-[0.3em] text-accent-light uppercase">About</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold text-white sm:text-4xl">
            The Story So Far
          </h2>
        </motion.div>

        {/* Asymmetric bento layout */}
        <div className="grid gap-5 md:grid-cols-12">
          {/* Large bio card with image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass group relative overflow-hidden rounded-[2rem] md:col-span-8"
          >
            <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:gap-8 sm:p-10">
              {/* Image - unique treatment: clipped diagonal */}
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="relative h-full w-full overflow-hidden rounded-2xl sm:h-48 sm:w-40 group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/Mithun.png"
                    alt="Mithun P"
                    className="h-full w-full object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  {/* Overlay gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-900/80 to-transparent" />
                </div>
                {/* Accent line */}
                <div className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-accent to-cyan" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-accent/15 bg-accent/5 px-3 py-1">
                  <Zap size={12} className="text-accent-light" />
                  <span className="text-[11px] font-semibold tracking-wider text-accent-light uppercase">Who I Am</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  I&apos;m a passionate Data Analytics student pursuing B.Tech in
                  AI & Data Science at K.S. Rangasamy College of Technology. I
                  bridge the gap between data and decisions — from Power BI
                  dashboards to full‑stack web apps.
                </p>
                <p className="mt-3 leading-relaxed text-slate-400">
                  I&apos;ve presented deepfake detection research to Namakkal
                  Cyber Cell, built preorder management systems for local shops,
                  and I&apos;m driven by solving real‑world business problems
                  through code and data.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick info cards - stacked right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-3 md:col-span-4"
          >
            {DETAILS.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass-light group flex items-center gap-3 rounded-2xl px-5 py-4 transition-all hover:border-accent/20"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-light transition-colors group-hover:bg-accent/20">
                  {d.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-wider text-slate-600 uppercase">{d.label}</p>
                  <p className="truncate text-sm font-medium text-white">{d.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline row spanning full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-[2rem] p-8 md:col-span-12"
          >
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-slate-500 uppercase">
              My Journey
            </h3>
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute top-4 left-0 right-0 hidden h-[1px] bg-gradient-to-r from-accent/30 via-cyan/20 to-accent/30 md:block" />
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                {TIMELINE.map((t, i) => (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="relative"
                  >
                    {/* Dot on timeline */}
                    <div className="mb-4 hidden md:block">
                      <div className="relative mx-auto h-3 w-3 rounded-full border-2 border-accent bg-dark-900">
                        <div className="absolute inset-0 animate-ping rounded-full bg-accent/40" style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }} />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-extrabold text-gradient">{t.year}</span>
                      <p className="mt-2 text-sm leading-snug text-slate-400">{t.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hobbies Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-[2rem] p-8 md:col-span-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={14} className="text-accent-light" />
              <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                When I'm Not Coding
              </h3>
            </div>
            <div className="space-y-3">
              {HOBBIES.map((hobby, i) => (
                <motion.div
                  key={hobby.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                  whileHover={{ x: 4 }}
                >
                  <div 
                    className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${hobby.color}15, ${hobby.color}05)`,
                      color: hobby.color,
                      boxShadow: `0 0 20px ${hobby.color}10`,
                    }}
                  >
                    {hobby.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{hobby.title}</p>
                    <p className="text-white font-medium">{hobby.subtitle}</p>
                  </div>
                  <div 
                    className="w-1.5 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: hobby.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Path Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="glass rounded-[2rem] p-8 md:col-span-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Target size={14} className="text-cyan" />
              <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                Currently Exploring
              </h3>
            </div>
            <div className="space-y-4">
              {LEARNING.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.65 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-xl p-5 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Gradient accent line */}
                  <div 
                    className="absolute top-0 left-0 w-full h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                  />
                  
                  <div className="flex items-start gap-4">
                    <div 
                      className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.color}15, transparent)`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-white">{item.title}</p>
                        <span 
                          className="px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-full uppercase"
                          style={{ 
                            background: `${item.color}15`,
                            color: item.color,
                          }}
                        >
                          Learning
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${item.color}08, transparent 70%)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
