'use client';
import { useState } from 'react';
import { Task } from '../context/TaskContext';

interface TaskFormProps {
  onAdd: (task: Task) => void;
  onUpdate?: (id: number, updates: Partial<Task>) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [task, setTask] = useState({ title: '', description: '', priority: 'Low' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ 
      ...task, 
      id: Date.now(), 
      dueDate: new Date().toLocaleDateString(), 
      status: 'Pending' 
    });
    setTask({ title: '', description: '', priority: 'Low' });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input placeholder="Title" value={task.title} onChange={e => setTask({...task, title: e.target.value})} required />
      <input placeholder="Description" value={task.description} onChange={e => setTask({...task, description: e.target.value})} />
      <select value={task.priority} onChange={e => setTask({...task, priority: e.target.value})}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <button type="submit" className="btn-primary">Add Task</button>
    </form>
  );
}