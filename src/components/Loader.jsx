import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-dark-900 overflow-hidden"
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="relative flex flex-col items-center justify-center group">
        
        {/* Cinematic Rings */}
        {[300, 250, 200, 150].map((size, i) => (
           <motion.div 
             key={i}
             className="absolute rounded-full border border-white/5"
             style={{ width: size, height: size }}
             animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.1, 0.3, 0.1] }}
             transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
           />
        ))}

        <div className="relative">
           {/* Active Spinner */}
           <motion.div 
              className="w-24 h-24 rounded-full border-t-2 border-r-2 border-accent border-b-transparent border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
           />
           <motion.div 
              className="absolute inset-2 rounded-full border-b-2 border-l-2 border-cyan border-t-transparent border-r-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           />
           
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-2xl font-bold font-mono text-white tracking-tighter">MP</span>
           </div>
        </div>

        <div className="mt-12 text-center space-y-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent w-48"
            />
            <p className="text-[10px] text-accent font-mono tracking-[0.5em] uppercase">
              Initializing Core...
            </p>
        </div>
      </div>
    </motion.div>
  )
}
