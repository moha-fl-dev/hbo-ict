import { z } from 'zod';

export const confSchema = z.object({
  PORT: z.number().default(3000),
  SUPABASE_URL: z.string().nonempty(),
  SUPABASE_ANON_KEY: z.string().nonempty(),
  SUPABASE_SERVICE_ROLE: z.string().nonempty(),
  SUPABASE_JWT_SECRET: z.string().nonempty(),
  DB_DIRECT_URL: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
});

export type ConfSchemType = z.infer<typeof confSchema>;

const env = process.env;

if (!env) {
  throw new Error('process.env is undefined'); // wont ever be the case
}

export default (): ConfSchemType => ({
  PORT: parseInt(env['PORT'] as string, 10),
  SUPABASE_URL: env['SUPABASE_URL'] as string,
  SUPABASE_ANON_KEY: env['SUPABASE_ANON_KEY'] as string,
  SUPABASE_SERVICE_ROLE: env['SUPABASE_SERVICE_ROLE'] as string,
  SUPABASE_JWT_SECRET: env['SUPABASE_JWT_SECRET'] as string,
  DB_DIRECT_URL: env['DB_DIRECT_URL'] as string,
  DATABASE_URL: env['DATABASE_URL'] as string,
});

export function validate(values: Record<string, unknown>) {
  if ('API_PORT' in values) {
    // for aesthetics, i want to use PORT instead of API_PORT in the code
    values['PORT'] = parseInt(values['API_PORT'] as string, 10);
    delete values['API_PORT'];
  }

  const validatedConfig = confSchema.parse(values);
  return validatedConfig;
}
