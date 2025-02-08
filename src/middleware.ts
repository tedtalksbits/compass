import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for authentication token in cookies
  const token = request.cookies.get('auth_token');

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If trying to access a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and trying to access login, redirect to dashboard
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};
