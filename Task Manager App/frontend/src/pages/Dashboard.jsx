import TaskList from '../components/TaskList'

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>
      <TaskList />
    </div>
  )
}
