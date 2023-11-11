import {
  AuthResponse,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from '@hbo-ict/lingo/types';
import axios from 'axios';
import { axiosInstance } from '../client/intance';

async function refreshToken() {
  return axios.get('auth/refresh-token', {
    baseURL: process.env['NEXT_PUBLIC_API_URL'] as string,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

/**
 *  sends a forgot password email
 * @param payload ResetPasswordDto
 * @returns promise of void
 */
async function resetPassword(payload: ResetPasswordDto): Promise<void> {
  const result = await axiosInstance.post('auth/reset-password', payload);

  return result.data;
}

/**
 *  signs in the user
 * @param payload signInDto
 * @returns promise of AuthResponse
 */
async function signIn(payload: SignInDto): Promise<AuthResponse> {
  const result = await axiosInstance.post<AuthResponse>(
    'auth/sign-in',
    payload,
    {
      headers: {
        noAuth: true,
      },
    },
  );
  return result.data;
}

/**
 *  signs up the user
 * @param payload signUpDto
 * @returns
 */
async function signUp(payload: SignUpDto): Promise<AuthResponse> {
  const result = await axiosInstance.post<AuthResponse>(
    'auth/sign-up',
    payload,
    {
      headers: {
        noAuth: true,
      },
    },
  );

  return result.data;
}

/**
 *  gets the current user
 * @returns promise of AuthResponse
 */
async function me(): Promise<{ email: string }> {
  const result = await axiosInstance.get<{ email: string }>('auth/me');

  return result.data;
}

/**
 *  signs out the user
 * @returns promise of void
 */
async function signOut(): Promise<void> {
  const res = await axiosInstance.post('auth/sign-out');

  return res.data;
}

/**
 *  refreshes the token
 * @returns promise of AuthResponse
 */
async function refresh(): Promise<AuthResponse> {
  const result = await axiosInstance.post<AuthResponse>('auth/refresh');

  return result.data;
}

const auth = {
  signIn,
  signUp,
  me,
  signOut,
  refresh,
  resetPassword,
  refreshToken,
};

export { auth };
