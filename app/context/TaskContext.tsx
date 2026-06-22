'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: 'Pending' | 'Completed';
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  toggleStatus: (id: number) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const deleteTask = (id: number) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const toggleStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' } : t
      )
    );
  };
  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleStatus, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};