'use server';

import type {
  SignInDto,
  SignUpDto,
  SuccesfulAuthResponse,
  AuthResponse,
} from '@hbo-ict/lingo/types';
import { type Session } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function signUpAction(payload: SignUpDto): Promise<AuthResponse> {
  const result = await fetch(
    `${process.env['NEXT_PUBLIC_API_URL']}/auth/sign-up`,
    {
      cache: 'no-cache',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await result.json();

  if (data.status === 201) {
    const { access_token, expires_in } = data as SuccesfulAuthResponse;

    await setAuthCookie({ access_token, expires_in });
  }

  return data;
}

export async function signInAction(payload: SignInDto): Promise<AuthResponse> {
  const result = await fetch(
    `${process.env['NEXT_PUBLIC_API_URL']}/auth/sign-in`,
    {
      cache: 'no-cache',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await result.json();

  if (data.status === 202) {
    const { access_token, expires_in } = data as SuccesfulAuthResponse;

    await setAuthCookie({ access_token, expires_in });
  }

  return data;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookie = cookies().get(process.env['NEXT_COOKIE_NAME'] as string);

  return cookie !== undefined;
}

async function setAuthCookie({
  access_token,
  expires_in,
}: Pick<Session, 'access_token' | 'expires_in'>) {
  return cookies().set(
    process.env['NEXT_COOKIE_NAME'] as string,
    access_token,
    {
      path: '/',
      httpOnly: process.env['NODE_ENV'] === 'production',
      secure: process.env['NODE_ENV'] === 'production',
      maxAge: expires_in, // 1 hr from now
      sameSite: 'lax',
    },
  );
}
