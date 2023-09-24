'use server';

import { SignInDto, SignUpDto } from '@hbo-ict/lingo/types';
import { type Session } from '@supabase/supabase-js';

export async function SignUpAction(
  payload: SignUpDto
): Promise<{ status: number }> {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
    {
      cache: 'no-cache',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await result.json();

  if (data.status === 201) {
    const { access_token, expires_in, refresh_token } = data.session as Session;
    console.log({
      access_token,
      expires_in,
      refresh_token,
    });

    const res = await fetch(`http://localhost:4200/api/auth`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        expires_in,
        refresh_token,
      }),
    });

    const sessRes = await res.json();

    console.log(sessRes);
  }

  return {
    status: data.status,
  };
}

export async function SignInAction(payload: SignInDto) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
    {
      cache: 'no-cache',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await result.json();

  return data;
}
