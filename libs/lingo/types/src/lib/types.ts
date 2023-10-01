import { z } from 'zod';

const rememberMeSchema = z.object({
  remember_me: z.boolean().default(false).optional(),
});

export const emailSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
});

const eamilAndPasswordSchema = emailSchema.extend({
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});

export const SignInSchema = eamilAndPasswordSchema.and(rememberMeSchema);

export const SignUpSchema = eamilAndPasswordSchema
  .extend({
    confirm_password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type SignUpDto = z.infer<typeof SignUpSchema>;
export type SignInDto = z.infer<typeof SignInSchema>;
export type ResetPasswordDto = z.infer<typeof emailSchema>;

export type SuccesfulAuthResponse = {
  status: number;
  message: string;
  access_token: string;
  expires_in: number;
};

export type FailedAuthResponse = {
  status: number;
  message: string;
};

export type AuthResponse = SuccesfulAuthResponse | FailedAuthResponse;
