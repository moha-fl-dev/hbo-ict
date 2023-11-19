import { PrismaService } from '@hbo-ict/lingo-prisma-client';
import type { CreateCommentDto, CreateTicketDto } from '@hbo-ict/lingo/types';
import { Inject, Injectable } from '@nestjs/common';
import type {
  Comment,
  Prisma,
  Ticket,
  TicketNumber,
} from '@prisma/client/lingo';
import type {
  ICommentService,
  ITicketAggregatorService,
  ITicketNumberService,
  ITicketService,
} from '../interfaces';
import {
  COMMENT_SERVICE_TOKEN,
  TICKET_NUMBER_SERVICE_TOKEN,
  TICKET_SERVICE_TOKEN,
} from '../tokens';

@Injectable()
export class TicketAggregatorService implements ITicketAggregatorService {
  constructor(
    @Inject(TICKET_NUMBER_SERVICE_TOKEN)
    private readonly ticketNumberService: ITicketNumberService,

    @Inject(TICKET_SERVICE_TOKEN)
    private readonly ticketService: ITicketService,

    @Inject(COMMENT_SERVICE_TOKEN)
    private readonly commentService: ICommentService,

    private readonly prisma: PrismaService,
  ) {}

  async createCommentWithTicketAndNumber(
    payload: CreateCommentDto & { ticketNumber: string },
    authorId: string,
  ): Promise<Comment> {
    const ticketN = await this.ticketNumberService.find({
      where: {
        number: payload.ticketNumber,
      },
    });

    const ticket = await this.ticketService.find({
      where: {
        ticketNumberId: ticketN.id,
      },
    });

    if (!ticket) {
      throw new Error('Ticket not found.');
    }

    const data: Prisma.CommentCreateInput = {
      content: payload.content,
      author: {
        connect: {
          id: authorId,
        },
      },
      ticket: {
        connect: {
          id: ticket.id,
        },
      },
    };

    const comment = await this.commentService.createComment(data);

    return comment;
  }
  async updateTicketByNumber(
    payload: CreateTicketDto,
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
          assignee: { connect: { id: payload.assigneeId } },
          team: { connect: { id: payload.teamId } },
          component: { connect: { id: payload.componentId } },
          status: payload.status,
          severity: payload.severity,
          description: payload.description,
          title: payload.title,

          caller: { connect: { id: payload.callerId } },
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
    payload: CreateTicketDto,
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
              'No valid ticket number available or failed to claim the ticket number.',
            );
          }

          const ticketData = this.mapCreateTicketDtoToPrismaInput(
            payload,
            ticketNumber.id,
          );

          const ticket = await this.ticketService.create({
            ...ticketData,
            ticketNumber: { connect: { id: ticketNumber.id } },
          });
          return [ticket, ticketNumber];
        },
      );
      return [ticket, ticketNumber];
    } catch (error) {
      console.error('Transaction failed:', error);
      return null;
    }
  }

  private mapCreateTicketDtoToPrismaInput(
    payload: CreateTicketDto,
    ticketId: string,
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
