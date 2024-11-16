import type { User } from '@prisma/client';
import type { NonNullableFields } from '@/modules/global/lib';
import { prisma } from '@/modules/global/lib';

export const UserRepository = {
  createByEmail({
    username,
    email,
    password,
  }: NonNullableFields<Pick<User, 'username' | 'email' | 'password'>>) {
    return prisma.user.create({ data: { username, email, password }, select: { id: true } });
  },
  async existsByUsername({ username }: Pick<User, 'username'>) {
    const result = await prisma.user.findUnique({
      select: { id: true },
      where: { username },
    });
    return result !== null;
  },
  async existsByEmail({ email }: NonNullableFields<Pick<User, 'email'>>) {
    const result = await prisma.user.findUnique({
      select: { id: true },
      where: { email },
    });
    return result !== null;
  },
  findById({ id }: Pick<User, 'id'>) {
    return prisma.user.findUnique({
      where: { id },
    });
  },
  findByEmail({ email }: NonNullableFields<Pick<User, 'email'>>) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
