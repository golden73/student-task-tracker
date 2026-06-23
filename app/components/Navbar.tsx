'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <nav>
      <div className='logo'>Task Track</div>
      {!isLanding && (
        <div className='nav-links'>
          <Link href='/' className={pathname === '/' ? 'active-link' : ''}>Home</Link>
          <Link href='/dashboard' className={pathname === '/dashboard' ? 'active-link' : ''}>Dashboard</Link>
          <Link href='/tasks' className={pathname === '/tasks' ? 'active-link' : ''}>Tasks</Link>
        </div>
      )}
    </nav>
  );
}