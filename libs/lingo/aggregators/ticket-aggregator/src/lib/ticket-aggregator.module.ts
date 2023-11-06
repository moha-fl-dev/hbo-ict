import { Module } from '@nestjs/common';
import {
  TicketAggregatorService,
  TicketNumberService,
  TicketService,
} from './services';
import {
  COMMENT_SERVICE_TOKEN,
  TICKET_AGGREGATOR_TOKEN,
  TICKET_NUMBER_SERVICE_TOKEN,
  TICKET_SERVICE_TOKEN,
} from './tokens';
import { CommentService } from './services/comment.service';

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
    {
      provide: COMMENT_SERVICE_TOKEN,
      useClass: CommentService,
    },
  ],
  exports: [
    TICKET_NUMBER_SERVICE_TOKEN,
    TICKET_SERVICE_TOKEN,
    TICKET_AGGREGATOR_TOKEN,
    COMMENT_SERVICE_TOKEN,
  ],
})
export class TicketAggregatorModule {}
