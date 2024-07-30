import Link from 'next/link';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-zinc-500 hover:text-zinc-800 font-bold transition-all"
    >
      {children}
    </Link>
  );
}
