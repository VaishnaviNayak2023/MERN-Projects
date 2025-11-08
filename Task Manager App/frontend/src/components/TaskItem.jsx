import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function TaskItem({ task, onUpdate, onDelete }) {
  const { user } = useAuth()

  const toggleStatus = async () => {
    const res = await api.put(`/tasks/${task._id}`, { status: task.status === 'Pending' ? 'Completed' : 'Pending' }, user.token)
    onUpdate(res)
  }

  const handleDelete = async () => {
    await api.delete(`/tasks/${task._id}`, user.token)
    onDelete(task._id)
  }

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded shadow mb-2">
      <div>
        <h3 className={`font-semibold ${task.status === 'Completed' ? 'line-through' : ''}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-500">{task.priority}</p>
      </div>
      <div className="space-x-2">
        <button onClick={toggleStatus} className="px-2 py-1 rounded bg-green-500 text-white">
          {task.status === 'Pending' ? 'Complete' : 'Undo'}
        </button>
        <button onClick={handleDelete} className="px-2 py-1 rounded bg-red-500 text-white">
          Delete
        </button>
      </div>
    </div>
  )
}
