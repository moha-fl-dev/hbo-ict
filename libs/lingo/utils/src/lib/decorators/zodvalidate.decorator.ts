import { UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod.validation.pipe';

export function ZodValidate<T>(schema: z.Schema<T>) {
  return UsePipes(new ZodValidationPipe<T>(schema));
}
