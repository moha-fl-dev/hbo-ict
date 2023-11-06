import { Prisma, Ticket, TicketNumber } from '@prisma/client/lingo';

export interface ITicketService {
  create(ticketData: Prisma.TicketCreateInput): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  find({ where, include }: Prisma.TicketFindUniqueArgs): Promise<Ticket | null>;
  update(payload: Prisma.TicketUpdateInput): Promise<Ticket | null>;
  remove(where: Prisma.TicketWhereUniqueInput): Promise<Ticket | null>;
}
