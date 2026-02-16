import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0

    const updateMousePosition = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setMousePosition({ x: mouseX, y: mouseY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable = target.tagName === 'A' || 
                          target.tagName === 'BUTTON' || 
                          target.closest('a') || 
                          target.closest('button') ||
                          target.getAttribute('role') === 'button' ||
                          target.style.cursor === 'pointer'
                          
      setIsHovering(!!isClickable)
    }

    // Smooth trailing animation
    const animateCursor = () => {
      const dotSpeed = 0.2
      const ringSpeed = 0.15

      dotX += (mouseX - dotX) * dotSpeed
      dotY += (mouseY - dotY) * dotSpeed
      ringX += (mouseX - ringX) * ringSpeed
      ringY += (mouseY - ringY) * ringSpeed

      if (cursorDotRef.current) {
        gsap.set(cursorDotRef.current, { x: dotX, y: dotY })
      }
      if (cursorRingRef.current) {
        gsap.set(cursorRingRef.current, { x: ringX, y: ringY })
      }

      requestAnimationFrame(animateCursor)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    animateCursor()

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div className="cursor-wrapper hidden md:block">
      {/* Inner glowing dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: -4,
          y: -4,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan via-accent to-purple-400" />
          <div className="absolute inset-0 rounded-full bg-white blur-sm opacity-80" />
        </div>
      </motion.div>

      {/* Outer animated ring */}
      <motion.div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998]"
        style={{
          x: -16,
          y: -16,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div 
          className="w-full h-full rounded-full border border-cyan/60"
          style={{
            boxShadow: '0 0 20px rgba(34,211,238,0.3), inset 0 0 20px rgba(34,211,238,0.1)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Magnetic hover glow */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9997]"
          style={{
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div 
            className="w-full h-full rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
