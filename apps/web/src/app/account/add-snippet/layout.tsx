import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed Profiles | The Feeds Tool',
  description: 'Manage your feed profiles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (children);
}
