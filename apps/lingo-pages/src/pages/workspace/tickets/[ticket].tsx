import { useTicketByNumber } from '@hbo-ict/hooks';
import type { CreateTicketDto } from '@hbo-ict/lingo/types';
import {
  Comments,
  CommmentForm,
  TicketForm,
  TicketStatusBar,
  TicketsLayout,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { useRouter } from 'next/router';

export default function FindTicket() {
  const router = useRouter();

  const ticketNumber = router.query.ticket as string;

  const { ticket } = useTicketByNumber(ticketNumber, {
    ticketNumber: true,
    caller: true,
    component: true,
    team: true,
    assignee: true,
  });

  const minumumTicketData: CreateTicketDto = {
    title: ticket?.title || '',
    description: ticket?.description || '',
    status: ticket?.status || 'OPEN',
    ticketNumber: ticket?.ticketNumber.number || '',
    assigneeId: ticket?.assignee?.id || '',
    severity: ticket?.severity || 'LOW',
    callerId: ticket?.caller?.id || '',
    componentId: ticket?.component.id || '',
    teamId: ticket?.team?.id || '',
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5 mt-2 container">
      <TicketStatusBar activeStatus={minumumTicketData.status} />
      <TicketForm
        action="UPDATE"
        defaultValues={minumumTicketData}
        key={minumumTicketData.ticketNumber}
      />
      <CommmentForm />
      <Comments />
    </div>
  );
}

FindTicket.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <TicketsLayout>{page}</TicketsLayout>
    </WorkspaceRootLayout>
  );
};
