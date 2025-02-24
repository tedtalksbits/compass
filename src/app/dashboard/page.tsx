import { getCurrentUser, logoutUser } from '@/auth-service';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const handleLogout = async () => {
    'use server';
    await logoutUser();
    redirect('/login');
  };

  return (
    <div className='container mx-auto'>
      <div className=''>
        <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

        <div className='space-y-4'>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          <form action={handleLogout}>
            <Button type='submit' className='w-full'>
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
