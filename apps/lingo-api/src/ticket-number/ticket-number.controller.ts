import { TicketNumberService } from '@hbo-ict/data-access';
import { TicketNumbeFindUniqueArgs } from '@hbo-ict/lingo/types';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('ticket-number')
export class TicketNumberController {
  constructor(private readonly ticketNumberService: TicketNumberService) {}

  @Get('/create')
  async createTicketNumber() {
    const ticketNumber = await this.ticketNumberService.createTicketNumber();

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
