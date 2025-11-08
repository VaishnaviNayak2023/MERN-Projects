import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function TaskList() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  const fetchTasks = async () => {
    const res = await api.get('/tasks', user.token)
    setTasks(res)
  }

  useEffect(() => { fetchTasks() }, [])

  const filteredTasks = tasks.filter(t =>
    filter === 'All' ? true : t.status === filter
  )

  return (
    <div>
      <TaskForm onTaskCreated={t => setTasks([t, ...tasks])} />
      <div className="mb-4 flex space-x-2">
        {['All', 'Pending', 'Completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {f}
          </button>
        ))}
      </div>
      {filteredTasks.map(t => (
        <TaskItem
          key={t._id}
          task={t}
          onUpdate={updated => setTasks(tasks.map(x => x._id === updated._id ? updated : x))}
          onDelete={id => setTasks(tasks.filter(x => x._id !== id))}
        />
      ))}
    </div>
  )
}
