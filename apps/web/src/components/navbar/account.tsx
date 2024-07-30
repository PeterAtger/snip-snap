'use client';

import {
  ChevronDown,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import aubreyPlaza from '@/assets/aubrey.jpg';
import onSignOut from '@/server/actions/onSignOut';

export default function Account() {
  const { status, data: session } = useSession();
  const [, onSubmit] = useFormState(onSignOut, { success: false, message: '' });

  const onSubmitSideEffect = () => {
    onSubmit();
    signOut();
  };

  if (status !== 'authenticated' || !session) {
    return (
      <Link href="/auth/signin">
        <Button>Sign In</Button>
      </Link>
    );
  }

  const { user } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-[8px] h-10 px-4">
          <Avatar>
            <AvatarImage src={user?.image || aubreyPlaza.src} />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <p className="font-semibold">{user?.name}</p>
          <ChevronDown className="h-3 w-3" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={onSubmitSideEffect}>
          <Button variant="destructive" className="w-full" type="submit">
            Logout
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
