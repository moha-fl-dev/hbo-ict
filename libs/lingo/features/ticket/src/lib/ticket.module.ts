import { Module } from '@nestjs/common';
import { TICKET_SERVICE } from './constants';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
  controllers: [TicketController],
  providers: [
    {
      provide: TICKET_SERVICE,
      useValue: TicketService,
    },
  ],
  exports: [],
})
export class TicketModule {}
