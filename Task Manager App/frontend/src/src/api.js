import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = {
  get: async (path, token) => {
    const res = await axios.get(`${API_URL}/api${path}`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    })
    return res.data
  },
  post: async (path, body, token) => {
    const res = await axios.post(`${API_URL}/api${path}`, body, {
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    })
    return res.data
  },
  put: async (path, body, token) => {
    const res = await axios.put(`${API_URL}/api${path}`, body, {
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    })
    return res.data
  },
  delete: async (path, token) => {
    const res = await axios.delete(`${API_URL}/api${path}`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    })
    return res.data
  },
}

export default api
