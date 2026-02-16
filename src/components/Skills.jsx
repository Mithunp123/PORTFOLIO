import React, { useRef, useMemo, Suspense, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Stars, Line } from '@react-three/drei'
import * as THREE from 'three'

// ─── SKILLS DATA ───
const SKILLS = [
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',   color: '#3776AB' },
  { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',     color: '#61DAFB' },
  { name: 'Power BI',   icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',       color: '#F2C811' },
  { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',     color: '#00758F' },
  { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',       color: '#007396' },
  { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',         color: '#F05032' },
  { name: 'Flask',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',     color: '#ffffff' },
  { name: 'Networking', icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png',                         color: '#06b6d4' },
  { name: 'Twilio',     icon: 'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254468/twilio-icon-icon-md.png',                         color: '#F22F46' },
  { name: 'Three.js',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', color: '#ffffff' },
  { name: 'Supabase',   icon: 'https://img.icons8.com/fluent/1200/supabase.jpg', color: '#3ECF8E' },
]

// ─── Helper: Fibonacci sphere distribution ───
function fibonacciSphere(count, radius) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    points.push(new THREE.Vector3(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius
    ))
  }
  return points
}

// ─── ANIMATED WIREFRAME GLOBE ───
function WireframeGlobe() {
  const globe1 = useRef()
  const globe2 = useRef()
  const globe3 = useRef()
  const pulseRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    // Subtle independent rotations for layered depth effect
    if (globe1.current) {
      globe1.current.rotation.y += delta * 0.03
      globe1.current.rotation.x = Math.sin(t * 0.1) * 0.1
    }
    if (globe2.current) {
      globe2.current.rotation.y -= delta * 0.02
      globe2.current.rotation.z = Math.cos(t * 0.15) * 0.05
    }
    if (globe3.current) {
      globe3.current.rotation.y += delta * 0.01
      globe3.current.rotation.x -= delta * 0.005
    }
    // Pulsing inner glow
    if (pulseRef.current) {
      pulseRef.current.material.opacity = 0.02 + Math.sin(t * 1.5) * 0.015
    }
  })

  return (
    <group>
      {/* Layer 1: Primary wireframe — fine detail */}
      <mesh ref={globe1}>
        <sphereGeometry args={[3.6, 40, 40]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Layer 2: Secondary wireframe — coarser, cyan tint */}
      <mesh ref={globe2}>
        <sphereGeometry args={[3.65, 18, 18]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.07} />
      </mesh>

      {/* Layer 3: Very coarse outer shell */}
      <mesh ref={globe3}>
        <sphereGeometry args={[3.7, 10, 10]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Equator ring - bright */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.75, 0.015, 8, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.4} />
      </mesh>

      {/* Tilted orbit ring 1 */}
      <mesh rotation={[Math.PI / 2.8, 0.3, 0.5]}>
        <torusGeometry args={[3.8, 0.01, 8, 80]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} />
      </mesh>

      {/* Tilted orbit ring 2 */}
      <mesh rotation={[Math.PI / 4, -0.5, 0.2]}>
        <torusGeometry args={[3.85, 0.008, 8, 80]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.15} />
      </mesh>

      {/* Inner glow core */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[3.0, 16, 16]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.03} />
      </mesh>

      {/* Center bright point */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

// ─── CONNECTION LINES between icon positions (neural network web) ───
function ConnectionWeb({ positions }) {
  // Connect each node to its 2-3 nearest neighbors
  const lines = useMemo(() => {
    const result = []
    for (let i = 0; i < positions.length; i++) {
      // Sort other points by distance
      const distances = positions
        .map((p, j) => ({ index: j, dist: positions[i].distanceTo(p) }))
        .filter(d => d.index !== i)
        .sort((a, b) => a.dist - b.dist)

      // Connect to 2 nearest
      for (let k = 0; k < Math.min(2, distances.length); k++) {
        const j = distances[k].index
        // Avoid duplicate lines (only draw if i < j)
        if (i < j) {
          result.push({
            start: positions[i],
            end: positions[j],
          })
        }
      }
    }
    return result
  }, [positions])

  return (
    <group>
      {lines.map((line, i) => {
        // Create a curved line through the midpoint pushed outward
        const mid = new THREE.Vector3().addVectors(line.start, line.end).multiplyScalar(0.5)
        const midLen = mid.length()
        // Push midpoint outward to create arc along sphere surface
        mid.normalize().multiplyScalar(midLen * 1.15)

        const curve = new THREE.QuadraticBezierCurve3(line.start, mid, line.end)
        const curvePoints = curve.getPoints(20)

        return (
          <line key={`conn-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={curvePoints.length}
                array={new Float32Array(curvePoints.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.12} />
          </line>
        )
      })}
    </group>
  )
}

// ─── ANIMATED PULSE PARTICLES traveling along the globe surface ───
function PulseParticles() {
  const count = 60
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.random() * Math.PI,
      speed: 0.2 + Math.random() * 0.5,
      radius: 3.6 + Math.random() * 0.3,
      size: 0.02 + Math.random() * 0.03,
    }))
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    particleData.forEach((p, i) => {
      p.theta += delta * p.speed
      const x = p.radius * Math.sin(p.phi) * Math.cos(p.theta)
      const y = p.radius * Math.cos(p.phi)
      const z = p.radius * Math.sin(p.phi) * Math.sin(p.theta)
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(p.size * (1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.5))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
    </instancedMesh>
  )
}

// ─── SINGLE ORBITING SKILL ICON ───
function OrbitingIcon({ skill, orbitRadius, orbitSpeed, orbitTiltX, orbitTiltZ, startAngle }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const angle = startAngle + t * orbitSpeed
    const x = Math.cos(angle) * orbitRadius
    const z = Math.sin(angle) * orbitRadius
    groupRef.current.position.set(x, 0, z)
  })

  return (
    <group rotation={[orbitTiltX, 0, orbitTiltZ]}>
      {/* Orbit ring trail — bright, colored per skill */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius, 0.012, 8, 120]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.35} />
      </mesh>

      {/* The moving icon */}
      <group ref={groupRef}>
        <Html
          center
          distanceFactor={10}
          zIndexRange={[100, 0]}
          occlude={false}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className="flex flex-col items-center gap-1 select-none cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className="relative flex items-center justify-center rounded-xl backdrop-blur-sm transition-all duration-300"
              style={{
                width: hovered ? 52 : 40,
                height: hovered ? 52 : 40,
                background: hovered
                  ? `radial-gradient(circle, ${skill.color}22, rgba(0,0,0,0.6))`
                  : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${hovered ? skill.color : 'rgba(255,255,255,0.1)'}`,
                boxShadow: hovered
                  ? `0 0 25px ${skill.color}44, inset 0 0 15px ${skill.color}11`
                  : '0 0 8px rgba(0,0,0,0.4)',
                transform: hovered ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                style={{
                  width: hovered ? 28 : 22,
                  height: hovered ? 28 : 22,
                  filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
                  opacity: hovered ? 1 : 0.8
                }}
                className="object-contain drop-shadow-lg transition-all duration-300"
                draggable={false}
              />
            </div>
            <span
              className="font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300"
              style={{
                fontSize: 8,
                color: hovered ? skill.color : 'rgba(255,255,255,0.4)',
                textShadow: hovered ? `0 0 8px ${skill.color}88` : 'none',
              }}
            >
              {skill.name}
            </span>
          </div>
        </Html>
      </group>
    </group>
  )
}

// ─── ALL ORBITING ICONS ───
function OrbitingIcons() {
  // Each icon gets a unique orbit: radius, tilt, speed, start angle
  const orbits = useMemo(() => {
    return SKILLS.map((skill, i) => {
      const count = SKILLS.length
      // Distribute orbits evenly around the sphere to avoiding clumping
      // We use the golden angle for Z-rotation to ensure they don't overlap
      return {
        skill,
        orbitRadius: 4.2 + (i % 2) * 1.0,           // 2 distinct orbital shells: 4.2 and 5.2
        orbitSpeed: 0.2 + (Math.random() * 0.1),       // Randomized speeds
        // Tilt X: Spread from -45 to +45 degrees
        orbitTiltX: (Math.random() * Math.PI) - (Math.PI / 2), 
        // Tilt Z: Full 360 degree coverage using golden ratio to prevent alignment
        orbitTiltZ: i * Math.PI * 0.76, 
        startAngle: Math.random() * Math.PI * 2,       // Totally random start position
      }
    })
  }, [])

  return (
    <group>
      {orbits.map((o) => (
        <OrbitingIcon key={o.skill.name} {...o} />
      ))}
    </group>
  )
}

// ─── MASTER ROTATING GROUP ───
function SkillsOrbit() {
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      <WireframeGlobe />
      <PulseParticles />
      <OrbitingIcons />
    </group>
  )
}

// ─── MAIN EXPORT ───
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full bg-dark-900 overflow-hidden z-10"
      style={{ height: '100vh', minHeight: '850px', maxHeight: '1100px' }}
    >
      {/* Header — positioned at the very top, separate from canvas */}
      <div className="absolute top-8 left-0 right-0 z-30 text-center pointer-events-none">
        <p className="text-[10px] text-accent/50 font-mono tracking-[0.4em] uppercase mb-1">
          // what I work with
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30">
            TECH
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee]">
            STACK
          </span>
        </h2>
      </div>

      {/* 3D Canvas — fills entire section, orbits have full room */}
      <div className="absolute inset-0 overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 16], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#050505', width: '100%', height: '100%' }}
        >
          <fog attach="fog" args={['#050505', 14, 40]} />

          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#6366f1" />
          <pointLight position={[-10, -8, -10]} intensity={0.8} color="#22d3ee" />

          <Suspense
            fallback={
              <Html center>
                <div className="text-accent font-mono text-xs tracking-widest animate-pulse">
                  LOADING...
                </div>
              </Html>
            }
          >
            <Stars radius={80} depth={60} count={3000} factor={3} saturation={0} fade speed={0.6} />
            <group position={[0, -1.0, 0]}>
              <SkillsOrbit />
            </group>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.4}
          />
        </Canvas>
      </div>

      {/* Footer status */}
      <div className="absolute bottom-8 left-8 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          <span className="text-[10px] text-white/25 font-mono tracking-widest">
            {SKILLS.length} MODULES LOADED
          </span>
        </div>
      </div>
    </section>
  )
}
