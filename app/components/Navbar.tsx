'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <div className='logo'>Task Track</div>
      <button className='menu-toggle' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link href='/' onClick={() => setIsOpen(false)}>Home</Link>
        <Link href='/dashboard' onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link href='/tasks' onClick={() => setIsOpen(false)}>Tasks</Link>
      </div>
    </nav>
  );
}