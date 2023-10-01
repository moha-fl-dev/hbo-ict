import type {
  AuthResponse,
  ResetPasswordDto,
  SignInDto,
} from '@hbo-ict/lingo/types';
import { axionInstance } from './client/intance';

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

async function signUp(payload: SignInDto): Promise<AuthResponse> {
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

async function me(): Promise<AuthResponse> {
  const result = await axionInstance.get<AuthResponse>('auth/me');

  return result.data;
}

async function signOut(): Promise<void> {
  await axionInstance.post('auth/sign-out');
}

async function refresh(): Promise<AuthResponse> {
  const result = await axionInstance.post<AuthResponse>('auth/refresh');

  return result.data;
}

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
