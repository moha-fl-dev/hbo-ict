import { Module } from '@nestjs/common';
import { TICKET_SERVICE } from './constants';
import { TicketController } from './ticket.controller';
import { TicketAggregatorModule } from '@hbo-ict/lingo/aggregators';

@Module({
  imports: [TicketAggregatorModule],
  controllers: [TicketController],
  providers: [],
  exports: [],
})
export class TicketModule {}
