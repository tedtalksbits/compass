import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ThemeToggle } from '../theme-toggle';

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // get current path
  const pathname = usePathname();

  // remove current path from nav items
  const filteredNavItems = siteConfig.navItems.filter(
    (item) => item.href !== pathname
  );
  return (
    <div className='relative'>
      <nav className='flex justify-between items-center fixed z-10 left-0 right-0 top-4'>
        <div className='bg-card py-4 px-8 w-full lg:w-[50%] max-w-[500px] mx-auto rounded-3xl border shadow-md items-center justify-between flex motion-translate-x-in-[0%] motion-translate-y-in-[-93%]'>
          <Link href='/' className='text-2xl'>
            <Image
              src='/images/compass.png'
              alt='Logo'
              width={32}
              height={32}
            />
          </Link>
          <ul className='flex gap-4 justify-end ml-2 items-center'>
            {filteredNavItems.map((item) => (
              <li key={item.href}>
                <Link color='foreground' href={item.href}>
                  {item.icon && <item.icon className='mr-2' />}
                </Link>
              </li>
            ))}
            <ThemeToggle />
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}
