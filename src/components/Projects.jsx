import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, ExternalLink, Cpu, Layers, Database } from 'lucide-react'

const FEATURED_PROJECTS = [
  {
    title: 'TrueSight AI',
    subtitle: 'Deepfake Detection System',
    description: 'AI-powered deepfake detection analyzing video & audio content. Uses Roboflow-trained models with Flask backend. Generates forensic reports for cybercrime investigations. Presented to Namakkal Cyber Cell.',
    stack: ['Roboflow', 'Flask', 'AI/ML', 'Python'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    type: 'AI / ML',
    badge: '🏆 2nd Prize',
    badgeColor: '#eab308',
    icon: <Cpu size={20} />,
  },
  {
    title: 'Dakshaa T26',
    subtitle: 'Full Stack Event Platform',
    description: 'National-level technical symposium management. Event registration, participant data, online payments. React + Node + Express + Supabase deployed on Cloudflare.',
    stack: ['React', 'Node.js', 'Supabase', 'Cloudflare'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    type: 'Full Stack',
    link: 'https://Dakshaa.ksrct.ac.in',
    icon: <Layers size={20} />,
  },
  {
    title: 'Time2Order',
    subtitle: 'Preorder Management System',
    description: 'Web-based preorder platform for local shops. Manages orders, controls crowd flow, integrates Cashfree Payment API. Two separate portals for users and shop owners.',
    stack: ['Python', 'SQL', 'Cashfree API'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    type: 'Full Stack',
    links: [
      { label: 'User App', url: 'https://time2order.com' },
      { label: 'Shop Portal', url: 'https://time2orders.shop' },
    ],
    icon: <Database size={20} />,
  },
  {
    title: 'Neurobloom',
    subtitle: 'AI Mental Wellness Platform',
    description: 'Hackathon project. Detects emotions via GPU-trained model, plays therapeutic Spotify playlists. Features an open-world relaxation game built with Three.js.',
    stack: ['Python', 'GPU Training', 'Three.js', 'Spotify API'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    type: 'AI / Game Dev',
    badge: 'Hackathon',
    badgeColor: '#8b5cf6',
    icon: <Cpu size={20} />,
  },
]

const OTHER_PROJECTS = [
  {
    title: 'AutoRevives',
    desc: 'Vehicle bidding platform with real-time auctions',
    stack: ['Python', 'Flask', 'SQL'],
    link: 'https://autorevives.com',
    type: 'Full Stack',
  },
  {
    title: 'Propic',
    desc: 'E-commerce for cleaning supplies with inventory management',
    stack: ['Python', 'Flask'],
    link: 'https://propic.in',
    type: 'Full Stack',
  },
  {
    title: 'Pashuthalam',
    desc: 'SIH Project — Veterinary dosage control with Twilio alerts',
    stack: ['Python', 'Twilio API'],
    badge: 'SIH Project',
    type: 'Healthcare',
  },
  {
    title: 'Time2Bus',
    desc: 'IoT bus tracking — driver updates, passenger views, announcements',
    stack: ['IoT', 'WebSocket', 'Python'],
    badge: 'Hackathon',
    type: 'IoT',
  },
  {
    title: 'Time2Due',
    desc: 'Cable operator management — employees, payments, reports',
    stack: ['Full Stack'],
    link: 'https://time2due.com',
    type: 'Full Stack',
  },
  {
    title: 'Time2Farm',
    desc: 'Farm finance tracker with AI insights via Gemini API',
    stack: ['Gemini API', 'Python'],
    type: 'AI',
  },
  {
    title: 'Steam Analysis',
    desc: 'Power BI dashboard for player engagement & pricing trends',
    stack: ['Power BI', 'DAX'],
    type: 'Data',
  },
  {
    title: 'QR Attendance',
    desc: 'QR-based event attendance with real-time POST API tracking',
    stack: ['QR Code', 'REST API'],
    type: 'Full Stack',
  },
]

function FeaturedCard({ project, index, inView }) {
  const isReversed = index % 2 === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image */}
      <div className="w-full lg:w-3/5 group">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-dark-800/50">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent z-10" />

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[300px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Floating stack tags */}
          <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-xs font-medium text-white/90">
                {tech}
              </span>
            ))}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 z-10 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        </div>
      </div>

      {/* Info */}
      <div className="w-full lg:w-2/5">
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 rounded-lg text-accent" style={{ background: 'rgba(99,102,241,0.1)' }}>
            {project.icon}
          </span>
          <span className="text-sm font-mono text-accent-light tracking-wider">{project.type}</span>
          {project.badge && (
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide"
              style={{
                color: project.badgeColor || '#22d3ee',
                borderColor: `${project.badgeColor || '#22d3ee'}30`,
                background: `${project.badgeColor || '#22d3ee'}10`,
              }}
            >
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-lg text-slate-500 font-light mb-5">{project.subtitle}</p>

        <div className="h-px w-16 bg-accent/20 mb-5" />

        <p className="text-slate-400 leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4">
          {project.links ? (
            project.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors"
              >
                {l.label}
                <ExternalLink size={16} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ))
          ) : project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors"
            >
              Visit Live Site
              <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showAll, setShowAll] = useState(false)

  const visibleOthers = showAll ? OTHER_PROJECTS : OTHER_PROJECTS.slice(0, 4)

  return (
    <section id="projects" className="relative py-32 sm:py-40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-accent" />
            <span className="text-accent font-mono tracking-widest uppercase text-xs">Selected Works</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white">
            Projects That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              Ship.
            </span>
          </h2>
        </motion.div>

        {/* Featured projects */}
        <div className="space-y-32 mb-32">
          {FEATURED_PROJECTS.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Other projects grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-10">Other Noteworthy Projects</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleOthers.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-accent-light tracking-wider uppercase">{project.type}</span>
                  {project.badge && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {project.badge}
                    </span>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-accent transition-colors">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <h4 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.stack.map(t => (
                    <span key={t} className="text-[10px] font-mono text-slate-600">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {OTHER_PROJECTS.length > 4 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm font-medium text-slate-400 hover:text-white hover:border-white/20 transition-all"
                style={{ cursor: 'pointer' }}
              >
                {showAll ? 'Show Less' : `Show All ${OTHER_PROJECTS.length} Projects`}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
