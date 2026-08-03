import { motion } from 'framer-motion'
import Hero from './Hero'
import ProductDescription from './ProductDescription'

function LandingPage({ onNavigate }) {
  return (
    <div className="relative min-h-screen text-neutral-100">
      <motion.button
        onClick={() => onNavigate('/app')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        aria-label="Open habits"
        className="fixed top-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/70 text-neutral-300 backdrop-blur transition-colors hover:border-amber-500/50 hover:text-amber-200"
      >
        <span className="text-lg leading-none">☰</span>
      </motion.button>

      <Hero />
      <ProductDescription />
    </div>
  )
}

export default LandingPage
