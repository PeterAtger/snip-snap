import {
  Button,
  Separator,
  Switch,
  Label,
} from '@repo/ui';
import {
  Home,
  BarChart3,
  CircleDollarSign,
  Tv,
  Import,
  Settings,
  MailPlus,
  Lightbulb,
  CircleHelp,
  CirclePlay,
} from 'lucide-react';
import NavLink from './navlink';

export default function NavLinks() {
  return (
    <nav className="flex flex-col w-full overflow-scroll sm:overflow-hidden items-start h-full gap-2 px-2 text-sm font-medium lg:px-4">
      {/* Actions */}
      <div className="action flex flex-col w-full gap-2">
        <Button className="w-full px-3 py-2">
          Does Nothing
        </Button>
      </div>
      <Separator />
      {/* Navigation */}
      <div className="navigation ">
        <NavLink href="/">
          <Home className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink href="/">
          <BarChart3 className="h-4 w-4" />
          Analytics
        </NavLink>
        <NavLink href="/">
          <CircleDollarSign className="h-4 w-4" />
          Advertisements
        </NavLink>
        <NavLink href="/">
          <Tv className="h-4 w-4" />
          Channels
        </NavLink>
        <NavLink href="/">
          <Import className="h-4 w-4" />
          Import
        </NavLink>
        <NavLink href="/">
          <Settings className="h-4 w-4" />
          Setting
        </NavLink>
      </div>
      {/* Bootom */}
      <div className="mt-auto">
        <div className="flex items-center space-x-2">
          <Label htmlFor="demo-mode" className="flex flex-row items-center px-3 gap-3 py-2 text-zinc-500 hover:text-zinc-800 font-bold transition-all ">
            <CirclePlay className="h-4 w-4" />
            Demo Mode
          </Label>
          <Switch id="demo-mode" />
        </div>
        <NavLink href="/">
          <MailPlus className="h-4 w-4" />
          Invite your team
        </NavLink>
        <NavLink href="/">
          <Lightbulb className="h-4 w-4" />
          Give feedback
        </NavLink>
        <NavLink href="/">
          <CircleHelp className="h-4 w-4" />
          Help & support
        </NavLink>
      </div>
    </nav>
  );
}
