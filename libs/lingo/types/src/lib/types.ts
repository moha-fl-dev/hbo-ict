import { z } from 'zod';
import {
  Prisma,
  SeverityEnum,
  TicketActionTypeEnum,
  TicketStatusEnum,
} from '@prisma/client/lingo';

export type {
  Team,
  Component,
  Department,
  Employee,
  TicketNumber,
  Ticket,
} from '@prisma/client/lingo';
export {
  TicketStatusEnum,
  TicketActionTypeEnum,
  SeverityEnum,
} from '@prisma/client/lingo';

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

export const resetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
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
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

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

export const createComponentSchema = SingleNameFieldSchema.extend({
  team: z.object({
    id: z.string().uuid({
      message: 'You must provide a valid team',
    }),
  }),
});

export type CreateComponentDto = z.infer<typeof createComponentSchema>;

export const createTeamSchema = SingleNameFieldSchema.extend({
  department: z.object({
    id: z.string().uuid({
      message: 'You must provide a valid team',
    }),
  }),
});

export type CreateTeamDto = z.infer<typeof createTeamSchema>;

export type TicketStatus_ENUM = TicketStatusEnum;
export const ticketStatusEnum = TicketStatusEnum;
export type TicketSeverity_ENUM = SeverityEnum;
export type TicketActionType_Enum = TicketActionTypeEnum;

export type StrictTeamWithDepartment = Prisma.TeamGetPayload<{
  include: { Department: true };
}>;

export const accountSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  department: z.object({
    id: z.string().uuid({
      message: 'You must select a department.',
    }),
  }),
  team: z.object({
    id: z.string().uuid({
      message: 'You must select a team.',
    }),
  }),
});

export type AccountDto = z.infer<typeof accountSchema>;

export type ExtendedEmployee = Prisma.EmployeeGetPayload<{
  include: { Team: true };
}>;

export const createTicketSchema = z.object({
  title: z.string().nonempty({
    message: 'Title is required',
  }),
  description: z.string().nonempty({
    message: 'Description is required',
  }),
  severity: z.nativeEnum(SeverityEnum),
  callerId: z.string().uuid({
    message: 'You must provide a valid caller',
  }),
  assigneeId: z.string().uuid({
    message: 'You must provide a valid assignee',
  }),
  teamId: z.string().uuid({
    message: 'You must provide a valid team',
  }),
  ticketNumber: z.string().nonempty({
    message: 'Ticket number is required',
  }),
  status: z.nativeEnum(TicketStatusEnum),
  componentId: z.string().uuid({
    message: 'You must provide a valid component',
  }),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;

export type TicketFindUniqueArgs = Prisma.TicketFindUniqueArgs;

export type TicketNumbeFindUniqueArgs = Prisma.TicketNumberFindUniqueArgs;

export type TicketDefaultReturn = Prisma.TicketGetPayload<{
  include: {
    caller: true;
    assignee: true;
    team: true;
    component: true;
    ticketNumber: true;
  };
}>;
