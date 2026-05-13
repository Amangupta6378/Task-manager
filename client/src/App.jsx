import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'

function Protected({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-6">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Protected><Projects/></Protected>} />
          <Route path="/tasks" element={<Protected><Tasks/></Protected>} />
          <Route path="/profile" element={<Protected><Profile/></Protected>} />
          <Route path="/" element={<Protected><Dashboard/></Protected>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
