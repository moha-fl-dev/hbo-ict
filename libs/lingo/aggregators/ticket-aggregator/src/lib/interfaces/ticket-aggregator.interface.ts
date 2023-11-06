import { Prisma, Ticket, TicketNumber } from '@prisma/client/lingo';

export interface ITicketAggregatorService {
  createTicketWithNumber(
    ticketData: Prisma.TicketCreateInput,
    ticketNumberData: Prisma.TicketNumberCreateInput
  ): Promise<[Ticket, TicketNumber | null] | null>;
}
