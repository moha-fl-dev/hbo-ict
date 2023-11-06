import { Module } from '@nestjs/common';
import {
  TicketAggregatorService,
  TicketNumberService,
  TicketService,
} from './services';
import {
  TICKET_AGGREGATOR_TOKEN,
  TICKET_NUMBER_SERVICE_TOKEN,
  TICKET_SERVICE_TOKEN,
} from './tokens';

@Module({
  controllers: [],
  providers: [
    {
      provide: TICKET_NUMBER_SERVICE_TOKEN,
      useClass: TicketNumberService,
    },
    {
      provide: TICKET_SERVICE_TOKEN,
      useClass: TicketService,
    },

    {
      provide: TICKET_AGGREGATOR_TOKEN,
      useClass: TicketAggregatorService,
    },
  ],
  exports: [
    TICKET_NUMBER_SERVICE_TOKEN,
    TICKET_SERVICE_TOKEN,
    TICKET_AGGREGATOR_TOKEN,
  ],
})
export class TicketAggregatorModule {}
