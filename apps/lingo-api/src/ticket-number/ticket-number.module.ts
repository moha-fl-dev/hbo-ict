import { Module } from '@nestjs/common';
import { TicketNumberController } from './ticket-number.controller';
import { TicketNumberService } from '@hbo-ict/data-access';

@Module({
  controllers: [TicketNumberController],
  providers: [TicketNumberService],
})
export class TicketNumberModule {}
