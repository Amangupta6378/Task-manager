import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Sidebar() {
  const { user, logout } = useAuth()
  if (!user) return null
  return (
    <aside className="w-64 bg-[#0f172a] text-white min-h-screen p-4">
      <div className="mb-6">
        <div className="text-xl font-semibold">Team Task Manager</div>
      </div>
      <div className="mb-6">
        <div className="text-sm">{user?.name}</div>
        <div className="text-xs opacity-80">{user?.role}</div>
      </div>
      <nav>
        <ul>
          <li className="py-2"><NavLink to="/" end className={({isActive})=>isActive? 'font-bold':'opacity-90'}>Dashboard</NavLink></li>
          <li className="py-2"><NavLink to="/projects" className={({isActive})=>isActive? 'font-bold':'opacity-90'}>Projects</NavLink></li>
          <li className="py-2"><NavLink to="/tasks" className={({isActive})=>isActive? 'font-bold':'opacity-90'}>Tasks</NavLink></li>
        </ul>
      </nav>
      <div className="mt-6">
        <button onClick={logout} className="text-sm bg-white text-[#0f172a] px-3 py-1 rounded">Sign out</button>
      </div>
    </aside>
  )
}
