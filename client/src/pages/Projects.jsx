import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { useAuth } from '../hooks/useAuth.jsx'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'

export default function Projects(){
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { user } = useAuth()

  useEffect(()=>{
    setLoading(true)
    api.get('/projects')
      .then(res=>setProjects(res.data))
      .catch(()=>toast.error('Failed to load projects'))
      .finally(()=>setLoading(false))
  },[])

  const create = async e => {
    e.preventDefault()
    try{
      const res = await api.post('/projects', { title, description, members: [] })
      setProjects(prev=>[res.data, ...prev])
      setTitle('')
      setDescription('')
      toast.success('Project created')
    }catch(err){
      toast.error(err?.response?.data?.message || 'Create failed')
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl mb-4">Projects</h1>
        {user?.role === 'Admin' && (
          <form onSubmit={create} className="mb-4 bg-white p-4 rounded shadow">
            <div className="mb-2"><input placeholder="Title" className="w-full p-2 border" value={title} onChange={e=>setTitle(e.target.value)} /></div>
            <div className="mb-2"><input placeholder="Description" className="w-full p-2 border" value={description} onChange={e=>setDescription(e.target.value)} /></div>
            <button className="bg-[#2563eb] text-white px-3 py-2 rounded">Create Project</button>
          </form>
        )}

        <section className="grid gap-4">
          {loading ? <div className="animate-pulse">Loading projects...</div> : (
            projects.length === 0 ? <div className="text-gray-600">No projects yet.</div> : projects.map(p=> (
              <div key={p._id} className="bg-white p-4 rounded shadow">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
                <div className="text-xs mt-2 text-gray-500">Owner: {p.owner?.name || '—'}</div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  )
}
