import {
  CreateTicketDto,
  SeverityEnum,
  TicketStatusEnum,
  createTicketSchema,
} from '@hbo-ict/lingo/types';
import {
  CreateTicketForm,
  Form,
  TicketStatusBar,
  TicketsLayout,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function CreateTicket() {
  //

  const createTicketForm = useForm<CreateTicketDto>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      description: '',
      severity: SeverityEnum.LOW,
      assigneeId: '',
      callerId: '',
      teamId: '',
      ticketNumber: '',
      status: TicketStatusEnum.OPEN,
      componentId: '',
    },
  });

  function onSubmit(data: CreateTicketDto) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-10 mt-2">
      <TicketStatusBar activeStatus={'OPEN'} />
      <Form {...createTicketForm}>
        <CreateTicketForm
          form={createTicketForm}
          onSubmit={createTicketForm.handleSubmit(onSubmit)}
        />
      </Form>
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
