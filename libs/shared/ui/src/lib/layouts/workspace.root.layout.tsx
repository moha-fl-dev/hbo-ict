import { ExitIcon, PlusIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '../components/avatar';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Logo } from '../components/logo';
import { Separator } from '../components/seperator';
import { WorkspaceMenu } from '../components/workspace.menu';
import Link from 'next/link';

export function WorkspaceRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <aside className="w-[12%] hidden md:block border-r ">
        <div className="flex flex-col gap-2 w-full h-10 mt-5">
          <Logo
            variant={'small'}
            size={'small'}
            asLink
            className="ml-4"
            path="/workspace"
          />
          <Separator orientation="horizontal" decorative />
          <WorkspaceMenu />
          <Separator orientation="horizontal" decorative />
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
      <main className="w-[88%]">
        <div className="border-b mt-5 h-10">search</div>
        <div>{children}</div>
      </main>
    </div>
  );
}
