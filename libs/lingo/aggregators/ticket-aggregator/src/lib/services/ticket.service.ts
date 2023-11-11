import { Injectable } from '@nestjs/common';
import type { Prisma, Ticket } from '@prisma/client/lingo';
import { TicketNumber } from '@prisma/client/lingo';
import type { PrismaService } from '@hbo-ict/lingo-prisma-client';
import type { ITicketService } from '../interfaces/ticket.interface';
import { TicketDefaultReturn } from '@hbo-ict/lingo/types';

@Injectable()
export class TicketService implements ITicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ticketData: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: ticketData,
    });
  }

  async findMany(payload: Prisma.TicketFindManyArgs): Promise<Ticket[]> {
    return this.prisma.ticket.findMany(payload);
  }

  async find({ where, include }: Prisma.TicketFindUniqueArgs) {
    return this.prisma.ticket.findUnique({
      where,
      include,
    });
  }

  async update({ data, where }: Prisma.TicketUpdateArgs) {
    return this.prisma.ticket.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.TicketWhereUniqueInput) {
    return this.prisma.ticket.delete({
      where,
    });
  }
}
