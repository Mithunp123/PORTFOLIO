import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Linkedin, Mail, Download, Github } from 'lucide-react'
import { useRef } from 'react'

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
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-accent/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="mx-auto w-full max-w-7xl relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start relative z-20"
        >
          <div className="overflow-hidden mb-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">Available for work</span>
            </motion.div>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tighter text-white leading-[0.9] mb-8">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-lg">
              MITHUN P.
            </span>
            <motion.span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-wide mt-2 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-accent"
                style={{ backgroundSize: '200% auto' }}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ 
                  clipPath: 'inset(0 0% 0 0)',
                  backgroundPosition: ['0% center', '200% center', '0% center'],
                }}
                transition={{
                  clipPath: { delay: 0.7, duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 1.9
                  },
                }}
              >
                Software Developer
              </motion.span>
            </motion.span>
          </h1>
          
          <p className="max-w-lg text-lg text-slate-400 leading-relaxed mb-10 border-l-2 border-accent/30 pl-6">
            Crafting intelligent systems with <strong className="text-white">Python, SQL, & Power BI</strong>. 
            I build the bridge between raw data and impactful visual storytelling.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="/resume.pdf"
              download="Mithun-Resume.pdf"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-black transition-all hover:scale-105 hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <span className="font-bold tracking-wide">RESUME</span>
              <Download size={18} className="transition-transform group-hover:translate-y-1" />
            </a>
            
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 px-8 py-4 text-white transition-all hover:bg-white/10"
            >
              <span className="font-medium tracking-wide">VIEW WORK</span>
              <ArrowDown size={18} className="transition-transform -rotate-90 group-hover:rotate-0" />
            </a>
          </div>

          {/* Social Icons Minimal */}
          <div className="mt-12 flex gap-6">
            {[
              { icon: <Github size={22} />, href: 'https://github.com/mithun-p', label: 'GitHub' },
              { icon: <Linkedin size={22} />, href: 'https://www.linkedin.com/in/mithun-p2006/', label: 'LinkedIn' },
              { icon: <Mail size={22} />, href: 'mailto:mithunmithun71548@gmail.com', label: 'Email' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-all hover:scale-125 duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Visual / Image */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="relative hidden lg:flex items-center justify-center pointer-events-none"
        >
          {/* Parallax background elements */}
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
             <div className="absolute w-[650px] h-[650px] border border-dashed border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="relative z-10 w-[400px] h-[500px]"
          >
             {/* Glowing card effect behind image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-accent to-cyan rounded-[40px] opacity-20 blur-2xl transform rotate-6 scale-95" />
             
             <div className="relative h-full w-full overflow-hidden rounded-[40px] border border-white/10 bg-dark-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out group">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
               <img 
                 src="/Mithun.png" 
                 alt="Mithun P" 
                 className="h-full w-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
               />
               
               {/* Floating Tag */}
               <div className="absolute bottom-6 left-6 z-20">
                 <div className="text-white text-xl font-bold">Mithun P</div>
                 <div className="text-accent text-sm">@mithun_p</div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-10 h-full w-px bg-white/5 hidden lg:block" />
      <div className="absolute top-0 right-10 h-full w-px bg-white/5 hidden lg:block" />
      <div className="absolute top-0 left-1/4 h-full w-px bg-white/5 hidden lg:block" />

    </section>
  )
}
