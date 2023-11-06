import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { TransformInclude, ZodValidate } from '@hbo-ict/lingo-utils';
import { createCommentSchema, CreateCommentDto } from '@hbo-ict/lingo/types';
import { User } from '@supabase/supabase-js';
import {
  COMMENT_SERVICE_TOKEN,
  ICommentService,
  ITicketAggregatorService,
  TICKET_AGGREGATOR_TOKEN,
} from '@hbo-ict/lingo/aggregators';
import { Prisma } from '@prisma/client/lingo';

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

  @Get('/all')
  async all(
    @Query() query: Prisma.CommentFindManyArgs,
    @TransformInclude()
    transformIncludeBooleanValues: Prisma.CommentFindManyArgs['include']
  ) {
    query.include = transformIncludeBooleanValues;

    console.log(JSON.stringify(query, null, 2));

    return this.commentService.findMany(query);
  }
}
