import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight, Cpu, Layers, Database } from 'lucide-react'

const PROJECTS = [
  {
    title: 'AutoRevives',
    subtitle: 'Vehicle Bidding Platform',
    description: 'A comprehensive auction system for vehicles. Users can list cars, place real-time bids, and manage auctions.',
    stack: ['Python', 'Flask', 'HTML/CSS/JS', 'SQL'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    type: 'Full Stack',
    icon: <Database size={20} />
  },
  {
    title: 'Propic',
    subtitle: 'Cleaning Supplies E-commerce',
    description: 'Specialized e-commerce platform for cleaning products. Features dynamic inventory management and cart system.',
    stack: ['Python', 'Flask', 'HTML/CSS/JS'],
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80',
    type: 'Full Stack',
    icon: <Layers size={20} />
  },
  {
    title: 'Pashuthalam',
    subtitle: 'Veterinary Dosage Control',
    description: 'SIH Project. Prevents animal drug overdose and disease spread. Integrated Twilio Voice API for automated critical alerts.',
    stack: ['Python', 'Flask', 'Twilio API', 'Web Technologies'],
    image: 'https://thumbs.dreamstime.com/z/many-broiler-chickens-out-grass-sunset-free-range-chicken-tractor-pasture-186087851.jpg?ct=jpeg',
    type: 'Healthcare Tech',
    award: 'SIH Project',
    icon: <Cpu size={20} />
  },
  {
    title: 'Neurobloom',
    subtitle: 'AI Mental Wellness Platform',
    description: 'Nallas Hackathon. Detects user emotions via GPU-trained model to play therapeutic Spotify playlists. Features an open-world relaxation game.',
    stack: ['Python', 'GPU Training', 'Three.js', 'Spotify API'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    type: 'AI / Game Dev',
    award: 'Hackathon Win',
    icon: <Cpu size={20} />
  },
  {
    title: 'Time2Bus',
    subtitle: 'Real-time Bus Tracking',
    description: 'Nandha Hackathon. IoT-enabled bus tracking system. Driver app updates location, passengers see stops, speakers announce arrivals.',
    stack: ['IoT Integration', 'Geolocation', 'Web Socket', 'Python'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
    type: 'IoT / Web',
    status: 'In Development',
    icon: <Database size={20} />
  },
  /* Previous Projects */
  {
    title: 'Time2Order',
    subtitle: 'Preorder Management System',
    description: 'Built a web-based + soundbox system for local shops using Python, SQL, Cashfree API.',
    stack: ['Python', 'SQL', 'Cashfree API'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    type: 'Full Stack',
    icon: <Database size={20} />
  },
  {
    title: 'Time2Due',
    subtitle: 'Operations Management Platform',
    description: 'Platform for cable operators to manage employees and offline payments.',
    stack: ['Full Stack', 'Operations', 'Payments'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    type: 'Full Stack',
    icon: <Layers size={20} />
  },
  {
    title: 'Time2Farm',
    subtitle: 'Farm Finance & AI Insights',
    description: 'Farmer-focused finance tracking app using Gemini API for AI-powered insights.',
    stack: ['Gemini API', 'AI', 'Finance'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    type: 'AI / ML',
    icon: <Cpu size={20} />
  },
  {
    title: 'Steam Game Analysis',
    subtitle: 'Power BI Dashboard',
    description: 'Power BI dashboard analyzing player engagement and pricing trends on Steam.',
    stack: ['Power BI', 'Analytics', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    type: 'Data',
    icon: <Database size={20} />
  },
  {
    title: 'QR Attendance',
    subtitle: 'Event Attendance System',
    description: 'QR-based event attendance system using POST APIs for real-time tracking.',
    stack: ['QR Code', 'REST API', 'Events'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    type: 'Full Stack',
    icon: <Layers size={20} />
  },
  {
    title: 'Dakshaa T26',
    subtitle: 'Full Stack Web Application',
    description: 'React + Node + Express + Supabase + Payment Integration + Cloudflare deployment.',
    stack: ['React', 'Node.js', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    type: 'Full Stack',
    icon: <Layers size={20} />
  },
  {
    title: 'TrueSight AI',
    subtitle: 'Deepfake Detection System',
    description: 'AI-powered deepfake detection using Roboflow models + Flask backend. Presented to Namakkal Cyber Cell. Won Second Prize.',
    stack: ['Roboflow', 'Flask', 'AI/ML'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    type: 'AI / ML',
    award: '2nd Prize',
    icon: <Cpu size={20} />
  }
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mb-24">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-12 bg-accent" />
              <span className="text-accent font-mono tracking-widest uppercase text-sm">Selected Works</span>
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            >
             ENGINEERING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">SOLUTIONS.</span>
           </motion.h2>
        </div>

        {/* Projects List - Vertical Cinematic Cards */}
        <div className="space-y-32">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image / Visual Side */}
              <div className="w-full lg:w-3/5 group">
                <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem]">
                   <div className="absolute inset-0 bg-accent/20 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                   
                   <img 
                     src={project.image} 
                     alt={project.title} 
                     className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   
                   {/* Floating Tech Stack */}
                   <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                         <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white">
                           {tech}
                         </span>
                      ))}
                   </div>
                </div>
              </div>

              {/* Text / Info Side */}
              <div className="w-full lg:w-2/5 relative">
                 {/* Decorative index number */}
                 <div className="absolute -top-20 -left-10 text-[10rem] font-bold text-white/[0.02] pointer-events-none select-none">
                    0{i + 1}
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="p-2 rounded-lg bg-accent/10 text-accent">
                         {project.icon}
                       </span>
                       <span className="text-accent-light font-mono text-sm tracking-wider">{project.type}</span>
                       {project.award && (
                          <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/20 uppercase tracking-wide">
                            {project.award}
                          </span>
                       )}
                       {project.status && (
                          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wide">
                            {project.status}
                          </span>
                       )}
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-xl text-slate-400 font-light mb-6">{project.subtitle}</p>
                    
                    <div className="h-px w-20 bg-accent/30 mb-6" />
                    
                    <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                       {project.description}
                    </p>

                    <button className="group flex items-center gap-3 text-white font-semibold hover:text-accent transition-colors">
                       <span>Explore Case Study</span>
                       <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
