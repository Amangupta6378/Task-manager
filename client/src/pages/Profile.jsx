import React from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Profile() {
  const { user } = useAuth()
  if (!user) return <div>Not logged in</div>
  return (
    <div className="p-6">
      <h2 className="text-xl">Profile</h2>
      <div className="mt-4">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.role}</div>
      </div>
    </div>
  )
}
