import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const CATEGORIES = [
  {
    title: 'Languages',
    color: '#6366f1',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 90 },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 88 },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 75 },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 85 },
      { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', level: 90 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    color: '#22d3ee',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 85 },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', level: 80 },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', level: 85 },
      { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', level: 70 },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#a78bfa',
    skills: [
      { name: 'Power BI', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', level: 80 },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 80 },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', level: 82 },
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', level: 70 },
      { name: 'REST APIs', icon: 'https://cdn-icons-png.flaticon.com/512/2164/2164832.png', level: 82 },
    ],
  },
]

function SkillBar({ skill, index, inView, categoryColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group flex items-center gap-4 py-3"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.06]">
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            {skill.name}
          </span>
          <span className="text-[11px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
            {skill.level}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ delay: index * 0.06 + 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}99)`,
              boxShadow: `0 0 12px ${categoryColor}30`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredCat, setHoveredCat] = useState(null)

  return (
    <section id="skills" className="relative py-32 sm:py-40 overflow-hidden">
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
            <div className="h-[2px] w-12 bg-cyan" />
            <span className="text-cyan font-mono tracking-widest uppercase text-xs">Tech Stack</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-6">
            Technologies{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-accent to-purple-400">
              I Work With.
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            A curated stack of tools I use to build <strong className="text-slate-400">modern, scalable applications</strong> — from data analytics to full-stack development.
          </p>
        </motion.div>

        {/* Skills by category */}
        <div className="grid md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.15 }}
              onMouseEnter={() => setHoveredCat(ci)}
              onMouseLeave={() => setHoveredCat(null)}
              className="relative rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8 transition-all duration-500 hover:border-white/10"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${cat.color}08, transparent 60%)`,
                  opacity: hoveredCat === ci ? 1 : 0,
                }}
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}40` }}
                />
                <h3 className="text-sm font-bold text-white tracking-wider uppercase">{cat.title}</h3>
              </div>

              {/* Skill bars */}
              <div>
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={ci * 5 + si}
                    inView={inView}
                    categoryColor={cat.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-12 pt-12 border-t border-white/[0.04]"
        >
          {[
            { label: 'Total Tools', value: CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0), color: '#6366f1' },
            { label: 'Avg Proficiency', value: `${Math.round(CATEGORIES.flatMap(c => c.skills).reduce((s, sk) => s + sk.level, 0) / CATEGORIES.flatMap(c => c.skills).length)}%`, color: '#22d3ee' },
            { label: 'Experience', value: '3+ yrs', color: '#10b981' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px] text-slate-600 font-mono tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
