import { Controller, Inject, Post, Req } from '@nestjs/common';
import { ZodValidate } from '@hbo-ict/lingo-utils';
import { createCommentSchema, CreateCommentDto } from '@hbo-ict/lingo/types';
import { User } from '@supabase/supabase-js';
import {
  COMMENT_SERVICE_TOKEN,
  ICommentService,
  ITicketAggregatorService,
  TICKET_AGGREGATOR_TOKEN,
} from '@hbo-ict/lingo/aggregators';

@Controller('comment')
export class CommentController {
  constructor(
    @Inject(TICKET_AGGREGATOR_TOKEN)
    private readonly ticketAggregatorService: ITicketAggregatorService,

    @Inject(COMMENT_SERVICE_TOKEN)
    private readonly commentService: ICommentService
  ) {}

  @Post('/create')
  @ZodValidate<CreateCommentDto>(createCommentSchema)
  async create(
    @Req()
    req: {
      body: CreateCommentDto & { ticketNumber: string };
      user: User;
    }
  ) {
    const {
      body,
      user: { id },
    } = req;
    return this.ticketAggregatorService.createCommentWithTicketAndNumber(
      body,
      id
    );
  }
}
