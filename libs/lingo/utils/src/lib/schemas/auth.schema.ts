import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignUpSchema = SignInSchema.extend({
  confirm_password: z.string().min(8),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
});

export type SignUpDto = z.infer<typeof SignUpSchema>;
export type SignInDto = z.infer<typeof SignInSchema>;
