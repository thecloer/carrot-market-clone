import { MiddlewareConfig, NextMiddleware, NextRequest, NextResponse } from 'next/server';

/**
 * import directly not `/server-only/index.ts` because of the bcrypt in hash-password.ts file.
 */
import { getSession } from './modules/auth/lib/server-only/session';

const PUBLIC_ONLY_PATHS = new Set(['/', '/sign-in', '/sign-up', '/sms']);

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const session = await getSession();

  const isPublicOnlyPath = PUBLIC_ONLY_PATHS.has(request.nextUrl.pathname);
  if (session.isLoggedIn) {
    if (isPublicOnlyPath) {
      return NextResponse.redirect(new URL('/profile', request.nextUrl.origin));
    }
  } else if (!isPublicOnlyPath) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
};

export const config: MiddlewareConfig = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
