import { Injectable } from '@nestjs/common';
import { Prisma, TicketNumber, Ticket } from '@prisma/client/lingo';
import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { ITicketService } from '../interfaces/ticket.interface';

@Injectable()
export class TicketService implements ITicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ticketData: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: ticketData,
    });
  }

  async findAll() {
    return this.prisma.ticket.findMany();
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
