import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchHabits, createHabit, updateHabit, deleteHabit } from '../api'

const PALETTE = ['#fb923c', '#f472b6', '#38bdf8', '#4ade80', '#a78bfa', '#facc15']

function colorFor(index) {
  return PALETTE[index % PALETTE.length]
}

function HabitList() {
  const [habits, setHabits] = useState([])
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchHabits()
      .then(setHabits)
      .catch((e) => setError(e.message))
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    try {
      const habit = await createHabit({
        name: trimmed,
        icon: icon.trim(),
        color: colorFor(habits.length),
      })
      setHabits((prev) => [...prev, habit])
      setName('')
      setIcon('')
    } catch (e) {
      setError(e.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteHabit(id)
      setHabits((prev) => prev.filter((h) => h.id !== id))
    } catch (e) {
      setError(e.message)
    }
  }

  function startEdit(habit) {
    setEditingId(habit.id)
    setEditingName(habit.name)
  }

  async function commitEdit(habit) {
    const trimmed = editingName.trim()
    setEditingId(null)
    if (!trimmed || trimmed === habit.name) return
    try {
      await updateHabit(habit.id, { ...habit, name: trimmed })
      setHabits((prev) =>
        prev.map((h) => (h.id === habit.id ? { ...h, name: trimmed } : h)),
      )
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="🔥"
          maxLength={2}
          className="w-12 rounded-lg bg-neutral-900 border border-neutral-800 text-center text-lg text-neutral-100 focus:outline-none focus:border-amber-500/50"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a habit..."
          className="flex-1 rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-500/50"
        />
        <button
          type="submit"
          className="rounded-lg bg-amber-500/90 px-4 py-2 text-neutral-950 font-medium hover:bg-amber-400 transition-colors"
        >
          Add
        </button>
      </form>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {habits.map((h) => (
            <motion.li
              key={h.id}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center gap-3 rounded-lg bg-neutral-900/60 border border-neutral-800 px-4 py-3 group"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
                style={{ backgroundColor: `${h.color}22`, color: h.color }}
              >
                {h.icon || '·'}
              </span>

              {editingId === h.id ? (
                <input
                  autoFocus
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => commitEdit(h)}
                  onKeyDown={(e) => e.key === 'Enter' && commitEdit(h)}
                  className="flex-1 bg-transparent border-b border-neutral-700 text-neutral-100 focus:outline-none"
                />
              ) : (
                <span
                  className="flex-1 cursor-text text-neutral-200"
                  onClick={() => startEdit(h)}
                >
                  {h.name}
                </span>
              )}

              <button
                onClick={() => handleDelete(h.id)}
                className="text-neutral-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                aria-label="Delete habit"
              >
                ✕
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {habits.length === 0 && !error && (
        <p className="text-center text-neutral-600 text-sm mt-8">
          No habits yet — add your first one above.
        </p>
      )}
    </div>
  )
}

export default HabitList
