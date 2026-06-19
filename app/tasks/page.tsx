'use client';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

export default function TasksPage() {
  const { tasks, deleteTask, toggleStatus, addTask } = useTasks();

  return (
    <div className="displayView">
      <h1>Task Management</h1>
      <TaskForm onAdd={addTask} />
      
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>Status: {task.status} | Due: {task.dueDate}</p>
          <button className='status' onClick={() => toggleStatus(task.id)}>Toggle Status</button>
          <button className='del' onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}