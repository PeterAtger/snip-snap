import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add snippet | Snip Snap',
  description: 'Snip Snip .. oh snap',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (children);
}
