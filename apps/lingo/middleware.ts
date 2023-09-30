import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(process.env['NEXT_COOKIE_NAME'] as string);

  if (!cookie || cookie === undefined) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

// match everything after /workspace/ and verify authentication
export const config = {
  matcher: '/workspace/:path*',
};
