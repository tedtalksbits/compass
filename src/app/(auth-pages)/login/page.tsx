'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/auth-service';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LandingPageLayout from '@/components/layouts/landing-page';
import Link from 'next/link';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import { PasswordInput } from '@/components/ui/password-input';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginUser({ username, password });

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <LandingPageLayout>
      <main className='flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 relative'>
        <div className='relative'>
          <h3 className='mb-8 font-bold text-4xl'>Login</h3>
        </div>
        <form
          onSubmit={handleLogin}
          className='space-y-4 w-full max-w-md bg-card border border-border rounded-lg p-6 shadow-md dark:shadow-none z-10 last:mt-8'
        >
          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              type='username'
              placeholder='Ex: johndoe'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <PasswordInput
              placeholder='Your password'
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type='submit' className='w-full '>
            Log In
          </Button>
          <div className='divider border-b my-4'></div>
          <p className='text-sm text-center'>
            Don't have an account?{' '}
            <Link
              href='/create-account'
              className='text-primary hover:underline'
            >
              Create account
            </Link>
          </p>
        </form>
        <GridPattern
          // className='absolute inset-0 -z-10 opacity-50'
          strokeDasharray={'4 2'}
          className={cn(
            '[mask-image:radial-gradient(100dvw_circle_at_center,white,transparent)]'
          )}
          width={100}
          height={100}
          x={-1}
          y={-1}
        />

        {/* stacked cards in the bottom left corner of the screen */}
        <div className='fixed bottom-40 right-[12rem] flex'>
          <div className='flex relative'>
            <article className='w-72 h-40 border border-border bg-muted/50 backdrop-blur-md transform transition-all skew-x-12 -skew-y-12 absolute rounded-lg'>
              <div className='p-4'>Card 1</div>
            </article>
            <article className='w-72 h-40 bg-secondary/50 border border-border backdrop-blur-md transform transition-all skew-x-12 -skew-y-12 absolute -top-4 -left-4 rounded-lg'>
              <div className='p-4'>Card 2</div>
            </article>
            <article className='w-72 h-40 bg-card/50 border border-border backdrop-blur-md transform transition-all skew-x-12 -skew-y-12 absolute -top-8 -left-8 rounded-lg'>
              <div className='p-4'>Card 3</div>
            </article>
            <article className='w-72 h-40 bg-card border border-border shadow-lg transform transition-all skew-x-12 -skew-y-12 absolute -top-12 -left-12 rounded-lg'>
              <div className='p-4'>Card 4</div>
            </article>
          </div>
        </div>
        <div className='fixed bottom-[18rem] left-[-8rem] flex'>
          <div className='flex relative'>
            <article className='w-72 h-40 border border-border bg-muted/50 backdrop-blur-md transform transition-all skew-x-6 -skew-y-6 absolute rounded-lg'>
              <div className='p-4'>Card 1</div>
            </article>
            <article className='w-72 h-40 bg-secondary/50 border border-border backdrop-blur-md transform transition-all skew-x-6 -skew-y-6 absolute -top-4 -left-4 rounded-lg'>
              <div className='p-4'>Card 2</div>
            </article>
            <article className='w-72 h-40 bg-card/50 border border-border backdrop-blur-md transform transition-all skew-x-6 -skew-y-6 absolute -top-8 -left-8 rounded-lg'>
              <div className='p-4'>Card 3</div>
            </article>
            <article className='w-72 h-40 bg-card border border-border shadow-lg transform transition-all rotate-3 absolute -top-6 -left-6 rounded-lg'>
              <div className='p-4'>Card 4</div>
            </article>
          </div>
        </div>
      </main>
    </LandingPageLayout>
  );
}
