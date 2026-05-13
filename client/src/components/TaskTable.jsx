import React from 'react'

export default function TaskTable({ tasks }) {
  const now = Date.now()
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Title</th>
          <th className="px-4 py-2 text-left">Assigned</th>
          <th className="px-4 py-2 text-left">Due</th>
          <th className="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => {
          const overdue = task.dueDate && new Date(task.dueDate).getTime() < now && task.status !== 'Done'
          return (
            <tr key={task._id} className="border-t">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.assignedTo?.name || '—'}</td>
              <td className="px-4 py-2">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}{overdue && <span className="ml-2 text-red-600 font-semibold">Overdue</span>}</td>
              <td className="px-4 py-2">{task.status}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
