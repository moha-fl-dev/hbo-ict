import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;

  const [access_token, refresh_token] = cookies.getAll();

  if (!access_token || !refresh_token) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/workspace/:path*'],
};
