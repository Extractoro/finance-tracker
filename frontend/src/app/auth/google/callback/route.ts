'use server';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET  = async (req: NextRequest) => {
  const url = req.nextUrl
  const code = url.searchParams.get('code');

  if (!code) NextResponse.json({ error: 'No code provided' }, { status: 400 });

  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken');
    const refreshToken = cookiesStore.get('refreshToken');

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Could not get tokens from cookies' }, { status: 400 });
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URI}`);

  } catch (error) {
    NextResponse.json({ error: 'Authentication failed', message: error }, { status: 400 });
  }
};
