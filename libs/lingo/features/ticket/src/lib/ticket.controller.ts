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
    return this.ticketAggregator.createTicketWithNumber(req.body);
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
  async update(@Req() req: { body: CreateTicketDto }) {
    return this.ticketAggregator.updateTicketByNumber(req.body);
  }

  @Get('/all')
  async all(
    @Query() query: Prisma.TicketFindManyArgs,
    @TransformInclude()
    transformIncludeBooleanValues: TicketFindUniqueArgs['include']
  ) {
    console.log(JSON.stringify(query, null, 2));
    return this.ticketService.findMany({
      where: query.where,
      include: transformIncludeBooleanValues,
      skip: query.skip ? Number(query.skip) : undefined, // lazy solution. but it works
      take: query.take ? Number(query.take) : undefined, // lazy solution. might take the time to build a interceptor for this. not sure yet
    });
  }
}
