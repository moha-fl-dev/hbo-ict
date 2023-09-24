import { z } from 'zod';

const rememberMeSchema = z.object({
  remember_me: z.boolean().default(false).optional(),
});

export const SignInSchema = rememberMeSchema.extend({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});

export const SignUpSchema = SignInSchema.extend({
  confirm_password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
});

export type SignUpDto = z.infer<typeof SignUpSchema>;
export type SignInDto = z.infer<typeof SignInSchema>;
