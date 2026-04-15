import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/admin', '/org', '/player'];
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token =
    req.cookies.get('user_jwt')?.value ||
    req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/org/:path*', '/player/:path*']
};