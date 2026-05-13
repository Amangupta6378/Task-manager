import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import TaskTable from '../components/TaskTable'
import api from '../api/api'
import toast, { Toaster } from 'react-hot-toast'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => toast.error('Failed to load tasks'))
      .finally(() => setLoading(false))
  }, [])

  const assignedToMe = tasks.filter(t => t.assignedTo)
  const inProgress = tasks.filter(t => t.status === 'In Progress')
  const completed = tasks.filter(t => t.status === 'Done')
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate).getTime() < Date.now() && t.status !== 'Done')

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Toaster />
        <h1 className="text-2xl mb-6">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card title="Assigned to Me" value={assignedToMe.length} />
          <Card title="In Progress" value={inProgress.length} />
          <Card title="Completed" value={completed.length} />
          <Card title="Overdue" value={overdue.length} highlight />
        </div>

        <section className="bg-white p-4 rounded shadow">
          {loading ? <div className="animate-pulse">Loading tasks...</div> : <TaskTable tasks={tasks} />}
        </section>
      </main>
    </div>
  )
}

function Card({ title, value, highlight }) {
  return (
    <div className={`p-4 rounded ${highlight ? 'border-l-4 border-red-500' : 'bg-white'} shadow`}> 
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
