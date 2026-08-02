import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl font-semibold tracking-tight"
      >
        🔥 Kindle
      </motion.h1>
    </div>
  )
}

export default App