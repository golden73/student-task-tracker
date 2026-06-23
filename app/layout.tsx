'use client';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import { TaskProvider } from './context/TaskContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <TaskProvider>
          <Navbar />
          <div key={pathname} className="page-transition">
            {children}
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}