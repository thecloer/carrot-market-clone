import { DB, type User } from '@/modules/global/lib';

export const UserRepository = {
  async createByEmail({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const id = crypto.randomUUID();
    const user: Readonly<User> = { id, username, email, password };
    DB.users.set(id, { id, username, email, password });
    return user;
  },
  async existsByUsername(username: string) {
    return DB.users.values().some((user) => user.username === username);
  },
  async existsByEmail(email: string) {
    return DB.users.values().some((user) => user.email === email);
  },
  async findById(id: string) {
    const user: Readonly<User> | null = DB.users.get(id) ?? null;
    return user;
  },
  async findByEmail(email: string) {
    const user: Readonly<User> | null =
      DB.users.values().find((user) => user.email === email) ?? null;
    return user;
  },
};
