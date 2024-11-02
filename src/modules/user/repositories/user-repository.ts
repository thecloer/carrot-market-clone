import { DB } from '@/modules/global/lib';

export const UserRepository = {
  async createByEmail({ username, email, password }: { username: string; email: string; password: string }) {
    const id = crypto.randomUUID();
    const user = { id, username, email, password } as const;
    DB.users.set(id, { id, username, email, password });
    return user;
  },
  async existsByUsername(username: string) {
    return DB.users.values().some((user) => user.username === username);
  },
  async existsByEmail(email: string) {
    return DB.users.entries().some(([, user]) => user.email === email);
  },
  async findById(id: string) {
    return DB.users.get(id) ?? null;
  },
  async findByEmail(email: string) {
    return DB.users.values().find((user) => user.email === email) ?? null;
  },
};
