import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe<Schema> implements PipeTransform {
  constructor(private readonly schema: z.Schema<Schema>) {}

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
