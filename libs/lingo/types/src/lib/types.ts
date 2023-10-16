import { z } from 'zod';

/**
 * shared zod schema for front-end and back-end
 * see usage libs/lingo/auth/src/lib/auth.controller.ts
 * and the auth page in the front-end
 */

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

/**
 * The DTO for the sign up endpoint.
 */
export type SignUpDto = z.infer<typeof SignUpSchema>;
/**
 * The DTO for the sign in endpoint.
 */
export type SignInDto = z.infer<typeof SignInSchema>;
/**
 * The DTO for the reset password endpoint.
 */
export type ResetPasswordDto = z.infer<typeof emailSchema>;

/**
 * The response from the auth endpoint when the user sign in is success.
 */
export type SuccesfulAuthResponse = {
  status: number;
  message: string;
  access_token: string;
  expires_in: number;
};

/**
 * The response from the auth endpoint when the user sign in is failure.
 */
export type FailedAuthResponse = {
  status: number;
  message: string;
};

/**
 * The response from the auth endpoint when the user signs in is either a success or a failure.
 * This type represents both cases.
 * aka discriminated union
 */
export type AuthResponse = SuccesfulAuthResponse | FailedAuthResponse;

export const SingleNameFieldSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
});

export type SingleNameFieldDto = z.infer<typeof SingleNameFieldSchema>;
