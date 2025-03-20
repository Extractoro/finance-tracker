export function extractTokenFromCookies(
  cookieHeader: string,
  tokenName: string,
): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === tokenName) {
      return value;
    }
  }
  return null;
}
