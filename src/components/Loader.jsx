import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const loadingSteps = [
  { text: 'Initializing Systems', progress: 20 },
  { text: 'Booting Intelligence Layer', progress: 50 },
  { text: 'Loading Experience', progress: 80 },
  { text: 'Ready', progress: 100 },
]

export default function Loader() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const gifPath = '/gif/standard.gif'

  useEffect(() => {
    const stepDuration = 550
    
    const stepTimer = setInterval(() => {
      setStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        clearInterval(stepTimer)
        return prev
      })
    }, stepDuration)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const target = loadingSteps[step]?.progress || 100
        if (prev < target) {
          return Math.min(prev + 2, target)
        }
        return prev
      })
    }, 30)

    return () => {
      clearInterval(stepTimer)
      clearInterval(progressTimer)
    }
  }, [step])

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #050508 50%, #020205 100%)',
      }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Cinematic animated background */}
      <div className="absolute inset-0">
        {/* Moving gradient orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            top: '20%',
            left: '15%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-6">
        
        {/* GIF Display - Cinematic Frame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Outer glow */}
          <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-accent/20 via-cyan/10 to-purple-500/20 blur-3xl" />
          
          {/* Frame container */}
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: '400px',
              height: '225px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #22d3ee, #a78bfa, #6366f1)',
                backgroundSize: '300% 300%',
                padding: '2px',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-[2px] rounded-2xl bg-[#0a0a0f]" />
            </motion.div>

            {/* GIF Content */}
            <div className="absolute inset-[4px] rounded-xl overflow-hidden bg-black">
              <img
                src={gifPath}
                alt="Loading..."
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(1.05) contrast(1.05)',
                }}
              />
              
              {/* Corner accent glows */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan/10 blur-3xl" />
              
              {/* Scanline */}
              <motion.div
                className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-cyan/80 to-transparent"
                style={{ filter: 'blur(1px)' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Corner brackets */}
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute w-6 h-6"
              style={{
                top: i < 2 ? -3 : 'auto',
                bottom: i >= 2 ? -3 : 'auto',
                left: i % 2 === 0 ? -3 : 'auto',
                right: i % 2 === 1 ? -3 : 'auto',
                borderTop: i < 2 ? '2px solid rgba(99,102,241,0.6)' : 'none',
                borderBottom: i >= 2 ? '2px solid rgba(34,211,238,0.6)' : 'none',
                borderLeft: i % 2 === 0 ? '2px solid rgba(99,102,241,0.6)' : 'none',
                borderRight: i % 2 === 1 ? '2px solid rgba(34,211,238,0.6)' : 'none',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </motion.div>

        {/* Loading Status */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          
          {/* Status text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-xl font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-accent to-purple-400">
                {loadingSteps[step]?.text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-full">
            <div className="relative h-1.5 w-full rounded-full overflow-hidden bg-white/5">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #818cf8, #22d3ee)',
                  width: `${progress}%`,
                  boxShadow: '0 0 20px rgba(99,102,241,0.6)',
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Moving shimmer */}
              <motion.div
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ left: `${progress - 10}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            
            {/* Progress percentage */}
            <div className="mt-3 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-600">LOADING</span>
              <span className="text-accent font-bold">{progress}%</span>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex gap-6 mt-2">
            {['SYSTEM', 'AI', 'UI'].map((label, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: progress > (i + 1) * 25 ? '#22d3ee' : '#334155',
                    boxShadow: progress > (i + 1) * 25 ? '0 0 8px #22d3ee' : 'none',
                  }}
                  animate={
                    progress > (i + 1) * 25
                      ? { opacity: [0.5, 1, 0.5] }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[9px] font-mono tracking-widest text-slate-600 uppercase">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#22d3ee' : '#a78bfa',
            opacity: 0.3,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  )
}
