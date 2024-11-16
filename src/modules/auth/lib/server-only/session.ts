import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'session';

interface SessionPayload {
  userId: string;
}

class Session {
  private readonly session: IronSession<SessionPayload>;
  constructor(session: IronSession<SessionPayload>) {
    this.session = session;
  }
  async login(payload: SessionPayload) {
    this.session.userId = payload.userId;
    await this.session.save();
  }
  logout() {
    this.session.destroy();
  }
  getPayload(): SessionPayload | null {
    if (this.session.userId == null) return null;

    const payload: SessionPayload = {
      userId: this.session.userId,
    };
    return payload;
  }
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

  return new Session(session);
};
