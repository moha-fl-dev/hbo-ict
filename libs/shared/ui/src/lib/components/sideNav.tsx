import {
  Cross2Icon,
  DotsVerticalIcon,
  HamburgerMenuIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { Button } from './button';
import { WorkspaceMenu } from './workspace.menu';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from './dropdown.menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
  SheetOverlay,
} from './sheet';
import { Router, useRouter } from 'next/router';
import React from 'react';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import { Logo } from './logo';

export function SideNav() {
  return (
    <aside className="bg-white hidden md:flex flex-col content-between h-screen justify-between ">
      <nav className="w-full">
        <WorkspaceMenu />
      </nav>
      <div className="flex flex-col gap-4 ">
        <Button
          asChild
          variant="workspace"
          size="lg"
          className="flex flex-row gap-2 align-middle"
        >
          <Link href="/workspace/tickets/create">
            <PlusIcon />
            Create ticket
          </Link>
        </Button>
        <div className="w-full border rounded-sm p-2">
          <div className="flex flex-row justify-evenly align-middle items-center">
            <div className="flex flex-row gap-2 align-middle items-center">
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>JohnDoe@gmail.com</span>
              <UserDropDown />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function UserDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/workspace/manage/account">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileSideNav() {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    // md breakpoint
    if (width && width > 768) {
      setOpen(() => false);
    }
    // close sheet on route change
    router.events.on('routeChangeComplete', () => {
      setOpen(() => false);
    });
  }, [width]);

  function openSheet() {
    setOpen(() => true);
  }

  return (
    <div className="block md:hidden">
      <Sheet open={open}>
        <SheetTrigger asChild>
          <HamburgerMenuIcon
            className="text-primary font-bold cursor-pointer h-4 w-4"
            onClick={() => openSheet()}
          />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetClose className="absolute  right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <Cross2Icon
              className="h-4 w-4"
              onClick={() => setOpen(() => false)}
            />
            <span className="sr-only">Close</span>
          </SheetClose>
          <div className="mt-5">
            <WorkspaceMenu />
          </div>
        </SheetContent>
        <SheetOverlay onClick={() => setOpen(() => false)} />
      </Sheet>
    </div>
  );
}
