import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Logo } from '../components/logo';
import { Separator } from '../components/seperator';
import { WorkspaceMenu } from '../components/workspace.menu';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicUserDropDown = dynamic(
  () => import('../blocks/user-dropdown').then((mod) => mod.UserDropDown),
  {
    ssr: false,
  }
);

const DynamicMobileSideNav = dynamic(
  () => import('../components/sideNav').then((mod) => mod.MobileSideNav),
  {
    ssr: false,
  }
);

export function WorkspaceRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen" key={'root-workspace-layout'}>
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
              <PlusIcon />
              <span>Create Ticket</span>
            </Link>
          </Button>
        </div>
      </aside>
      <main className="flex-1 h-full ">
        <div className="border-b shadow-sm flex flex-col h-[57px] justify-evenly ">
          <div className="flex flex-row p-5 justify-between align-middle items-center">
            <DynamicMobileSideNav />
            <Input placeholder="Search.... INC123456789" className="w-[50%]" />
            <DynamicUserDropDown />
          </div>
        </div>
        <div className="mt-2 px-4 h-full">{children}</div>
      </main>
    </div>
  );
}
