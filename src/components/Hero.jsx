import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Linkedin, Mail, Download, Github } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const ROLES = ['Software Developer', 'AI Enthusiast', 'Data Analyst', 'Full-Stack Builder']

function MorphingBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, #6366f1, #22d3ee, #a78bfa, #6366f1)',
            filter: 'blur(120px)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />
      </motion.div>
    </div>
  )
}

function RotatingRole() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[1.3em] overflow-hidden">
      {ROLES.map((role, i) => (
        <motion.span
          key={role}
          className="absolute inset-0 block text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-accent"
          style={{ backgroundSize: '200% auto' }}
          initial={false}
          animate={{
            y: i === current ? 0 : i === (current - 1 + ROLES.length) % ROLES.length ? '-110%' : '110%',
            opacity: i === current ? 1 : 0,
            filter: i === current ? 'blur(0px)' : 'blur(8px)',
            backgroundPosition: i === current ? ['0% center', '200% center'] : '0% center',
          }}
          transition={{
            y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3 },
            filter: { duration: 0.4 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
        >
          {role}
        </motion.span>
      ))}
    </div>
  )
}

function FloatingParticle({ delay, x, y }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-accent/40"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -60, 0],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pt-20"
    >
      <MorphingBlob />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.4}
          x={10 + Math.random() * 80}
          y={10 + Math.random() * 80}
        />
      ))}

      {/* Minimal grid dots background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(99,102,241,0.15) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Slow drifting geometric shapes */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div
          key={`geo-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 60 + i * 30,
            height: 60 + i * 30,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            border: '1px solid rgba(99,102,241,0.06)',
            borderRadius: i % 2 === 0 ? '50%' : '4px',
          }}
          animate={{
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 25 + i * 10, repeat: Infinity, ease: 'linear' },
            scale: { duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* Subtle pulsing accent circles */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-accent/20 pointer-events-none"
        animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-1.5 h-1.5 rounded-full bg-cyan/20 pointer-events-none"
        animate={{ scale: [1, 3, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="mx-auto w-full max-w-7xl relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start relative z-20"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">Available for work</span>
            </div>
          </motion.div>

          {/* Name with stagger */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.85]"
              initial={{ y: '120%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500">
                MITHUN
              </span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.85]"
              initial={{ y: '120%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-600">
                P.
              </span>
            </motion.h1>
          </div>

          {/* Role rotator */}
          <motion.div
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <RotatingRole />
          </motion.div>

          {/* Description with accent border */}
          <motion.p
            className="max-w-lg text-base sm:text-lg text-slate-400 leading-relaxed mb-10 border-l-2 border-accent/30 pl-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Crafting intelligent systems with <strong className="text-white font-semibold">Python, SQL, & Power BI</strong>.
            I build the bridge between raw data and impactful visual storytelling.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <a
              href="/resume.pdf"
              download="Mithun-Resume.pdf"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-3.5 text-black transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative font-bold tracking-wide text-sm group-hover:text-white transition-colors">RESUME</span>
              <Download size={16} className="relative transition-transform group-hover:translate-y-0.5 group-hover:text-white" />
            </a>

            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 px-7 py-3.5 text-white transition-all duration-300 hover:border-accent/40 hover:bg-accent/5"
            >
              <span className="font-medium tracking-wide text-sm">VIEW WORK</span>
              <ArrowDown size={16} className="transition-transform duration-300 -rotate-90 group-hover:rotate-0" />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="mt-10 flex gap-5 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <div className="h-px w-8 bg-white/10" />
            {[
              { icon: <Github size={20} />, href: 'https://github.com/mithun-p', label: 'GitHub' },
              { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/mithun-p2006/', label: 'LinkedIn' },
              { icon: <Mail size={20} />, href: 'mailto:mithunmithun71548@gmail.com', label: 'Email' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label={social.label}
                whileHover={{ y: -2 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual Right Side */}
        <motion.div
          style={{ y: y1, opacity }}
          className="relative hidden lg:flex items-center justify-center pointer-events-none"
        >
          {/* Orbiting rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full border border-white/[0.04]"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            </motion.div>
            <motion.div
              className="absolute w-[550px] h-[550px] rounded-full border border-dashed border-white/[0.03]"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-cyan/50 shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
            </motion.div>
          </div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
            className="relative z-10 w-[380px] h-[480px]"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/25 to-cyan/20 rounded-[2.5rem] blur-3xl transform rotate-6 scale-95" />

            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-dark-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out group">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
              
              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[1px] rounded-[2.5rem] z-0"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #22d3ee, transparent, #6366f1)',
                  backgroundSize: '400% 400%',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-[1px] rounded-[2.5rem] bg-dark-800 z-[1]" />
              
              <img
                src="/Mithun.png"
                alt="Mithun P"
                className="relative z-[2] h-full w-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />

              {/* Info overlay */}
              <div className="absolute bottom-6 left-6 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-white text-xl font-bold">Mithun P</div>
                  <div className="text-accent-light text-sm font-mono">@mithun_p</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[9px] font-mono tracking-[0.3em] text-slate-600 uppercase">scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5"
          animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(99,102,241,0.3)', 'rgba(255,255,255,0.1)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

    </section>
  )
}
