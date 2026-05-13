import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import toast from 'react-hot-toast'

export default function Register(){
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    try{
      setLoading(true)
      await register(name, email, password)
      toast.success('Registered')
      navigate('/')
    }catch(err){
      toast.error(err?.response?.data?.message || 'Registration failed')
    }finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg mb-4">Create account</h2>
        <label className="block mb-2">Name<input className="w-full p-2 border" value={name} onChange={e=>setName(e.target.value)} /></label>
        <label className="block mb-2">Email<input className="w-full p-2 border" value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <label className="block mb-4">Password<input type="password" className="w-full p-2 border" value={password} onChange={e=>setPassword(e.target.value)} /></label>
        <button className="w-full bg-[#2563eb] text-white p-2 rounded" disabled={loading}>{loading? 'Creating...' : 'Create account'}</button>
        <div className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></div>
      </form>
    </div>
  )
}
