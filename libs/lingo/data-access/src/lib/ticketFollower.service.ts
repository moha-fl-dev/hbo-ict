import { Injectable, NotImplementedException } from '@nestjs/common';
import type { PrismaClient, Prisma } from '@prisma/client/lingo';
import { TicketFollower } from '@prisma/client/lingo';

@Injectable()
export class TicketFollowerService {
  constructor(private readonly prisma: PrismaClient) {}

  async follow({ data }: Prisma.TicketFollowerCreateArgs) {
    const ticketFollower = await this.prisma.ticketFollower.create({
      data,
    });

    return ticketFollower;
  }

  async unFollow({ where }: Prisma.TicketFollowerDeleteArgs) {
    const ticketFollower = await this.prisma.ticketFollower.delete({
      where,
    });

    return ticketFollower;
  }

  async getFollowedTickets({ where }: Prisma.TicketFollowerFindManyArgs) {
    const followedTickets = await this.prisma.ticketFollower.findMany({
      where,
    });

    return followedTickets;
  }
}
