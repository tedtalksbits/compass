import type { Metadata, Viewport } from 'next';

import { Geist, Geist_Mono, Mulish, Poppins, Lexend } from 'next/font/google';
import './globals.css';
import { getCurrentUser, logoutUser } from '@/auth-service';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import ThemeSwitch from '@/components/theme-switch';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const font = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Compass',
  description: 'Navigate your world of data with ease',
  icons: [
    { rel: 'icon', url: './apple-icon.png' },
    { rel: 'apple-touch-icon', url: './apple-icon.png' },
  ],
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: 'Compass',
    capable: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'contain',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafd' },
    { media: '(prefers-color-scheme: dark)', color: '#020814' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(font.className)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
