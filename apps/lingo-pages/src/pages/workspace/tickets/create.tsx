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
  TicketStatusBar,
  TicketsLayout,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateTicket() {
  //
  const { ticketNumber: ticket_number } = useTicketNumber();

  const createTicketForm = useForm<CreateTicketDto>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      ticketNumber: '',
      title: '',
      description: '',
      severity: SeverityEnum.LOW,
      assigneeId: '',
      callerId: '',
      teamId: '',
      status: TicketStatusEnum.OPEN,
      componentId: '',
    },
  });

  useEffect(() => {
    if (ticket_number) {
      createTicketForm.setValue('ticketNumber', ticket_number.number);
    }
  }, [ticket_number]);

  const { mutate } = useMutation({
    mutationKey: ['createTicket'],
    mutationFn: Api.ticket.create,
  });

  function onSubmit(data: CreateTicketDto) {
    console.log(data);
    mutate(data);
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
