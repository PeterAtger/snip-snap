import { Button } from '@repo/ui';
import { Bell } from 'lucide-react';

export default function Notifications() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full w-[20px] h-[20px]">
      <Bell className="h-4 w-4 stroke-zinc-500" />
      <span className="sr-only">Toggle user menu</span>
    </Button>
  );
}
