'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CategoriesPage from '@/app/categories/page';
import { getUserIdFromToken } from '@/services/auth';

export default async function Categories() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const userId = getUserIdFromToken(token);
  if (!userId) {
    redirect('/login');
  }

  return <CategoriesPage userId={userId} />;
}
