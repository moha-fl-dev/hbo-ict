import type {
  AuthResponse,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from '@hbo-ict/lingo/types';
import { axionInstance } from './client/intance';

/**
 *  signs in the user
 * @param payload signInDto
 * @returns promise of AuthResponse
 */
async function signIn(payload: SignInDto): Promise<AuthResponse> {
  const result = await axionInstance.post<AuthResponse>(
    'auth/sign-in',
    payload,
    {
      headers: {
        NoAuth: true,
      },
    }
  );

  return result.data;
}

/**
 *  signs up the user
 * @param payload signUpDto
 * @returns
 */
async function signUp(payload: SignUpDto): Promise<AuthResponse> {
  const result = await axionInstance.post<AuthResponse>(
    'auth/sign-up',
    payload,
    {
      headers: {
        NoAuth: true,
      },
    }
  );

  return result.data;
}

/**
 *  gets the current user
 * @returns promise of AuthResponse
 */
async function me(): Promise<AuthResponse> {
  const result = await axionInstance.get<AuthResponse>('auth/me');

  return result.data;
}

/**
 *  signs out the user
 * @returns promise of void
 */
async function signOut(): Promise<void> {
  await axionInstance.post('auth/sign-out');
}

/**
 *  refreshes the token
 * @returns promise of AuthResponse
 */
async function refresh(): Promise<AuthResponse> {
  const result = await axionInstance.post<AuthResponse>('auth/refresh');

  return result.data;
}

/**
 *  sends a forgot password email
 * @param payload ResetPasswordDto
 * @returns promise of void
 */
async function forgotPassword(payload: ResetPasswordDto): Promise<void> {
  await axionInstance.post('auth/forgot-password', payload);
}

const Api = {
  signIn,
  signUp,
  me,
  signOut,
  refresh,
  forgotPassword,
};

export { Api };
