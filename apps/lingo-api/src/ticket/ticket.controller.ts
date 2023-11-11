import { TicketService } from '@hbo-ict/data-access';
import { TransformInclude, ZodValidate } from '@hbo-ict/lingo-utils';
import {
  CreateTicketDto,
  TicketFindUniqueArgs,
  createTicketSchema,
} from '@hbo-ict/lingo/types';
import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Prisma } from '@prisma/client/lingo';

type Delta<T, S> = {
  [P in keyof T]?: T[P] | S;
};

@Controller('ticket')
export class TicketController {
  private static REMOVED_PROPERTY = Symbol('removed');

  constructor(private readonly ticketService: TicketService) {}

  @Post('/create')
  @ZodValidate<CreateTicketDto>(createTicketSchema)
  async create(@Req() req: { body: CreateTicketDto }) {
    //

    const { body } = req;
    const { ticketNumber } = body;

    const ticketData: Prisma.TicketCreateInput = {
      title: body.title,
      description: body.description,
      status: body.status,
      severity: body.severity,
      caller: {
        connect: {
          id: body.callerId,
        },
      },
      assignee: {
        connect: {
          id: body.assigneeId,
        },
      },
      team: {
        connect: {
          id: body.teamId,
        },
      },
      component: {
        connect: {
          id: body.componentId,
        },
      },
      ticketNumber: {
        connect: {
          id: body.ticketNumber,
        },
      },
    };

    console.log({
      ticketData,
    });

    const data = await this.ticketService.create(
      {
        ...ticketData,
      },
      ticketNumber,
    );

    return data;
  }

  @Get('/find')
  async find(
    @Query() query: TicketFindUniqueArgs,
    @TransformInclude()
    transformIncludeBooleanValues: TicketFindUniqueArgs['include'],
  ) {
    const { where } = query;

    const res = await this.ticketService.find({
      where,
      include: transformIncludeBooleanValues,
    });

    return res;
  }

  @Post(':number/update')
  @ZodValidate<CreateTicketDto>(createTicketSchema)
  async update(@Req() req: { body: Prisma.TicketUpdateInput }) {
    const { body } = req;

    return this.ticketService.update(body);
  }

  private findDeltaDiff<T extends object>(
    originalObject: T,
    revisedObject: T,
  ): Delta<T, typeof TicketController.REMOVED_PROPERTY> {
    if (
      typeof originalObject === 'object' &&
      typeof revisedObject === 'object' &&
      !Array.isArray(originalObject) &&
      !Array.isArray(revisedObject) &&
      originalObject !== null &&
      revisedObject !== null &&
      typeof originalObject !== typeof revisedObject
    ) {
      throw new Error('unsupported types');
    }

    const delta: Partial<T> = {};

    const allKeys: Set<string> = new Set([
      ...Object.keys(originalObject),
      ...Object.keys(revisedObject),
    ]);

    // for (const key of allKeys) {
    //   const originalValue = originalObject[key as keyof T];
    //   const revisedValue = revisedObject[key as keyof T];

    //   if (
    //     typeof originalValue === 'object' &&
    //     typeof revisedValue === 'object' &&
    //     !Array.isArray(originalValue) &&
    //     !Array.isArray(revisedValue) &&
    //     originalValue !== null &&
    //     revisedValue !== null
    //   ) {
    //     const nestedDelta = this.findDeltaDiff(originalValue, revisedValue);

    //     if (Object.keys(nestedDelta).length > 0) {
    //       delta[key as keyof T] = nestedDelta as T[Extract<keyof T, string>];
    //     }
    //   } else if (
    //     !originalObject.hasOwnProperty(key) ||
    //     originalValue !== revisedValue
    //   ) {
    //     delta[key as keyof T] = revisedValue as T[Extract<keyof T, string>];
    //   }
    // }

    allKeys.forEach((key) => {
      const originalValue = originalObject[key as keyof T];
      const revisedValue = revisedObject[key as keyof T];

      if (
        typeof originalValue === 'object' &&
        typeof revisedValue === 'object' &&
        !Array.isArray(originalValue) &&
        !Array.isArray(revisedValue) &&
        originalValue !== null &&
        revisedValue !== null
      ) {
        const nestedDelta = this.findDeltaDiff(originalValue, revisedValue);
        if (Object.keys(nestedDelta).length > 0) {
          delta[key as keyof T] = nestedDelta as T[Extract<keyof T, string>];
        }
      } else if (
        (Object.prototype.hasOwnProperty.call(originalObject, key) &&
          !Object.prototype.hasOwnProperty.call(revisedObject, key)) ||
        (Object.prototype.hasOwnProperty.call(revisedObject, key) &&
          !Object.prototype.hasOwnProperty.call(originalObject, key)) ||
        originalValue !== revisedValue
      ) {
        delta[key as keyof T] = TicketController.REMOVED_PROPERTY as T[Extract<
          keyof T,
          string
        >];
      }
    });

    return delta;
  }

  private applyDelta<T>(
    object: T,
    delta: Delta<T, typeof TicketController.REMOVED_PROPERTY>,
  ): T {
    for (const key in delta) {
      if (delta[key] === TicketController.REMOVED_PROPERTY) {
        delete object[key];
      } else {
        object[key as keyof T] = delta[key] as T[Extract<keyof T, string>];
      }
    }
    return object;
  }
}
