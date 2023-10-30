import { TicketService } from '@hbo-ict/data-access';
import {
  QueryBooleanPipe,
  TransformInclude,
  ZodValidate,
} from '@hbo-ict/lingo-utils';
import {
  CreateTicketDto,
  TicketFindUniqueArgs,
  createTicketSchema,
} from '@hbo-ict/lingo/types';
import { Controller, Get, Post, Query, Req, UsePipes } from '@nestjs/common';
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

  @Get('/find')
  async find(
    @Query() query: TicketFindUniqueArgs,
    @TransformInclude()
    transformIncludeBooleanValues: TicketFindUniqueArgs['include']
  ) {
    const { where } = query;

    const res = await this.ticketService.find({
      where,
      include: transformIncludeBooleanValues,
    });

    return res;
  }
}
