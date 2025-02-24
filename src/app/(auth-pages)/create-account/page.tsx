'use client';
import LandingPageLayout from '@/components/layouts/landing-page';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import { IUser } from '@/mongodb/models/User';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function RegisterPage() {
  const [newUser, setNewUser] = useState<Partial<IUser>>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      // Handle error
      console.error('Signup failed');
    }
  };
  return (
    <LandingPageLayout>
      <main className='flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 relative'>
        <div className='-mt-40'></div>
        <div className='relative'>
          <h3 className='mb-8 font-bold text-4xl'>Create Account</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 w-full max-w-md bg-card border border-border rounded-lg p-6 shadow-md z-10 '
        >
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstName' className='required'>
                First Name
              </Label>
              <Input
                placeholder='example: John'
                id='firstName'
                type='text'
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName' className='required'>
                Last Name
              </Label>
              <Input
                placeholder='example: Doe'
                id='lastName'
                type='text'
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email' className='required'>
              Email
            </Label>
            <Input
              placeholder='Email'
              id='email'
              type='email'
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='username' className='required'>
              Username
            </Label>
            <Input
              placeholder='example: johndoe1989'
              id='username'
              type='text'
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='required'>
              Password
            </Label>
            <PasswordInput
              placeholder='Password must be at least 8 characters long'
              id='password'
              type='password'
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
          </div>
          <Button type='submit' className='w-full mt-12'>
            Create Account
          </Button>
          <div className='divider border-b my-4' />
          <p className='text-sm text-center'>
            Already have an account?{' '}
            <Link href='/login' className='text-primary hover:underline'>
              Login
            </Link>
          </p>
        </form>

        {/* stacked cards in the bottom left corner of the screen */}
        <div className='fixed bottom-20 left-16 flex'>
          <div className='flex relative'>
            <article className='w-72 h-40 border border-border bg-muted/50 backdrop-blur-md transform transition-all skew-x-12 -skew-y-12 absolute rounded-lg hover:scale-105 hover:rotate-2'>
              <div className='p-4'>Card 1</div>
            </article>
            <article className='w-72 h-40 bg-secondary/50 border border-border backdrop-blur-md transform transition-all skew-x-12 -skew-y-12 absolute -top-4 -left-4 rounded-lg hover:scale-105 hover:rotate-3'>
              <div className='p-4'>Card 2</div>
            </article>
            <article className='w-72 h-40 bg-card/50 border border-border backdrop-blur-md transform transition-all skew-x-12 -skew-y-12 absolute -top-8 -left-8 rounded-lg hover:scale-105 hover:rotate-5'>
              <div className='p-4'>Card 3</div>
            </article>
            <article className='w-72 h-40 bg-card border border-border shadow-lg transform transition-all skew-x-12 -skew-y-12 absolute -top-12 -left-12 rounded-lg hover:scale-105 hover:rotate-6'>
              <div className='p-4'>Card 4</div>
            </article>
          </div>
        </div>
        <div className='fixed top-20 right-[13rem] flex'>
          <div className='flex relative'>
            <article className='w-72 h-40 border border-border bg-muted/50 backdrop-blur-md transform transition-all skew-x-6 -skew-y-6 absolute rounded-lg hover:scale-105 hover:rotate-6'>
              <div className='p-4'>Card 1</div>
            </article>
            <article className='w-72 h-40 bg-secondary/50 border border-border backdrop-blur-md transform transition-all skew-x-6 -skew-y-6 absolute -top-4 -left-4 rounded-lg hover:scale-105 hover:rotate-2'>
              <div className='p-4'>Card 2</div>
            </article>
            <article className='w-72 h-40 bg-card/50 border border-border backdrop-blur-md transform transition-all skew-x-6 -skew-y-6 absolute -top-8 -left-8 rounded-lg hover:scale-105 hover:-rotate-6'>
              <div className='p-4'>Card 3</div>
            </article>
            <article className='w-72 h-40 bg-card border border-border shadow-lg transform transition-all rotate-3 absolute -top-6 -left-6 rounded-lg motion-scale-loop-[0.95] motion-opacity-loop-[0%] motion-rotate-loop-[10deg] motion-loop-once motion-ease-spring-smooth hover:scale-105 hover:rotate-6'>
              <div className='p-4 '>Card 4</div>
            </article>
          </div>
        </div>
      </main>
      <GridPattern
        // className='absolute inset-0 -z-10 opacity-50'
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:radial-gradient(100dvw_circle_at_center,white,transparent)] h-full'
        )}
        width={100}
        height={100}
        x={-1}
        y={-1}
      />
    </LandingPageLayout>
  );
}
