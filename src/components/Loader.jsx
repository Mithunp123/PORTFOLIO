import { motion } from 'framer-motion'

const NAME = 'MITHUN P'
const SUBTITLE = 'Software Developer'

const letterVariants = {
  hidden: { y: 80, opacity: 0, rotateX: -90 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: 0.15 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
      y: { type: 'spring', damping: 12, stiffness: 200, delay: 0.15 + i * 0.08 },
    },
  }),
  exit: (i) => ({
    y: -60,
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      duration: 0.4,
      delay: i * 0.03,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
}

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Subtle gradient glow behind */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5], opacity: [0, 1, 0.5] }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Top decorative line */}
      <motion.div
        className="absolute top-[38%] sm:top-[42%] left-1/2 -translate-x-1/2 h-[1px] overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 0.8, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />
      </motion.div>

      {/* Letter stagger name */}
      <div className="relative z-10 flex items-center justify-center perspective-[800px]">
        {NAME.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block text-6xl sm:text-8xl md:text-9xl font-black tracking-tight ${
              char === ' ' ? 'w-4 sm:w-6' : ''
            }`}
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(180deg, #ffffff 30%, #6366f1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.15))',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-[38%] sm:bottom-[42%] left-1/2 -translate-x-1/2 h-[1px] overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)' }} />
      </motion.div>

      {/* Subtitle */}
      <motion.span
        className="relative z-10 mt-4 text-xs sm:text-sm font-mono tracking-[0.35em] uppercase"
        style={{ color: 'rgba(148,163,184,0.6)' }}
        initial={{ opacity: 0, y: 15, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {SUBTITLE}
      </motion.span>

      {/* Loading progress dots */}
      <div className="relative z-10 flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.3, 1, 0],
              scale: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              duration: 1.6,
              delay: 1.0 + i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Exit wipe */}
      <motion.div
        className="absolute inset-0 bg-dark-900"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1] }}
        transition={{
          duration: 0.5,
          delay: 2.0,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ transformOrigin: 'bottom' }}
      />
    </motion.div>
  )
}
