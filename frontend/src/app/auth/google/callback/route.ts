'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const GET  = async (req: NextRequest) => {
  const url = req.nextUrl
  const code = url.searchParams.get('code');
  const cookieStore = await cookies()

  if (!code) NextResponse.json({ error: 'No code provided' }, { status: 400 });

  try {
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Could not get tokens from cookies', refreshToken, accessToken }, { status: 400 });
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DEV_CLIENT_URI}/dashboard`);

  } catch (error) {
    NextResponse.json({ error: 'Authentication failed', message: error }, { status: 400 });
  }
};
