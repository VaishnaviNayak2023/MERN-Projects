import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Low')
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const res = await api.post('/tasks', { title, priority }, user.token)
    onTaskCreated(res)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-grow p-2 rounded border dark:bg-gray-800"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-2 rounded border">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button className="bg-blue-600 text-white px-4 rounded">Add</button>
    </form>
  )
}
