import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Chatbot from './components/Chatbot'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen bg-dark-900"
        >
          <Cursor />
          <div className="noise-bg" />
          
          {/* Ambient background - organic morphing blobs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="animate-float absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-[150px]" />
            <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-cyan/[0.025] blur-[130px]" style={{ animation: 'float-delayed 12s ease-in-out infinite' }} />
            <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.02] blur-[120px]" style={{ animation: 'float-slow 15s ease-in-out infinite' }} />
          </div>

          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </main>
          <Footer />
          <Chatbot />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
