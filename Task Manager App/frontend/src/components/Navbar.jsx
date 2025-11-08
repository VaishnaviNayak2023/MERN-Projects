import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark } = useTheme()

  return (
    <nav className={`p-4 shadow-md ${dark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">Task Manager</Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user && <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Logout</button>}
        </div>
      </div>
    </nav>
  )
}
