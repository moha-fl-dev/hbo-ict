import {
  TicketStatusBar,
  TicketsLayout,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function CreateTicket() {
  return (
    <div>
      <TicketStatusBar activeStatus={'OPEN'} />
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
