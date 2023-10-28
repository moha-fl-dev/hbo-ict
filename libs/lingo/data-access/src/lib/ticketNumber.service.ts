import { Prisma, TicketNumber } from '@prisma/client/lingo';
import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketNumberService {
  constructor(private readonly prisma: PrismaService) {}

  async createTicketNumber(): Promise<TicketNumber> {
    const { nanoid } = await import('nanoid');

    const number = nanoid(16);

    const ticketNumber = await this.prisma.ticketNumber.create({
      data: {
        number,
      },
    });

    return ticketNumber;
  }

  async getTicketNumber(
    args: Prisma.TicketNumberFindFirstOrThrowArgs
  ): Promise<TicketNumber> {
    const ticketNumber = await this.prisma.ticketNumber.findFirstOrThrow({
      ...args,
    });

    return ticketNumber;
  }
}
