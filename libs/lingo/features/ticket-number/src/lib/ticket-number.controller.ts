import type { ITicketNumberService } from '@hbo-ict/lingo/aggregators';
import { TICKET_NUMBER_SERVICE_TOKEN } from '@hbo-ict/lingo/aggregators';
import type { TicketNumbeFindUniqueArgs } from '@hbo-ict/lingo/types';
import { Controller, Get, Inject, Query } from '@nestjs/common';

@Controller('ticket-number')
export class TicketNumberController {
  constructor(
    @Inject(TICKET_NUMBER_SERVICE_TOKEN)
    private ticketNumberService: ITicketNumberService,
  ) {}

  @Get('/create')
  async createTicketNumber() {
    const ticketNumber = await this.ticketNumberService.createTicketNumber();
    console.log({ ticketNumber });
    return ticketNumber;
  }

  @Get('/find')
  async find(@Query() query: TicketNumbeFindUniqueArgs) {
    console.log(query);
    const { where, include } = query;

    return this.ticketNumberService.find({
      where,
      include,
    });
  }
}
