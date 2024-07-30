import Link from 'next/link';
import Image from 'next/image';

import LogoImg from '@/assets/logo.svg';

export default function Footer() {
  return (
    <footer className="flex items-center px-6 justify-between w-full h-16 bg-zinc-50 border border-zinc-200 dark:bg-zinc-950 dark:border-none">
      <p className="text-sm text-zinc-500 font-bold">Free Code Snippets</p>
      <Link
        href="/"
        className="flex flex-row items-center gap-2 font-semibold md:text-base mx-2"
      >
        <Image alt="logo" width={24} height={24} src={LogoImg.src} />
        <h3>Snip Snap</h3>
      </Link>
    </footer>
  );
}
