import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('ttm_token'))
  const [loading, setLoading] = useState(Boolean(token))

  useEffect(() => {
    if (!token) return setLoading(false)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => { setUser(null); setToken(null); localStorage.removeItem('ttm_token') })
      .finally(() => setLoading(false))
  }, [token])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const t = res.data.token
    setToken(t)
    localStorage.setItem('ttm_token', t)
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`
    setUser(res.data.user)
  }

  const register = async (name, email, password, role = 'Member') => {
    const res = await api.post('/auth/register', { name, email, password, role })
    const t = res.data.token
    setToken(t)
    localStorage.setItem('ttm_token', t)
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`
    setUser(res.data.user)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('ttm_token')
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
