'use client';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function Dashboard() {
  const { tasks } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  const stats = [
    { id: 'total', label: 'Total Tasks', value: tasks.length },
    { id: 'complete', label: 'Complete', value: tasks.filter(t => t.status === 'Completed').length },
    { id: 'pending', label: 'Pending', value: tasks.filter(t => t.status === 'Pending').length },
    { id: 'overdue', label: 'Overdue', value: tasks.filter(t => new Date(t.dueDate) < new Date()).length },
  ];

  return (
    <>      
      <main>
        <section className="displayView">
          <h1>Dashboard</h1>
          <div className="cards">
            {stats.map((stat) => (
              <div key={stat.id} className={`card-${stat.id}`}>
                <h3>{stat.label}</h3>
                <p style={{ fontSize: '24px' }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}