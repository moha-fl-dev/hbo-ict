import { Injectable } from '@nestjs/common';
import { Prisma, TicketNumber, Ticket } from '@prisma/client/lingo';
import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { TicketNumberService } from './ticketNumber.service';

@Injectable()
export class TicketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketNumberService: TicketNumberService
  ) {}

  async create(data: Prisma.TicketCreateInput, number: string) {
    //

    try {
      const [ticket, ticketNumber]: [Ticket, TicketNumber | null] =
        await this.prisma.$transaction(async (ctx) => {
          const ticketNumber =
            await this.ticketNumberService.verifyAndClaimTicketNumber({
              where: {
                number,
              },
            });

          if (!ticketNumber) {
            throw new Error(
              'No valid ticket number available or failed to claim the ticket number.'
            );
          }

          const ticket = await ctx.ticket.create({
            data: {
              ...data,
              ticketNumber: {
                connect: {
                  id: ticketNumber.id,
                },
              },
            },
          });

          return [ticket, ticketNumber];
        });

      return [ticket, ticketNumber];
    } catch (error) {
      console.error('Transaction failed:', error);
      return null;
    }
  }

  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne({ where, include }: Prisma.TicketFindUniqueArgs) {
    return this.prisma.ticket.findUnique({
      where,
      include,
    });
  }

  async update(
    where: Prisma.TicketWhereUniqueInput,
    data: Prisma.TicketUpdateInput
  ) {
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
