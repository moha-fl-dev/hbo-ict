import type { CreateCommentDto, CreateTicketDto } from '@hbo-ict/lingo/types';
import type { Ticket, TicketNumber, Comment } from '@prisma/client/lingo';
import { Prisma } from '@prisma/client/lingo';

export interface ITicketAggregatorService {
  createTicketWithNumber(
    payload: CreateTicketDto,
  ): Promise<[Ticket, TicketNumber | null] | null>;

  updateTicketByNumber(
    payload: CreateTicketDto,
  ): Promise<[Ticket, TicketNumber | null] | null>;

  createCommentWithTicketAndNumber(
    payload: CreateCommentDto & { ticketNumber: string },
    authorId: string,
  ): Promise<Comment>;
}
