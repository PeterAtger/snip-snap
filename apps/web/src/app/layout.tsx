import '@repo/ui/dist/index.css';
import '@/styles/globals.css';

import { Manrope } from 'next/font/google';
import { type Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@repo/ui';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer/footer';
import { auth } from '@/server/auth';

const manrope = Manrope({ weight: ['300', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Snip-Snap',
  description: 'Easily share code',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${manrope.className}`}>
      <body>
        <SessionProvider session={session}>
          <main className="text-slate-900 dark:text-white bg-zinc-100 dark:bg-zinc-800">
            <Navbar />
            <div className="flex min-h-screen pt-16 w-full">
              {children}
            </div>
            <Footer />
            <Toaster />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
