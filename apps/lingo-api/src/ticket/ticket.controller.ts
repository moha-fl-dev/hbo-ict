import { TicketService } from '@hbo-ict/data-access';
import { ZodValidate } from '@hbo-ict/lingo-utils';
import { CreateTicketDto, createTicketSchema } from '@hbo-ict/lingo/types';
import { Controller, Post, Req } from '@nestjs/common';
import { Prisma } from '@prisma/client/lingo';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('/create')
  @ZodValidate<CreateTicketDto>(createTicketSchema)
  async create(@Req() req: { body: CreateTicketDto }) {
    //

    const { body } = req;
    const { ticketNumber } = body;

    const ticketData: Prisma.TicketCreateInput = {
      title: body.title,
      description: body.description,
      status: body.status,
      severity: body.severity,
      caller: {
        connect: {
          id: body.callerId,
        },
      },
      assignee: {
        connect: {
          id: body.assigneeId,
        },
      },
      team: {
        connect: {
          id: body.teamId,
        },
      },
      component: {
        connect: {
          id: body.componentId,
        },
      },
      ticketNumber: {
        connect: {
          id: body.ticketNumber,
        },
      },
    };

    console.log({
      ticketData,
    });

    const data = await this.ticketService.create(
      {
        ...ticketData,
      },
      ticketNumber
    );

    return data;
  }
}
