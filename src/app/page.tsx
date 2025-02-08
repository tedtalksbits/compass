import { getCurrentUser } from '@/auth-service';
import { FlipWords } from '@/components/flip-words';
import { BasicModal } from '@/components/ui/basic-modal';
import { DotPattern } from '@/components/ui/dot-pattern';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Disclamer } from './components/disclaimer';

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative size-full'>
      {/* <BasicModal /> */}
      <Disclamer />

      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Image
          className='dark:invert'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />
        <ol className='list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          <li className='mb-2'>
            You're logged in as{' '}
            <span className='font-semibold'>{user.username}</span>
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              src/app/page.tsx
            </code>
            .
          </li>
          <li>
            You're seeing this page because you are authenticated.
            <br />
            Protected Pages are:
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              '/', '/dashboard/**, '/settings/**'
            </code>{' '}
            <br />
            You can update these in
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              src/middleware.ts
            </code>
          </li>
        </ol>
        <div className='h-[40rem] flex justify-center items-center px-4'>
          <div className='text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400'>
            <FlipWords
              words={['Next.js', 'React', 'Tailwind CSS', 'TypeScript']}
              className='text-2xl sm:text-4xl font-[family-name:var(--font-geist-mono)]'
            />
          </div>
        </div>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        &copy; {new Date().getFullYear()} Tedane Blake
      </footer>
      {/* <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          // '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] '
          '[mask-image:radial-gradient(100dvw_circle_at_center,white,transparent)]'
        )}
      /> */}
      <GridPattern
        width={100}
        height={100}
        x={-1}
        y={-1}
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:radial-gradient(100dvw_circle_at_center,white,transparent)]'
        )}
      />
    </div>
  );
}
