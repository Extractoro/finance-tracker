import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = process.env.NEXT_PUBLIC_PROTECTED_ROUTES
  ? process.env.NEXT_PUBLIC_PROTECTED_ROUTES.split(',')
  : [];

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const isAuthenticated = Boolean(accessToken || refreshToken);

  const pathname = req.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith('/auth');

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (pathname === '/') {
    return NextResponse.redirect(new URL(isAuthenticated ? '/dashboard' : '/auth/signin', req.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*', '/transactions/:path*', '/categories/:path*', '/profile/:path*', '/settings/:path*'],
};