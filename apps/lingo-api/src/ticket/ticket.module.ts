import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketNumberService, TicketService } from '@hbo-ict/data-access';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketNumberService],
})
export class TicketModule {}
