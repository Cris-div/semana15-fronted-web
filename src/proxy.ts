import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const role = request.cookies.get('role')?.value;
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin') && (!token || role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
