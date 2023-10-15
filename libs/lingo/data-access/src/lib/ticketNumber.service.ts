import {
  PrismaService,
  Prisma,
  TicketNumber,
} from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketNumberService {
  constructor(private readonly prisma: PrismaService) {}

  async getNextTicketNumber(): Promise<TicketNumber['currentNumber']> {
    const nextNumber = await this.nextTicketNumber();

    return nextNumber;
  }

  private async getCurrentTicketNumber(): Promise<TicketNumber> {
    const ticketNumber = await this.prisma.ticketNumber.findFirstOrThrow();

    return ticketNumber;
  }

  private async nextTicketNumber(): Promise<TicketNumber['currentNumber']> {
    const { currentNumber } = await this.getCurrentTicketNumber();

    const data: Prisma.TicketNumberUpdateInput = {
      currentNumber: currentNumber + 1,
    };

    const nextTicketNumber = await this.prisma.ticketNumber.update({
      where: { currentNumber: currentNumber },
      data,
    });

    const { currentNumber: nextNumber } = nextTicketNumber;

    return nextNumber;
  }
}
