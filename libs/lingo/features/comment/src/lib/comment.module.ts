import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TicketAggregatorModule } from '@hbo-ict/lingo/aggregators';

@Module({
  imports: [TicketAggregatorModule],
  controllers: [CommentController],
  providers: [],
  exports: [],
})
export class CommentModule {}
