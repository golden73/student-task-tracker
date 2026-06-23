'use client';
import { useState, useEffect } from 'react';
import { Task } from '../context/TaskContext';

interface TaskFormProps {
  onAdd: (task: Task) => void;
  onUpdate?: (id: number, updates: Partial<Task>) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

const emptyTask = { title: '', description: '', priority: 'Low', dueDate: '' };

export default function TaskForm({ onAdd, onUpdate, editingTask, onCancelEdit }: TaskFormProps) {
  const [task, setTask] = useState(emptyTask);
  const [error, setError] = useState('');

  const isEditing = !!editingTask;

  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });
      setError('');
    } else {
      setTask(emptyTask);
    }
  }, [editingTask]);

  const isPastDate = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(dateStr);
    return picked < today;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isPastDate(task.dueDate)) {
      setError('Due date cannot be in the past.');
      return;
    }
    setError('');

    if (isEditing && editingTask && onUpdate) {
      onUpdate(editingTask.id, { ...task });
      onCancelEdit?.();
    } else {
      onAdd({
        ...task,
        id: Date.now(),
        status: 'Pending',
      });
    }

    setTask(emptyTask);
  };

  const handleCancel = () => {
    setTask(emptyTask);
    setError('');
    onCancelEdit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input placeholder="Title" value={task.title} onChange={e => setTask({...task, title: e.target.value})} required />
      <input placeholder="Description" value={task.description} onChange={e => setTask({...task, description: e.target.value})} />
      <input
      type="date" value={task.dueDate}
      onChange={e => setTask({...task, dueDate: e.target.value})}
      onClick={e => (e.target as HTMLInputElement).showPicker?.()}
      required
      />
      <select value={task.priority} onChange={e => setTask({...task, priority: e.target.value})}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <button type="submit" className="btn-primary">
        {isEditing ? 'Save Changes' : 'Add Task'}
      </button>
      {isEditing && (
        <button type="button" className="btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      )}
      {error && <p style={{ color: '#f87171', width: '100%', textAlign: 'center' }}>{error}</p>}
    </form>
  );
}