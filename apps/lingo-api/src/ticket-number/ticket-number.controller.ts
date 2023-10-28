import { TicketNumberService } from '@hbo-ict/data-access';
import { Controller, Get } from '@nestjs/common';

@Controller('ticket-number')
export class TicketNumberController {
  constructor(private readonly ticketNumberService: TicketNumberService) {}

  @Get('/create')
  async createTicketNumber() {
    const ticketNumber = await this.ticketNumberService.createTicketNumber();

    return ticketNumber;
  }
}
