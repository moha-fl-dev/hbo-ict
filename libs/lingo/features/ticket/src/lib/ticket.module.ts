import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketAggregatorModule } from '@hbo-ict/lingo/aggregators';

@Module({
  imports: [TicketAggregatorModule],
  controllers: [TicketController],
  providers: [],
  exports: [],
})
export class TicketModule {}
