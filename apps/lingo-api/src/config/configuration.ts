import { z } from 'zod';

export const confSchema = z.object({
  PORT: z.number().default(3000),
  //   DB_HOST: z.string(),
  //   DB_NAME: z.string().default('postgres'),
  //   DIRECT_DB_PORT: z.coerce.number().default(5432),
  //   DATABASE_PORT: z.coerce.number().default(5432),
  //   DB_USER: z.string(),
  //   DB_PASSWORD: z.string(),
  //   DB_DIRECT_URL: z.string(),
  //   DATABASE_URL: z.string(),
});

export type ConfSchemType = z.infer<typeof confSchema>;

export default (): ConfSchemType => ({
  PORT: parseInt(process.env.PORT, 10),
});

export function validate(values: Record<string, unknown>) {
  if ('API_PORT' in values) {
    // for aesthetics, i want to use PORT instead of API_PORT in the code
    values.PORT = parseInt(values.API_PORT as string, 10);
    delete values.API_PORT;
  }

  const validatedConfig = confSchema.parse(values);
  return validatedConfig;
}
