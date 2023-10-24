import { AvatarIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Logo } from '../components/logo';
import { Separator } from '../components/seperator';
import { WorkspaceMenu } from '../components/workspace.menu';
import Link from 'next/link';
import { MobileSideNav } from '../components/sideNav';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '../components/dropdown.menu';
import { useCurrentUser, usePerformSignOut } from '@hbo-ict/hooks';

export function WorkspaceRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-[12%] min-w-[200px] hidden md:block border-r">
        <div className="flex flex-col gap-2 w-full mt-5 ">
          <Logo
            variant={'small'}
            size={'small'}
            asLink
            className="flex flex-col items-center"
            path="/workspace"
          />
          <Separator
            orientation="horizontal"
            decorative
            className="shadow-sm"
          />
          <WorkspaceMenu />
          <Separator
            orientation="horizontal"
            decorative
            className="shadow-sm"
          />
          <Button
            variant={'workspace'}
            className="mx-4 flex flex-row gap-2 items-center"
            asChild
          >
            <Link href={'/workspace/tickets/create'}>
              <PlusIcon className="w-4 h-4" />
              <span>Create Ticket</span>
            </Link>
          </Button>
        </div>
      </aside>
      <main className="flex-1 h-full ">
        <div className="border-b shadow-sm flex flex-col h-[57px] justify-evenly ">
          <div className="flex flex-row p-5 justify-between align-middle items-center">
            <MobileSideNav />
            <Input placeholder="Search.... INC123456789" className="w-[50%]" />
            <UserDropDown />
          </div>
        </div>
        <div className="mt-2 container px-4 h-full">{children}</div>
      </main>
    </div>
  );
}

function UserDropDown() {
  const { currentUser } = useCurrentUser();
  const { signOut } = usePerformSignOut();

  function handlerSignOut() {
    signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant={'outline'}
          size={'icon'}
          className="flex flex-row gap-2"
        >
          <AvatarIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-5">
        <DropdownMenuLabel>{currentUser?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/workspace/manage/account">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlerSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
