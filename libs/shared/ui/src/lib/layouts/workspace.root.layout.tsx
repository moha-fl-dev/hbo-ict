import { MobileSideNav, SideNav } from '../components/sideNav';
import { WorkspaceMenu } from '../components/workspace.menu';

export function WorkspaceRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <aside className="w-1/6  h-screen">
        <MobileSideNav />
        <SideNav />
      </aside>
      <main className="w-5/6 bg-gray-100 p-4"> {children} </main>
    </div>
  );
}
