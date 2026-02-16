import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      // Check if the target is clickable (button, link, input, etc.)
      const target = e.target
      const isClickable = target.tagName === 'A' || 
                          target.tagName === 'BUTTON' || 
                          target.closest('a') || 
                          target.closest('button') ||
                          target.getAttribute('role') === 'button'
                          
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Visual Indicator of click */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-0 left-0 z-[9997] pointer-events-none"
            style={{
               left: mousePosition.x,
               top: mousePosition.y,
               x: -50,
               y: -50
            }}
          >
             <div className="w-[100px] h-[100px] rounded-full border border-dashed border-accent/30 animate-[spin_4s_linear_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          height: isHovering ? 50 : 10,
          width: isHovering ? 50 : 10,
          x: isHovering ? mousePosition.x - 25 : mousePosition.x - 5,
          y: isHovering ? mousePosition.y - 25 : mousePosition.y - 5
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className={`h-full w-full rounded-full bg-white transition-opacity duration-300 ${isHovering ? 'opacity-20' : 'opacity-100'}`} />
      </motion.div>
      
      {/* Particle Trail logic could go here, keeping it simple but premium for now */}
    </>
  )
}
