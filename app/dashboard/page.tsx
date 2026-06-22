'use client';
import { useTasks } from '../context/TaskContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { tasks } = useTasks();
  const router = useRouter();

  const stats = [
    { id: 'total', label: 'Total Tasks', value: tasks.length },
    { id: 'complete', label: 'Complete', value: tasks.filter(t => t.status === 'Completed').length },
    { id: 'pending', label: 'Pending', value: tasks.filter(t => t.status === 'Pending').length },
    { id: 'overdue', label: 'Overdue', value: tasks.filter(t => new Date(t.dueDate) < new Date()).length },
  ];

  const pendingTasks = tasks.filter(t => t.status === 'Pending');

  return (
    <main>
      <section className="displayView">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button className="btn-primary" onClick={() => router.push('/tasks')}>
            + Add Task
          </button>
        </div>

        <div className="cards">
          {stats.map((stat) => (
            <div key={stat.id} className={`card-${stat.id}`}>
              <h3>{stat.label}</h3>
              <p style={{ fontSize: '24px' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="recent-tasks">
          <h2>Pending Tasks</h2>
          {pendingTasks.length === 0 ? (
            <p>Nothing pending — you&apos;re all caught up.</p>
          ) : (
            <ul className="task-list">
              {pendingTasks.map(task => (
                <li key={task.id} className="task-list-item">
                  <span className="task-name">{task.title}</span>
                  <span className="task-due">Due: {task.dueDate}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}