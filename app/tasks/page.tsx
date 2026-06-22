'use client';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { Task } from '../context/TaskContext';

export default function TasksPage() {
  const { tasks, deleteTask, toggleStatus, addTask, updateTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  return (
    <div className="displayView">
      <h1>Task Management</h1>

      <TaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <div className="filter-bar">
        {(['All', 'Pending', 'Completed'] as const).map(status => (
          <button
            key={status}
            className={filter === status ? 'filter-active' : ''}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>Status: {task.status} | Due: {task.dueDate}</p>
          <button className="status" onClick={() => toggleStatus(task.id)}>Toggle Status</button>
          <button className="edit" onClick={() => setEditingTask(task)}>Edit</button>
          <button className="del" onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}

      {filteredTasks.length === 0 && <p>No tasks found.</p>}
    </div>
  );
}