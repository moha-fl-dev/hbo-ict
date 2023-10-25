import { ScrollArea, TicketsLayout, WorkspaceRootLayout } from '@hbo-ict/ui';

export default function TicketsRoot() {
  return (
    <div className="h-full">
      {Array.from({ length: 1000 }, (_, i) => (
        <h1 key={i}>Tickets Root {i}</h1>
      ))}
    </div>
  );
}

TicketsRoot.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <TicketsLayout>{page}</TicketsLayout>
    </WorkspaceRootLayout>
  );
};
