import { Session } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { access_token, expires_in, refresh_token } =
    (await req.json()) as Session;

  const requestHeaders = new Headers(req.headers);

  const cookie = {
    name: process.env.NEXT_COOKIE_NAME as string,
    value: JSON.stringify({ access_token, refresh_token }),
    expires: new Date(expires_in * 1000), // convert to milliseconds // TODO: check if this is correct
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: expires_in,
  };

  requestHeaders.set('Set-Cookie', `${JSON.stringify(cookie)}}`);

  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore ???
  // const cookie = cookies().set({
  //   name: process.env.NEXT_COOKIE_NAME as string,
  //   value: JSON.stringify({ access_token, refresh_token }),
  //   expires: new Date(expires_in * 1000), // convert to milliseconds // TODO: check if this is correct
  //   path: '/',
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'lax',
  //   httpOnly: true,
  //   maxAge: expires_in,
  // });

  // console.log(cookie);

  return new Response(JSON.stringify({ access_token }), {
    status: 200,
    headers: requestHeaders,
  });
}
