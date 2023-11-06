import { useManyTickets } from '@hbo-ict/hooks';
import { ScrollArea, TicketsLayout, WorkspaceRootLayout } from '@hbo-ict/ui';

export default function TicketsRoot() {
  const { isError, isLoading, tickets } = useManyTickets({
    include: {
      team: true,
      assignee: true,
      component: true,
      ticketNumber: true,
      caller: true,
    },
  });

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
