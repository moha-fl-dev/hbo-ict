import { TicketStatusEnum } from '@hbo-ict/lingo/types';
import {
  Button,
  TicketStatusBar,
  TicketsLayout,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import React from 'react';

export default function CreateTicket() {
  const [activeStatus, setActiveStatus] = React.useState<TicketStatusEnum>(
    TicketStatusEnum.OPEN
  );

  function handleStatusChange() {
    // set random status
    const statuses = Object.values(TicketStatusEnum);
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setActiveStatus(randomStatus);
  }

  return (
    <div>
      <TicketStatusBar activeStatus={activeStatus} />
      <Button onClick={handleStatusChange} className="mt-10">
        Change status
      </Button>
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
