import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
    // console.log(token)
  const protectedRoutes = ['/admin', '/blog/new'];
  if (!token && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const response = NextResponse.next()
  response.cookies.set('token', 'Your secret token')

  return NextResponse.next();
}
