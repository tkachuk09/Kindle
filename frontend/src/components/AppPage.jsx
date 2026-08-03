import { motion } from 'framer-motion'
import HabitList from './HabitList'

function AppPage({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-6 py-10 text-neutral-100"
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      <div className="mx-auto mb-10 flex max-w-md items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="text-sm text-neutral-500 transition-colors hover:text-amber-200"
        >
          ← Kindle
        </button>
        <h1 className="text-lg font-semibold text-amber-50">Habits</h1>
        <span className="w-14" />
      </div>

      <HabitList />
    </motion.div>
  )
}

export default AppPage
