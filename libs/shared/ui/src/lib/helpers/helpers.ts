'use server';

import { cookies } from 'next/headers';
import { Session } from '@supabase/supabase-js';

export async function setAuthCookies({
  access_token,
  expires_in,
  refresh_token,
}: Pick<Session, 'access_token' | 'expires_in' | 'refresh_token'>) {
  const cookie = cookies();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore ???
  return cookie.set({
    name: process.env.NEXT_COOKIE_NAME,
    value: JSON.stringify({
      access_token,
      refresh_token,
    }),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
