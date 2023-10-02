import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

/**
 * A pipe that validates the incoming data against a zod schema. generic type. can validate any type of zod schema.
 */
@Injectable()
export class ZodValidationPipe<Schema> implements PipeTransform {
  constructor(private readonly schema: z.Schema<Schema>) {}

  /**
   * Transform the incoming data.
   *
   * @param value - The incoming data.
   * @param metadata - The metadata about the incoming data.
   * @returns The transformed data.
   */
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const result = this.schema.parse(value);

      console.log({
        result,
        metadata,
      });

      return result;
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.issues);
      }

      throw new BadRequestException(error);
    }
  }
}
