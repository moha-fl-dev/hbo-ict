import { Inject, Injectable } from '@nestjs/common';
import { TICKET_NUMBER_SERVICE_TOKEN, TICKET_SERVICE_TOKEN } from '../tokens';
import {
  ITicketAggregatorService,
  ITicketNumberService,
  ITicketService,
} from '../interfaces';
import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import { $Enums, Prisma, Ticket, TicketNumber } from '@prisma/client/lingo';
import { CreateTicketDto } from '@hbo-ict/lingo/types';

@Injectable()
export class TicketAggregatorService implements ITicketAggregatorService {
  constructor(
    @Inject(TICKET_NUMBER_SERVICE_TOKEN)
    private readonly ticketNumberService: ITicketNumberService,

    @Inject(TICKET_SERVICE_TOKEN)
    private readonly ticketService: ITicketService,

    private readonly prisma: PrismaService
  ) {}
  async updateTicketByNumber(
    payload: CreateTicketDto
  ): Promise<[Ticket, TicketNumber | null] | null> {
    const ticketN = payload.ticketNumber;

    try {
      const findNumber = await this.ticketNumberService.find({
        where: {
          number: ticketN,
        },
      });

      const updateData: Prisma.TicketUpdateArgs = {
        data: {
          // assignee: { update: { id: payload.assigneeId } },
          team: { update: { id: payload.teamId } },
          component: { update: { id: payload.componentId } },
          status: payload.status,
          severity: payload.severity,
          description: payload.description,
          title: payload.title,

          // caller: { update: { id: payload.callerId } },
        },

        where: {
          ticketNumberId: findNumber.id,
        },
      };

      const updateTicket = await this.ticketService.update({
        data: updateData.data,
        where: updateData.where,
      });

      if (!updateTicket) {
        throw new Error('Failed to update ticket.');
      }

      return [updateTicket, findNumber];
      return null;
    } catch (error) {
      console.error('Transaction failed:', error);
      return null;
    }
  }

  async createTicketWithNumber(
    payload: CreateTicketDto
  ): Promise<[Ticket, TicketNumber | null] | null> {
    const ticketN = payload.ticketNumber;

    try {
      const [ticket, ticketNumber] = await this.prisma.$transaction(
        async (): Promise<[Ticket, TicketNumber | null]> => {
          const ticketNumber =
            await this.ticketNumberService.verifyAndClaimTicketNumber({
              where: {
                number: ticketN,
              },
            });
          if (!ticketNumber) {
            throw new Error(
              'No valid ticket number available or failed to claim the ticket number.'
            );
          }

          const ticketData = this.mapCreateTicketDtoToPrismaInput(
            payload,
            ticketNumber.id
          );

          const ticket = await this.ticketService.create({
            ...ticketData,
            ticketNumber: { connect: { id: ticketNumber.id } },
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

  private mapCreateTicketDtoToPrismaInput(
    payload: CreateTicketDto,
    ticketId: string
  ): Prisma.TicketCreateInput {
    return {
      title: payload.title,
      description: payload.description,
      status: payload.status,
      severity: payload.severity,
      caller: { connect: { id: payload.callerId } },
      assignee: { connect: { id: payload.assigneeId } },
      team: { connect: { id: payload.teamId } },
      component: { connect: { id: payload.componentId } },
      ticketNumber: { connect: { id: ticketId } },
    };
  }
}
