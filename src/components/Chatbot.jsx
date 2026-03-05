import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ChevronRight } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════
//  VECTOR DB + RAG + LLM  — Client-Side Implementation
//  Architecture:
//    1. Document Chunks  → split knowledge into semantic chunks
//    2. Embedding Model  → Gemini text-embedding-004 (vector DB)
//    3. Vector Store     → In-memory cosine similarity search
//    4. Retriever        → Top-K relevant chunks per query
//    5. LLM Generator    → Gemini 2.0 Flash generates answer
// ═══════════════════════════════════════════════════════════════════

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// ── Step 1: Document chunks (simulates PDF loading + text splitting) ──
// Mirrors Python's RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
// Source: scraped from https://mithunp.me (live portfolio) + local component data
const DOCUMENT_CHUNKS = [
  `Profile Overview: Mithun P is a Software Developer and Data Analytics student. His tagline is "Crafting intelligent systems with Python, SQL, & Power BI. I build the bridge between raw data and impactful visual storytelling." He is currently pursuing a Bachelor of Technology in Artificial Intelligence and Data Science at K.S. Rangasamy College of Technology (2023–2027). Mithun is based in Erode, Tamil Nadu, India. He focuses on AI & Data Science, building full-stack web applications, data dashboards, and AI-powered systems. He is currently available for work — open to freelance, collaborations, and full-time positions. His portfolio website is mithunp.me.`,

  `About Mithun: In his own words — "I'm a passionate Data Analytics student pursuing B.Tech in AI & Data Science at K.S. Rangasamy College of Technology. I bridge the gap between data and decisions — from Power BI dashboards to full-stack web apps. I've presented deepfake detection research to Namakkal Cyber Cell, built preorder management systems for local shops, and I'm driven by solving real-world business problems through code and data." Mithun is a hands-on builder who ships production-ready apps, not just academic projects. He has 3+ years of coding experience and has built 12+ real-world projects that are live and serving actual users.`,

  `Education: Mithun P is currently studying Bachelor of Technology in Artificial Intelligence and Data Science at K.S. Rangasamy College of Technology from 2023 to 2027, located in Tamil Nadu, India. Key academic highlights: hands-on experience with Power BI, Python, and SQL; built 7+ real-world projects including AI & full-stack apps; presented deepfake detection research to Namakkal Cyber Cell; won 2nd Prize for TrueSight AI project. His academic focus includes machine learning, data preprocessing pipelines, model training, evaluation, and optimization techniques.`,

  `Journey & Milestones: 2023 — Started B.Tech in AI & Data Science at KSRCT. 2024 — Built Time2Order, Time2Due & Time2Farm platforms (all live and serving real users). 2025 — Won 2nd Prize for TrueSight AI (Deepfake Detection), completed a 10-week virtual internship in Artificial Intelligence and Machine Learning (April to June 2025) covering data preprocessing, model training, evaluation, and optimization. 2026 — Building full-stack apps & exploring advanced AI, currently working on FiveM Development and Battle Royale Panel systems.`,

  `Technical Skills with Proficiency: Python 90%, HTML/CSS 90%, JavaScript 88%, React 85%, SQL 85%, Tailwind CSS 85%, GitHub 82%, REST API 82%, Power BI 80%, Git 80%, Flask 80%, Java 75%, Three.js 70%, Supabase 70%, Twilio 65%. Total: 15 technologies with an average proficiency of 80%. Programming Languages: Python, Java, SQL, JavaScript. Frameworks & Libraries: React, Flask, Tailwind CSS, Three.js. Tools & Platforms: Power BI, Git, GitHub, Supabase, REST API, Twilio, Web Hosting. Has 3+ years of coding experience.`,

  `Services Mithun Offers: 1) Full-Stack Development — building complete web applications from frontend (React, Tailwind CSS, Three.js) to backend (Flask, Node.js, Express.js) with databases (SQL, Supabase) and payment integrations (Cashfree). 2) Data Analytics & Business Intelligence — creating Power BI dashboards, data visualization, DAX calculations, analyzing trends, player engagement, pricing patterns. 3) AI & Machine Learning — deepfake detection using Roboflow, emotion detection with GPU-trained models, AI-driven insights using Gemini API, chatbot development with Vector DB + RAG + LLM architecture.`,

  `Project — TrueSight AI (Featured, Won 2nd Prize): An AI-powered deepfake detection system designed to analyze video and audio content for manipulation. Uses Roboflow-trained computer vision models and a Flask backend to detect deepfake media. Generates forensic-style reports that can assist cybercrime investigations. Presented to the Namakkal Cyber Cell (Indian police cybercrime unit). Won Second Prize for innovation. Built with Roboflow, Flask, AI/ML. Category: AI/ML.`,

  `Project — Dakshaa T26 (Featured, Live): A full-stack web application built to manage registrations for a national-level technical symposium at KSRCT. Features: event registration system, participant data management, online payment processing. Tech stack: Frontend — React.js, Backend — Node.js/Express.js, Database — Supabase, Deployment — Cloudflare (frontend) + VPS server (backend). Live at dakshaa.ksrct.ac.in. Category: Full Stack.`,

  `Project — Time2Order (Featured, Live): A web-based preorder management system with integrated soundbox for local shops. Reduces waiting time and manages customer orders efficiently. Allows shop owners to manage preorders and control crowd flow during peak hours. Integrates Python, SQL, and Cashfree Payment API for transactions. Two live apps: User App at time2order.com and Shop Owner portal at time2orders.shop. Category: Full Stack.`,

  `Project — Time2Due (Live) & Time2Farm: Time2Due — Operations management platform for cable operators to manage employees, track offline payments, and monitor reports through secure dashboards. Mobile-friendly, simplifies operational management. Live at time2due.com. Category: Full Stack. Time2Farm — Farmer-focused finance tracking application for managing farm income and expenses. Provides profit tracking and AI-driven insights using the Gemini API. Helps farmers understand financial performance. Category: AI/ML.`,

  `Project — AutoRevives (Live) & Propic (Live): AutoRevives — A comprehensive vehicle bidding platform / auction system. Users can list cars, place real-time bids, and manage auctions. Built with Python, Flask, HTML/CSS/JS, SQL. Live at autorevives.com. Category: Full Stack. Propic — Specialized e-commerce platform for cleaning products (cleaning supplies). Features dynamic inventory management and cart system. Built with Python, Flask, HTML/CSS/JS. Live at propic.in. Category: Full Stack.`,

  `Project — Neurobloom (Hackathon): AI Mental Wellness Platform built during Nallas Hackathon. Detects user emotions via a GPU-trained machine learning model and plays therapeutic Spotify playlists based on detected mood. Features an open-world relaxation game built with Three.js for immersive stress relief. Tech: Python, GPU Training, Three.js, Spotify API. Category: AI / Game Dev.`,

  `Project — Pashuthalam (SIH Project), Time2Bus (Hackathon), QR Attendance, Steam Game Analysis: Pashuthalam — Smart India Hackathon (SIH) project that prevents animal drug overdose and disease spread in veterinary care. Integrated Twilio Voice API for automated critical alerts. Built with Python, Flask, Twilio API. Category: Healthcare Tech. Time2Bus — Nandha Hackathon project. IoT-enabled real-time bus tracking system. Driver app updates GPS location, passengers see stops on map, speakers announce arrivals. Tech: IoT, Geolocation, WebSocket, Python. Status: In Development. QR Attendance — QR code-based event attendance system using POST APIs for real-time tracking. Category: Full Stack. Steam Game Platform Analysis — Power BI dashboard analyzing Steam platform data: game performance, player engagement, pricing trends, market patterns using DAX calculations and visual analytics. Category: Data Analytics.`,

  `Achievements & Strengths: Won 2nd Prize for TrueSight AI (Deepfake Detection system). Presented deepfake detection research to Namakkal Cyber Cell (police cybercrime unit). Built 12+ real-world production projects (many live with real users). 3+ years of coding experience. Completed 10-week AI/ML virtual internship. Core strengths: Teamwork, Critical Thinking, Problem Solving, Flexibility. Languages spoken: English and Tamil. Mithun is known for building complete, deployed systems — not just prototypes.`,

  `Contact & Social Links: Email: mithunmithun71548@gmail.com. Phone: 8122762374. Location: Erode, Tamil Nadu, India. LinkedIn: linkedin.com/in/mithun-p2006/. GitHub: github.com/mithun-p. Discord: discordapp.com/users/944594954313932841. WhatsApp: wa.me/918122762374. Portfolio: mithunp.me. Resume available at mithunp.me/resume.pdf. Currently available for hire — freelance work, collaborations, internships, and full-time positions. Best way to reach him is email or LinkedIn.`,

  `Hobbies & Current Learning: When not coding, Mithun enjoys watching web series (especially Game of Thrones), gaming (Battle Royale games), and movies (English & Tamil films). Currently exploring and learning: 1) FiveM Development — creating custom game servers and scripts for GTA V multiplayer. 2) Battle Royale Panels — building tournament management systems for competitive gaming. He is always exploring new technologies and frameworks to expand his skillset.`,

  `Project Summary & Portfolio Stats: Mithun has built 12+ projects spanning categories: Full Stack (7 projects), AI/ML (3 projects), Data Analytics (1 project), IoT (1 project), Healthcare Tech (1 project), Game Dev (1 project). Live deployed projects include: time2order.com, time2orders.shop, time2due.com, autorevives.com, propic.in, dakshaa.ksrct.ac.in. He uses 15 different technologies with 80% average proficiency. His work ranges from payment-integrated e-commerce platforms, to AI deepfake detection systems, to IoT bus tracking, to Power BI data dashboards. This demonstrates versatility across the full software engineering spectrum.`,
]

// ── Step 2: Vector Store (in-memory, cosine similarity) ──
class VectorStore {
  constructor() {
    this.vectors = []
    this.isInitialized = false
    this.initPromise = null
  }

  async embed(text) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'models/text-embedding-004',
          content: { parts: [{ text }] },
          taskType: 'RETRIEVAL_DOCUMENT',
        }),
      }
    )
    if (!res.ok) throw new Error(`Embedding API error: ${res.status}`)
    const data = await res.json()
    return new Float32Array(data.embedding.values)
  }

  async embedQuery(text) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'models/text-embedding-004',
          content: { parts: [{ text }] },
          taskType: 'RETRIEVAL_QUERY',
        }),
      }
    )
    if (!res.ok) throw new Error(`Embedding API error: ${res.status}`)
    const data = await res.json()
    return new Float32Array(data.embedding.values)
  }

  cosineSimilarity(a, b) {
    let dot = 0, normA = 0, normB = 0
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i]
      normA += a[i] * a[i]
      normB += b[i] * b[i]
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB))
  }

  async initialize(chunks) {
    if (this.isInitialized) return
    if (this.initPromise) return this.initPromise

    this.initPromise = (async () => {
      console.log('[VectorDB] Initializing with', chunks.length, 'chunks...')

      const cacheKey = 'mithun_portfolio_embeddings_v4'
      const cached = sessionStorage.getItem(cacheKey)

      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          this.vectors = parsed.map((item) => ({
            embedding: new Float32Array(item.embedding),
            text: item.text,
            index: item.index,
          }))
          this.isInitialized = true
          console.log('[VectorDB] Loaded', this.vectors.length, 'vectors from cache')
          return
        } catch { /* cache corrupted, re-embed */ }
      }

      for (let i = 0; i < chunks.length; i += 3) {
        const batch = chunks.slice(i, i + 3)
        const embeddings = await Promise.all(batch.map(chunk => this.embed(chunk)))
        embeddings.forEach((emb, j) => {
          this.vectors.push({ embedding: emb, text: chunks[i + j], index: i + j })
        })
        if (i + 3 < chunks.length) await new Promise(r => setTimeout(r, 200))
      }

      try {
        const toCache = this.vectors.map(v => ({
          embedding: Array.from(v.embedding),
          text: v.text,
          index: v.index,
        }))
        sessionStorage.setItem(cacheKey, JSON.stringify(toCache))
      } catch { /* storage full */ }

      this.isInitialized = true
      console.log('[VectorDB] Indexed', this.vectors.length, 'vectors')
    })()

    return this.initPromise
  }

  async search(query, topK = 4) {
    if (!this.isInitialized) throw new Error('Vector store not initialized')
    const queryEmbedding = await this.embedQuery(query)
    const scores = this.vectors.map(v => ({
      text: v.text,
      index: v.index,
      score: this.cosineSimilarity(queryEmbedding, v.embedding),
    }))
    scores.sort((a, b) => b.score - a.score)
    const results = scores.slice(0, topK)
    console.log('[RAG Retriever] Top:', results.map(r => `Chunk${r.index}(${(r.score * 100).toFixed(1)}%)`).join(', '))
    return results
  }
}

const vectorStore = new VectorStore()

// ── Step 3: RAG Chain — Retrieve + Generate ──
async function ragQuery(query, chatHistory) {
  const retrievedDocs = await vectorStore.search(query, 4)
  const context = retrievedDocs.map(d => d.text).join('\n\n')

  const ragSystemPrompt = `You are Mithun's AI portfolio assistant. Answer the user's question based ONLY on the retrieved context below. Be friendly, concise (2-4 sentences), and professional. Speak as if you represent Mithun. If a question is outside the context, politely say you don't have that information and suggest contacting Mithun directly.

Retrieved Context (from Vector Database):
${context}

Important: Only use information from the retrieved context above.`

  const contents = [
    { role: 'user', parts: [{ text: ragSystemPrompt + '\n\nAcknowledge you understand this context.' }] },
    { role: 'model', parts: [{ text: "I'm Mithun's AI assistant! I have his profile loaded via RAG. Ask me anything!" }] },
    ...chatHistory.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
  ]

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, topP: 0.9, topK: 40, maxOutputTokens: 400 },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      }),
    }
  )

  if (!res.ok) throw new Error(`Gemini LLM ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Empty LLM response')
  return text
}

// ── Offline fallback ──
function offlineFallback(question) {
  const q = question.toLowerCase()
  if (q.includes('skill') || q.includes('tech') || q.includes('stack'))
    return "My technical skills include Python, Java, SQL, Power BI, Git, React, and more. I'm strongest in Python, JavaScript, and SQL."
  if (q.includes('project'))
    return "I've built 12+ projects including Time2Order, TrueSight AI (won 2nd prize), Dakshaa T26, AutoRevives, Neurobloom, and more!"
  if (q.includes('education') || q.includes('college'))
    return "I'm pursuing B.Tech in AI & Data Science at KSRCT (2023-2027)."
  if (q.includes('contact') || q.includes('email') || q.includes('hire'))
    return "Reach me at mithunmithun71548@gmail.com or LinkedIn: linkedin.com/in/mithun-p2006/"
  if (q.includes('who') || q.includes('about') || q.includes('yourself') || q.includes('tell'))
    return "I'm Mithun P, a Data Analytics student specializing in AI & Data Science at KSRCT."
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return "Hey! 👋 I'm Mithun's AI assistant. Ask me about his skills, projects, education, or anything!"
  return "I can tell you about Mithun's skills, projects, education, and more. What would you like to know?"
}

// ── UI Components ──
const TERMINAL_COMMANDS = {
  help: `Available commands:
  about      — Who is Mithun?
  skills     — Technical skills
  projects   — Featured projects
  education  — Academic background
  contact    — Get in touch
  socials    — Social media links
  clear      — Clear terminal
  
Or type any question to ask the AI assistant.`,
  about: "I'm Mithun P, a passionate Data Analytics student pursuing B.Tech in AI & Data Science at KSRCT. I bridge the gap between data and decisions — from Power BI dashboards to full-stack web apps. 3+ years of coding experience with 12+ real-world projects.",
  skills: `Technical Skills:
  Python ████████████████████ 90%
  HTML/CSS ████████████████████ 90%
  JavaScript ██████████████████ 88%
  React ██████████████████ 85%
  SQL ██████████████████ 85%
  Tailwind CSS ██████████████████ 85%
  Power BI ████████████████ 80%
  Flask ████████████████ 80%
  Java ██████████████ 75%
  Three.js ████████████ 70%`,
  projects: `Featured Projects:
  [1] TrueSight AI — Deepfake detection (Won 2nd Prize)
  [2] Dakshaa T26 — Event registration system (Live)
  [3] Time2Order — Preorder management (Live)
  [4] Time2Due — Operations management (Live)
  [5] AutoRevives — Vehicle auction platform (Live)
  [6] Neurobloom — AI Mental Wellness (Hackathon)
  
Type a project name for more details.`,
  education: "B.Tech in AI & Data Science at K.S. Rangasamy College of Technology (2023-2027). Completed 10-week AI/ML virtual internship. Won 2nd Prize for TrueSight AI. Presented deepfake detection research to Namakkal Cyber Cell.",
  contact: `Contact Info:
  Email    → mithunmithun71548@gmail.com
  Phone    → 8122762374
  Location → Erode, Tamil Nadu, India
  Portfolio → mithunp.me`,
  socials: `Social Links:
  GitHub   → github.com/mithun-p
  LinkedIn → linkedin.com/in/mithun-p2006/
  Discord  → discordapp.com/users/944594954313932841
  WhatsApp → wa.me/918122762374`,
}

function TerminalLine({ entry, isLatest }) {
  return (
    <div className="mb-3">
      {entry.command && (
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-emerald-400">mithun@portfolio</span>
          <span className="text-slate-600">:</span>
          <span className="text-cyan">~</span>
          <span className="text-slate-500">$</span>
          <span className="text-slate-300 ml-1">{entry.command}</span>
        </div>
      )}
      {entry.output && (
        <motion.pre
          initial={isLatest ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-mono text-slate-400 mt-1 whitespace-pre-wrap leading-relaxed pl-2 border-l border-white/[0.04]"
        >
          {entry.output}
        </motion.pre>
      )}
    </div>
  )
}

// ── Main Chatbot (Interactive Terminal) ──
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState([
    { output: 'Welcome to MithunOS v2.0 — Type "help" to get started.' },
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const [dbReady, setDbReady] = useState(false)
  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    async function initDB() {
      try {
        await vectorStore.initialize(DOCUMENT_CHUNKS)
        setDbReady(true)
      } catch (err) {
        console.warn('[RAG] Init failed:', err.message)
      }
    }
    initDB()
  }, [])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isProcessing])

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const executeCommand = useCallback(
    async (text) => {
      const trimmed = (text || input).trim()
      if (!trimmed || isProcessing) return
      setInput('')

      const cmd = trimmed.toLowerCase()

      // Handle 'clear' command
      if (cmd === 'clear') {
        setHistory([{ output: 'Terminal cleared. Type "help" for commands.' }])
        return
      }

      // Check if it's a built-in command
      if (TERMINAL_COMMANDS[cmd]) {
        setHistory(prev => [...prev, { command: trimmed, output: TERMINAL_COMMANDS[cmd] }])
        return
      }

      // Otherwise, treat as AI query
      setHistory(prev => [...prev, { command: trimmed, output: '⏳ Querying AI...' }])
      setIsProcessing(true)

      try {
        let reply
        if (dbReady) {
          const chatHistory = history
            .filter(h => h.command)
            .flatMap(h => [
              { role: 'user', content: h.command },
              { role: 'assistant', content: h.output },
            ])
          reply = await ragQuery(trimmed, chatHistory)
        } else {
          reply = offlineFallback(trimmed)
        }
        setHistory(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { command: trimmed, output: reply }
          return updated
        })
      } catch (err) {
        console.warn('[RAG] Error:', err.message)
        setHistory(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { command: trimmed, output: offlineFallback(trimmed) }
          return updated
        })
      } finally {
        setIsProcessing(false)
      }
    },
    [input, isProcessing, history, dbReady]
  )

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); executeCommand() }
  }

  // Random star positions for background
  const stars = useRef(
    Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }))
  ).current

  return (
    <>
      {/* Floating chatbot button with custom image */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
        style={{
          background: isOpen ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'transparent',
          boxShadow: isOpen
            ? '0 8px 30px rgba(239,68,68,0.3)'
            : '0 8px 30px rgba(99,102,241,0.3)',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? 'Close terminal' : 'Open terminal'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
              <img src="/chatbot.png" alt="Chat" className="w-14 h-14 object-cover rounded-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
        {showPulse && !isOpen && (
          <motion.div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        )}
      </motion.button>

      {/* Interactive Terminal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[59] w-[calc(100vw-2rem)] sm:w-[480px] max-h-[75vh] flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={{ background: '#0c0c14' }}
          >
            {/* Starry background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {stars.map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/30"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                  }}
                  animate={{ opacity: [0.1, 0.6, 0.1] }}
                  transition={{ duration: 2 + star.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>

            {/* Header */}
            <div className="relative z-10 px-6 pt-5 pb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-accent" style={{ backgroundSize: '200% auto' }}>
                Interactive Terminal
              </h2>
              <p className="text-sm text-slate-500 mt-1">Explore my profile through commands</p>
            </div>

            {/* Terminal body */}
            <div className="relative z-10 mx-4 mb-3 flex-1 flex flex-col rounded-xl border border-white/[0.08] overflow-hidden" style={{ background: '#0a0a10' }}>
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 ml-2">mithun@portfolio:~</span>
              </div>

              {/* Terminal content */}
              <div className="flex-1 overflow-y-auto p-4 min-h-[220px] max-h-[350px] space-y-1">
                {history.map((entry, i) => (
                  <TerminalLine key={i} entry={entry} isLatest={i === history.length - 1} />
                ))}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-sm font-mono text-accent"
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ●
                    </motion.span>
                    <span className="text-slate-500">Processing...</span>
                  </motion.div>
                )}
                <div ref={terminalEndRef} />
              </div>

              {/* Command input */}
              <div className="border-t border-white/[0.06] px-4 py-3 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-accent flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a command..."
                    disabled={isProcessing}
                    className="flex-1 bg-transparent text-sm font-mono text-white placeholder-slate-600 outline-none disabled:opacity-50"
                    style={{ cursor: 'text' }}
                  />
                  <button
                    onClick={() => executeCommand()}
                    disabled={!input.trim() || isProcessing}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-accent hover:bg-accent/10 disabled:opacity-30 transition-all"
                    style={{ cursor: 'pointer' }}
                  >
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
