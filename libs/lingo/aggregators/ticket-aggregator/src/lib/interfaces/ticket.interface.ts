import type { Prisma, Ticket } from '@prisma/client/lingo';
import { TicketNumber } from '@prisma/client/lingo';

export interface ITicketService {
  create(ticketData: Prisma.TicketCreateInput): Promise<Ticket>;
  findMany(payload: Prisma.TicketFindManyArgs): Promise<Ticket[]>;
  find({ where, include }: Prisma.TicketFindUniqueArgs): Promise<Ticket | null>;
  update(payload: Prisma.TicketUpdateArgs): Promise<Ticket | null>;
  remove(where: Prisma.TicketWhereUniqueInput): Promise<Ticket | null>;
}
