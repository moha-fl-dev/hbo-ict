import { Module } from '@nestjs/common';
import { TicketNumberService } from './ticket-number.service';
import { TicketNumberController } from './ticket-number.controller';
import { TICKET_NUMBER_SERVICE } from './constants';

@Module({
  controllers: [TicketNumberController],
  providers: [
    {
      provide: TICKET_NUMBER_SERVICE,
      useClass: TicketNumberService,
    },
  ],
  exports: [],
})
export class TicketNumberModule {}
