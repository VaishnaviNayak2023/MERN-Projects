import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await api.post('/users/register', { name, email, password })
    if (data?.token) {
      login(data)
      navigate('/')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
    </div>
  )
}
