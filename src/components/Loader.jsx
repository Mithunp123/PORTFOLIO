import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [text, setText] = useState('')
  const fullText = 'INITIALIZING SYSTEM...'
  const gifPath = '/gif/standard.gif'

  useEffect(() => {
    // Typing effect
    let index = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) clearInterval(interval)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020205] overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      initial={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* ─── BACKGROUND GRID EFFECT ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,20,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,20,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      {/* ─── MAIN REACTOR CORE ─── */}
      <div className="relative flex items-center justify-center w-64 h-64">
        
        {/* Layer 1: Spinning Dashed Ring */}
        <motion.div
           className="absolute w-56 h-56 rounded-full border border-dashed border-slate-700/50"
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Layer 2: Reverse Spinning Cyan Arcs */}
        <motion.div
           className="absolute w-44 h-44 rounded-full border-2 border-transparent border-t-cyan/50 border-b-cyan/50"
           animate={{ rotate: -360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Layer 3: Fast Pulsing Accent Ring */}
        <motion.div
           className="absolute w-36 h-36 rounded-full border border-accent/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
           animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Layer 4: Central GIF Display */}
        <div className="relative flex items-center justify-center z-10">
           <motion.div 
             className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-black/80"
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.5 }}
           >
              <img 
                src={gifPath} 
                alt="Analyzing..." 
                className="w-full h-full object-cover opacity-90" 
              />
              {/* Tech overlay tint */}
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
           </motion.div>
        </div>

        {/* Layer 5: Data Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
            animate={{ 
              x: Math.cos(i * 2) * 80, 
              y: Math.sin(i * 2) * 80,
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeInOut" 
            }}
          />
        ))}

      </div>

      {/* ─── TYPING TEXT & LOADING BAR ─── */}
      <div className="flex flex-col items-center gap-4 mt-8 z-10">
        <h2 className="font-mono text-xl md:text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-accent">
          {text}<span className="animate-pulse">_</span>
        </h2>

        <div className="w-64 h-1 bg-dark-700 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-accent box-shadow-[0_0_10px_#6366f1]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>

        <div className="flex gap-8 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500">
           <span>Data</span>
           <span>Analytics</span>
           <span>Visuals</span>
        </div>
      </div>

    </motion.div>
  )
}
