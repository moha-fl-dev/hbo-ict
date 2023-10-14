import {
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
} from './sheet';
import { Router } from 'next/router';
import React from 'react';

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
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon className="text-primary font-bold cursor-pointer" />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <WorkspaceMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
}
