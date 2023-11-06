import { Module } from '@nestjs/common';
import { TicketNumberController } from './ticket-number.controller';
import { TicketAggregatorModule } from '@hbo-ict/lingo/aggregators';

@Module({
  imports: [TicketAggregatorModule],
  controllers: [TicketNumberController],
  providers: [],
  exports: [],
})
export class TicketNumberModule {}
