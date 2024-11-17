import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('authToken'); // Get token from cookies
  const protectedRoutes = ['/admin', '/blog/new', '/blog/edit', '/faw/new', '/faq/edit'];

  if (!token && !req.nextUrl.pathname.includes('login') && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
}


  if (token  && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    try {

      const validateUrl = new URL('/auth/validate', process.env.NEXT_PUBLIC_FASTAPI_URL);
      const response = await fetch(validateUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }


      return NextResponse.next();
    } catch (error) {
      console.error('Error validating token:', error);
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}
