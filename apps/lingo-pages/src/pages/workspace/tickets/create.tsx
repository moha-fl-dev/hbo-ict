import { SeverityEnum, TicketStatusEnum } from '@hbo-ict/lingo/types';
import {
  TicketForm,
  TicketStatusBar,
  TicketsLayout,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';

export default function CreateTicket() {
  //
  const defaultValues = {
    ticketNumber: '',
    title: '',
    description: '',
    severity: SeverityEnum.LOW,
    assigneeId: '',
    callerId: '',
    teamId: '',
    status: TicketStatusEnum.OPEN,
    componentId: '',
  };

  return (
    <div className="flex flex-col gap-10 mt-2 container">
      <TicketStatusBar activeStatus={'OPEN'} />

      <TicketForm
        defaultValues={defaultValues}
        action="CREATE"
        key={'create-ticket'}
      />
    </div>
  );
}

CreateTicket.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <TicketsLayout>{page}</TicketsLayout>
    </WorkspaceRootLayout>
  );
};
