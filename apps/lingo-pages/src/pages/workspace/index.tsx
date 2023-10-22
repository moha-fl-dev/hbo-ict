import { ScrollArea, Separator, WorkspaceRootLayout } from '@hbo-ict/ui';

import { useRouter } from 'next/router';

export default function Workspace() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4 grid-flow-row ">
      <ScrollArea className="h-[400px] border rounded-sm p-4 col-span-2 lg:col-span-1 shadow-sm">
        <div>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p>Here come my tickets {i}</p>
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="h-[400px] border rounded-sm p-4 col-span-2 lg:col-span-1 shadow-sm">
        <div>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p>Here come unassigned tickets {i}</p>
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="h-[400px] border rounded-sm p-4 col-span-2 shadow-sm">
        <div>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p>Here come all tickets from all departments {i}</p>
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

Workspace.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};
