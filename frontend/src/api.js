const BASE = '/api/habits'

export async function fetchHabits() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('failed to load habits')
  return res.json()
}

export async function createHabit(habit) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit),
  })
  if (!res.ok) throw new Error('failed to create habit')
  return res.json()
}

export async function updateHabit(id, habit) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit),
  })
  if (!res.ok) throw new Error('failed to update habit')
}

export async function deleteHabit(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('failed to delete habit')
}
