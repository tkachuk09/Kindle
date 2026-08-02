import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HabitList from './HabitList'

function HabitDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open habits"
        className="fixed top-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/70 text-neutral-300 backdrop-blur transition-colors hover:border-amber-500/50 hover:text-amber-200"
      >
        <span className="text-lg leading-none">☰</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="panel"
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-neutral-800 bg-neutral-950/95 p-6 backdrop-blur overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-amber-50">Habits</h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close habits"
                  className="text-neutral-500 hover:text-neutral-200"
                >
                  ✕
                </button>
              </div>
              <HabitList />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default HabitDrawer
