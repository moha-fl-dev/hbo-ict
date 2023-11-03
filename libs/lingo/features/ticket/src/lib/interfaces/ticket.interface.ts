import { Prisma, Ticket, TicketNumber } from '@prisma/client/lingo';

export interface ITicketService {
  create(
    data: Prisma.TicketCreateInput,
    number: string
  ): Promise<[Ticket, TicketNumber | null] | null>;
  findAll(): Promise<Ticket[]>;
  find({ where, include }: Prisma.TicketFindUniqueArgs): Promise<Ticket | null>;
  update(payload: Prisma.TicketUpdateInput): Promise<Ticket | null>;
  remove(where: Prisma.TicketWhereUniqueInput): Promise<Ticket | null>;
}
