import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Terminal } from 'lucide-react'

const TECH_STACK = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB', level: 90 },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB', level: 85 },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E', level: 88 },
  { name: 'Power BI', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', color: '#F2C811', level: 80 },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#00758F', level: 85 },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#007396', level: 75 },
  { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26', level: 90 },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#38BDF8', level: 85 },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032', level: 80 },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#ffffff', level: 82 },
  { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', color: '#ffffff', level: 80 },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', color: '#ffffff', level: 70 },
  { name: 'REST API', icon: 'https://cdn-icons-png.flaticon.com/512/2164/2164832.png', color: '#06b6d4', level: 82 },
  { name: 'Twilio', icon: 'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254468/twilio-icon-icon-md.png', color: '#F22F46', level: 65 },
  { name: 'Supabase', icon: 'https://img.icons8.com/fluent/1200/supabase.jpg', color: '#3ECF8E', level: 70 },
]

function TechCard({ tech, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div className="relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] overflow-hidden">
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div 
          className="relative w-20 h-20 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${tech.color}10, transparent)`,
          }}
        >
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-12 h-12 object-contain transition-all duration-300"
            style={{
              filter: 'grayscale(70%) brightness(0.8)',
            }}
            onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) brightness(1.1)'}
            onMouseLeave={(e) => e.target.style.filter = 'grayscale(70%) brightness(0.8)'}
          />
        </div>

        {/* Tech name */}
        <div className="text-center relative z-10">
          <h4 className="text-sm font-bold text-white/80 mb-2 group-hover:text-white transition-colors duration-300">
            {tech.name}
          </h4>
          
          {/* Proficiency bar */}
          <div className="flex items-center gap-2 justify-center">
            <div className="h-1.5 w-20 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${tech.level}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
                style={{
                  background: `linear-gradient(90deg, ${tech.color}, ${tech.color}CC)`,
                  boxShadow: `0 0 10px ${tech.color}40`,
                }}
              />
            </div>
            <span 
              className="text-[10px] font-mono font-bold text-white/30 group-hover:text-white/60 transition-colors duration-300"
            >
              {tech.level}%
            </span>
          </div>
        </div>

        {/* Corner accent */}
        <div 
          className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${tech.color}, transparent)`,
            borderRadius: '0 1rem 0 0',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative w-full overflow-hidden py-32 sm:py-40">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)' }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-cyan" />
              <span className="text-[11px] font-mono text-cyan/70 tracking-[0.4em] uppercase">
                TECH STACK
              </span>
              <Code2 size={16} className="text-accent" />
            </div>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/60">
              Technologies{' '}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-purple-400">
              & Tools
            </span>
          </h2>
          
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A curated collection of technologies I work with to build{' '}
            <strong className="text-slate-400">modern, scalable applications</strong>
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {TECH_STACK.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-12 pt-12 border-t border-white/5"
        >
          {[
            { label: 'TECHNOLOGIES', value: TECH_STACK.length, color: '#6366f1' },
            { label: 'AVG PROFICIENCY', value: `${Math.round(TECH_STACK.reduce((sum, t) => sum + t.level, 0) / TECH_STACK.length)}%`, color: '#22d3ee' },
            { label: 'YEARS CODING', value: '3+', color: '#10b981' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <p
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  color: stat.color,
                  textShadow: `0 0 30px ${stat.color}40`,
                }}
              >
                {stat.value}
              </p>
              <p className="text-[10px] text-slate-600 font-mono tracking-[0.3em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
