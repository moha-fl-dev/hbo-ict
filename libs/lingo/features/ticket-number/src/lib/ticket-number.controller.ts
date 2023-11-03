import { TicketNumbeFindUniqueArgs } from '@hbo-ict/lingo/types';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { TICKET_NUMBER_SERVICE } from './constants';
import { ITicketNumberService } from './interfaces/ticket.service';

@Controller('ticket-number')
export class TicketNumberController {
  constructor(
    @Inject(TICKET_NUMBER_SERVICE)
    private ticketNumberService: ITicketNumberService
  ) {}

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
