import { Prisma, TicketNumber } from '@prisma/client/lingo';
import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketNumberService {
  constructor(private readonly prisma: PrismaService) {}

  async createTicketNumber(): Promise<TicketNumber | null> {
    const MAX_RETRIES = 5;
    const nanoid = (await import('nanoid')).nanoid;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const number = nanoid(16);

        const newTicketNumber = await this.create({ number });

        return newTicketNumber;
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          continue;
        } else {
          throw error;
        }
      }
    }
    return null;
  }

  private async create(
    payload: Prisma.TicketNumberCreateInput
  ): Promise<TicketNumber> {
    return this.prisma.ticketNumber.create({
      data: payload,
    });
  }

  async getTicketNumber({
    where,
    include,
  }: Prisma.TicketNumberFindFirstOrThrowArgs): Promise<TicketNumber> {
    const ticketNumber = await this.prisma.ticketNumber.findFirstOrThrow({
      where,
      include,
    });

    return ticketNumber;
  }

  async verifyAndClaimTicketNumber({
    where,
    include,
  }: Prisma.TicketNumberFindUniqueArgs): Promise<TicketNumber | null> {
    try {
      const ticketNumberRecord = await this.getTicketNumber({
        where,
        include,
      });

      if (!ticketNumberRecord || ticketNumberRecord.used) {
        return await this.createTicketNumber();
      }

      return await this.claimTicketNumber({
        where,
        include,
      });
    } catch (error) {
      return null;
    }
  }

  private async claimTicketNumber({
    where,
    include,
  }: Prisma.TicketNumberFindUniqueArgs): Promise<TicketNumber | null> {
    try {
      return await this.prisma.ticketNumber.update({
        where,
        data: { used: true },
        include,
      });
    } catch (error) {
      return null;
    }
  }
}
