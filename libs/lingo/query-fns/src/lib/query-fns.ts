import type {
  AuthResponse,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from '@hbo-ict/lingo/types';
import { axiosInstance } from './client/intance';
import axios from 'axios';

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
  const result = await axiosInstance.post<AuthResponse>(
    'auth/sign-up',
    payload,
    {
      headers: {
        noAuth: true,
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
  const result = await axiosInstance.get<AuthResponse>('auth/me');

  return result.data;
}

/**
 *  signs out the user
 * @returns promise of void
 */
async function signOut(): Promise<void> {
  await axiosInstance.post('auth/sign-out');
}

/**
 *  refreshes the token
 * @returns promise of AuthResponse
 */
async function refresh(): Promise<AuthResponse> {
  const result = await axiosInstance.post<AuthResponse>('auth/refresh');

  return result.data;
}

/**
 *  sends a forgot password email
 * @param payload ResetPasswordDto
 * @returns promise of void
 */
async function forgotPassword(payload: ResetPasswordDto): Promise<void> {
  const result = await axiosInstance.post('auth/forgot-password', payload);

  return result.data;
}

async function workspaceRoot() {
  const res = await axiosInstance.get('workspace');

  return res.data;
}

export async function refreshToken() {
  return axios.get('auth/refresh-token', {
    baseURL: process.env['NEXT_PUBLIC_API_URL'] as string,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

const Api = {
  signIn,
  signUp,
  me,
  signOut,
  refresh,
  forgotPassword,
  workspaceRoot,
};

export { Api };
