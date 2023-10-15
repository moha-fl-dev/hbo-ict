import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, TicketHistory } from '@prisma/client/lingo';

@Injectable()
export class TickerHistoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ data }: Prisma.TicketHistoryCreateArgs) {
    const ticketHistory = await this.prisma.ticketHistory.create({
      data,
    });

    return ticketHistory;
  }

  async get({ where, include }: Prisma.TicketHistoryFindUniqueArgs) {
    const ticketHistory = await this.prisma.ticketHistory.findMany({
      where,
      include,
    });

    return ticketHistory;
  }

  async update(payload: Prisma.TicketHistoryUpdateInput) {
    const ticketHistory = await this.prisma.ticketHistory.update({
      where: {
        id: String(payload.id),
      },
      data: payload,
    });

    return ticketHistory;
  }
}
