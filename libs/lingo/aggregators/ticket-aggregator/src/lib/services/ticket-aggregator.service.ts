import { Inject, Injectable } from '@nestjs/common';
import { TICKET_NUMBER_SERVICE_TOKEN, TICKET_SERVICE_TOKEN } from '../tokens';
import {
  ITicketAggregatorService,
  ITicketNumberService,
  ITicketService,
} from '../interfaces';
import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { Prisma, Ticket, TicketNumber } from '@prisma/client/lingo';

@Injectable()
export class TicketAggregatorService implements ITicketAggregatorService {
  constructor(
    @Inject(TICKET_NUMBER_SERVICE_TOKEN)
    private readonly ticketNumberService: ITicketNumberService,

    @Inject(TICKET_SERVICE_TOKEN)
    private readonly ticketService: ITicketService,

    private readonly prisma: PrismaService
  ) {}

  async createTicketWithNumber(
    ticketData: Prisma.TicketCreateInput,
    ticketNumberData: Prisma.TicketNumberCreateInput
  ): Promise<[Ticket, TicketNumber | null] | null> {
    try {
      const [ticket, ticketNumber] = await this.prisma.$transaction(
        async (): Promise<[Ticket, TicketNumber | null]> => {
          const ticketNumber =
            await this.ticketNumberService.verifyAndClaimTicketNumber({
              where: {
                number: ticketNumberData.number,
              },
            });
          if (!ticketNumber) {
            throw new Error(
              'No valid ticket number available or failed to claim the ticket number.'
            );
          }
          const ticket = await this.ticketService.create({
            ...ticketData,
            ticketNumber: {
              connect: {
                id: ticketNumber.id,
              },
            },
          });
          return [ticket, ticketNumber];
        }
      );
      return [ticket, ticketNumber];
    } catch (error) {
      console.error('Transaction failed:', error);
      return null;
    }
  }
}
