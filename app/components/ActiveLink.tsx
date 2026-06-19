'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ActiveLinkProps {
    href: string;
    children: React.ReactNode;
}
export default function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={isActive ? 'active-link' : ''}
    >
      {children}
    </Link>
  );
}