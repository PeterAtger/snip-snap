import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/server/auth';
import NavLinks from '@/components/navlinks';

export const metadata: Metadata = {
  title: 'Profile | The Feeds Tool',
  description: 'All your configurations in one place',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r py-8 bg-muted/40 md:block">
        <NavLinks />
      </div>
      {children}
    </div>
  );
}
