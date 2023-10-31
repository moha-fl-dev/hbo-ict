import { useTicketNumber } from '@hbo-ict/hooks';
import {
  CreateTicketDto,
  SeverityEnum,
  TicketStatusEnum,
  createTicketSchema,
} from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import {
  CreateTicketForm,
  Form,
  TicketForm,
  TicketStatusBar,
  TicketsLayout,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import React, { useEffect, useState } from 'react';

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
    <div className="flex flex-col gap-10 mt-2">
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
