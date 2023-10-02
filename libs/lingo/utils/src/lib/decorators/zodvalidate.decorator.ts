import { UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod.validation.pipe';

/**
 * Validate the given object against the given schema.
 *
 * @param schema - The schema to validate against.
 * @returns A validation pipe.
 */
export function ZodValidate<T>(schema: z.Schema<T>) {
  return UsePipes(new ZodValidationPipe<T>(schema));
}
