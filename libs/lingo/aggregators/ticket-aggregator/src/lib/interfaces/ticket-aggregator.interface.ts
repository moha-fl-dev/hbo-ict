import { CreateCommentDto, CreateTicketDto } from '@hbo-ict/lingo/types';
import { Prisma, Ticket, TicketNumber, Comment } from '@prisma/client/lingo';

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
