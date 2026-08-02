import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function App() {
  const [health, setHealth] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then(setHealth)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-semibold tracking-tight">
          🔥 Kindle
        </h1>
        <p className="text-neutral-400">project skeleton is alive</p>
        <p className="text-sm text-neutral-500">
          {error && `api error: ${error}`}
          {health && `api: ${health.status} · db: ${health.db}`}
          {!health && !error && 'checking api...'}
        </p>
      </motion.div>
    </div>
  )
}

export default App