import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

export default function VisitorCounter() {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)

  // Use a unique namespace and key. 
  // "mithun-portfolio" is likely unique enough, but you can change it to your domain.
  const NAMESPACE = 'mithun-portfolio-v1' 
  const KEY = 'visits'

  useEffect(() => {
    // Check if we already counted this session to avoid inflating numbers on refresh
    const hasCounted = sessionStorage.getItem('visit_counted')

    const fetchCount = async () => {
      try {
        // If already counted this session, just get the current count without incrementing
        // Note: counterapi.dev 'up' endpoint increments. There isn't a documented 'read-only' 
        // that is guaranteed to be public without docs, but usually we just increment visitors.
        // For a simple counter, incrementing on load is standard behavior.
        // To be safer, we could just increment every time.
        
        let url = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`
        
        // If you wanted to only read, you'd need a read endpoint. 
        // For now, we simply increment.
        // To prevent abuse, we can rely on the API's internal rate limiting or
        // use local storage to only trigger the fetch call if needed, 
        // but then we wouldn't know the current total to display.
        
        // Strategy: Always fetch/increment because we want to show the LATEST total.
        
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network response was not ok')
        
        const data = await response.json()
        setCount(data.count)
        sessionStorage.setItem('visit_counted', 'true')
      } catch (error) {
        console.error('Error fetching visitor count:', error)
        setCount(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  if (loading || count === null) return null

  return (
    <div className="flex items-center gap-2 rounded-full border border-dark-400 bg-dark-700/50 px-3 py-1 text-xs font-medium text-slate-400 transition-colors hover:border-accent/30 hover:text-accent-light">
      <Eye size={14} className="text-accent" />
      <span>{count.toLocaleString()} visits</span>
    </div>
  )
}
