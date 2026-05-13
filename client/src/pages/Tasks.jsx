import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { useAuth } from '../hooks/useAuth.jsx'
import TaskTable from '../components/TaskTable'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'

export default function Tasks(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const { user } = useAuth()

  useEffect(()=>{
    setLoading(true)
    api.get('/tasks')
      .then(res=>setTasks(res.data))
      .catch(()=>toast.error('Failed to load tasks'))
      .finally(()=>setLoading(false))
  },[])

  const create = async e => {
    e.preventDefault()
    try{
      const payload = { title, dueDate: dueDate || null }
      const res = await api.post('/tasks', payload)
      setTasks(prev=>[res.data, ...prev])
      setTitle('')
      setDueDate('')
      toast.success('Task created')
    }catch(err){
      toast.error(err?.response?.data?.message || 'Create failed')
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl mb-4">Tasks</h1>

        <section className="mb-4">
          {(user?.role) && (
            <form onSubmit={create} className="bg-white p-4 rounded shadow w-full max-w-md">
              <div className="mb-2"><input placeholder="Title" className="w-full p-2 border" value={title} onChange={e=>setTitle(e.target.value)} /></div>
              <div className="mb-2"><input type="date" className="w-full p-2 border" value={dueDate} onChange={e=>setDueDate(e.target.value)} /></div>
              <button className="bg-[#2563eb] text-white px-3 py-2 rounded">Create Task</button>
            </form>
          )}
        </section>

        <section className="bg-white p-4 rounded shadow">
          {loading ? <div className="animate-pulse">Loading tasks...</div> : (
            tasks.length === 0 ? <div className="text-gray-600">No tasks yet.</div> : <TaskTable tasks={tasks} />
          )}
        </section>
      </main>
    </div>
  )
}
