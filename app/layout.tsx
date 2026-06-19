import Navbar from './components/Navbar';
import { TaskProvider } from './context/TaskContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>
          <Navbar />
          <main>{children}</main>
        </TaskProvider>
      </body>
    </html>
  );
}