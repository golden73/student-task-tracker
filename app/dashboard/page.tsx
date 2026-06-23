'use client';
import { useTasks } from '../context/TaskContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard() {
  const { tasks, toggleStatus } = useTasks();
  const router = useRouter();

  const isOverdue = (task: { dueDate: string; status: string }) =>
    task.status !== 'Completed' && new Date(task.dueDate) < new Date();

  const stats = [
    { id: 'total', label: 'Total Tasks', value: tasks.length },
    { id: 'complete', label: 'Complete', value: tasks.filter(t => t.status === 'Completed').length },
    { id: 'pending', label: 'Pending', value: tasks.filter(t => t.status === 'Pending').length },
    { id: 'overdue', label: 'Overdue', value: tasks.filter(isOverdue).length },
  ];

  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed' | 'Overdue'>('All');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Overdue') return isOverdue(task);
    return task.status === filter;
  });

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) return dueDate; // fallback if unparsable
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const priorityColor: Record<'Low' | 'Medium' | 'High', string> = {
    Low: '#03ffa3',
    Medium: '#fbbf24',
    High: '#f87171',
  };

  const toggleComplete = (id: string, currentStatus: string) => {
    // Wire this to your context's update function, e.g.:
    // updateTask(id, { status: currentStatus === 'Completed' ? 'Pending' : 'Completed' });
  };

  return (
    <main>
      <section className="displayView">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <button className="btn-primary" onClick={() => router.push('/tasks')}>
            + Add Task
          </button>
        </div>

        <div className="cards">
          {stats.map((stat) => (
            <div key={stat.id} className={`card-${stat.id}`}>
              <h3>{stat.label}</h3>
              <p style={{ fontSize: '20px' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="filter-bar">
          {(['All', 'Pending', 'Completed', 'Overdue'] as const).map(status => (
            <button
              key={status}
              className={filter === status ? 'filter-active' : ''}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="recent-tasks">
          <h2>{filter === 'All' ? 'All Tasks' : `${filter} Tasks`}</h2>
          {filteredTasks.length === 0 ? (
            <p>Nothing here — you&apos;re all caught up.</p>
          ) : (
            <ul className="task-list">
              {filteredTasks.map(task => (
                <li key={task.id} className="task-list-item">
                  <p className="box">
                    <input
                      type="checkbox"
                      checked={task.status === 'Completed'}
                      onChange={() => toggleStatus(task.id)}
                    />
                  </p>
                  <p className="detail">
                    <span className="task-name">{task.title}</span>
                    <span className="task-due">
                      {formatDueDate(task.dueDate)}
                      {isOverdue(task) && ' (Overdue)'}
                    </span>
                  </p>
                  <p className="level">
                    <span
                      className="task-priority"
                      style={{ color: priorityColor[task.priority as 'Low' | 'Medium' | 'High'] }}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}