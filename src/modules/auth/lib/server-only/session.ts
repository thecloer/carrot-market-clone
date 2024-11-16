import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'session';

interface SessionPayload {
  userId: string;
}

interface LoggedInSession {
  readonly isLoggedIn: true;
  readonly payload: Readonly<SessionPayload>;
  login(payload: SessionPayload): Promise<void>;
  logout(): void;
}
interface LoggedOutSession {
  login(payload: SessionPayload): Promise<void>;
  readonly isLoggedIn: false;
}

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionPayload>(cookieStore, {
    cookieName: COOKIE_NAME,
    password: process.env.COOKIE_SECRET!,
    ttl: 60 * 60 * 24, // 1 day,
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    },
  });

  const login = async (payload: SessionPayload) => {
    session.userId = payload.userId;
    await session.save();
  };

  if (session.userId == null) {
    return {
      isLoggedIn: false,
      login,
    } as const satisfies LoggedOutSession;
  }

  return {
    isLoggedIn: true,
    login,
    logout() {
      session.destroy();
    },
    payload: {
      userId: session.userId,
    } as const,
  } as const satisfies LoggedInSession;
};
