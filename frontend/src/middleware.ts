import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = process.env.NEXT_PUBLIC_PROTECTED_ROUTES
  ? process.env.NEXT_PUBLIC_PROTECTED_ROUTES.split(',')
  : [];


export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if ((accessToken || refreshToken) && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!accessToken && !refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next()
};

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};