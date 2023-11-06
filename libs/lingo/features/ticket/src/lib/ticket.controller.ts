import { TicketService } from '@hbo-ict/data-access';
import { TransformInclude, ZodValidate } from '@hbo-ict/lingo-utils';
import {
  CreateTicketDto,
  TicketFindUniqueArgs,
  createTicketSchema,
} from '@hbo-ict/lingo/types';
import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { Prisma } from '@prisma/client/lingo';
import {
  ITicketAggregatorService,
  ITicketService,
  TICKET_AGGREGATOR_TOKEN,
  TICKET_SERVICE_TOKEN,
} from '@hbo-ict/lingo/aggregators';

type Delta<T, S> = {
  [P in keyof T]?: T[P] | S;
};

@Controller('ticket')
export class TicketController {
  constructor(
    @Inject(TICKET_SERVICE_TOKEN)
    private readonly ticketService: ITicketService,
    @Inject(TICKET_AGGREGATOR_TOKEN)
    private readonly ticketAggregator: ITicketAggregatorService
  ) {}

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

    // const data = await this.ticketService.create(
    //   {
    //     ...ticketData,
    //   },
    //   ticketNumber
    // );

    return 'data';
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

  @Post(':number/update')
  @ZodValidate<CreateTicketDto>(createTicketSchema)
  async update(@Req() req: { body: Prisma.TicketUpdateInput }) {
    const { body } = req;
    console.log({ update: body });
    return this.ticketService.update(body);
  }
}
