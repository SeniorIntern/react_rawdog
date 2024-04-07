'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const pathName = usePathname();

  const navLinks = [
    {
      href: '/',
      option: 'Home'
    },
    {
      href: '/todo',
      option: 'Todo'
    },
    {
      href: '/post',
      option: 'Post'
    },
    {
      href: '/timeline',
      option: 'Time Line'
    }
  ];

  return (
    <nav className="flex gap-10 py-4 px-10 bg-slate-200 items-center">
      {navLinks.map((n, index) => (
        <Link
          key={index}
          href={n.href}
          className={classNames({ 'font-bold text-xl': pathName === n.href })}
        >
          {n.option}
        </Link>
      ))}
    </nav>
  );
};
