import { motion } from 'framer-motion'

export default function Loader() {
  const barColors = ['#6366f1', '#22d3ee', '#a78bfa']

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Three sliding bars that reveal and swap out */}
      {barColors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: color }}
          initial={{ x: '-100%' }}
          animate={{ x: ['100%', '0%', '0%', '100%'] }}
          transition={{
            duration: 1.8,
            times: [0, 0.35, 0.65, 1],
            delay: i * 0.15,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}

      {/* Center logo text - appears between bar slides */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.95] }}
        transition={{
          duration: 1.8,
          times: [0, 0.3, 0.7, 1],
          delay: 0.4,
        }}
      >
        <span className="text-5xl sm:text-7xl font-black tracking-tighter text-white">
          MP
        </span>
        <span className="text-xs font-mono tracking-[0.3em] text-white/60 uppercase">
          Loading Portfolio
        </span>
      </motion.div>

      {/* Final reveal - dark overlay slides away */}
      <motion.div
        className="absolute inset-0 bg-dark-900"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1] }}
        transition={{
          duration: 0.6,
          delay: 2.0,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ transformOrigin: 'bottom' }}
      />
    </motion.div>
  )
}
