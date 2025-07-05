import axios from 'axios'
import router from '@/router'


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const saved = localStorage.getItem('access_token')
if (saved) {
  api.defaults.headers.common['Authorization'] = `Bearer ${saved}`
}
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  r => r,
  async err => {
    const req = err.config
    if (req.url?.includes('/auth/')) {
      return Promise.reject(err)
    }
    if (err.response?.status === 401 && !req._retry) {
      req._retry = true
      const rt = localStorage.getItem('refresh_token')
      if (rt) {
        try {
          const { data } = await api.post('/auth/refresh', { refresh_token: rt })
          localStorage.setItem('access_token', data.access_token)
          api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
          req.headers['Authorization'] = `Bearer ${data.access_token}`
          return api(req)
        } catch {
        }
      }
    }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push({ name: 'Access' })
    return Promise.reject(err)
  }
)
