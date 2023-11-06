import { CreateTicketDto } from '@hbo-ict/lingo/types';
import { Prisma, Ticket, TicketNumber } from '@prisma/client/lingo';

export interface ITicketAggregatorService {
  createTicketWithNumber(
    payload: CreateTicketDto
  ): Promise<[Ticket, TicketNumber | null] | null>;

  updateTicketByNumber(
    payload: CreateTicketDto
  ): Promise<[Ticket, TicketNumber | null] | null>;
}
