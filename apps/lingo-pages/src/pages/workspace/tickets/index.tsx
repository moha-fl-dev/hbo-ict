import { ScrollArea, WorkspaceRootLayout } from '@hbo-ict/ui';

export default function TicketsRoot() {
  return (
    <div className="h-full">
      {Array.from({ length: 100 }, (_, i) => (
        <h1 key={i}>Tickets Root {i}</h1>
      ))}
    </div>
  );
}

TicketsRoot.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
        {page}
      </ScrollArea>
    </WorkspaceRootLayout>
  );
};
