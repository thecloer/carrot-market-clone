/**
 * `bcrypt` is using Node.js's specific modules.
 * But browsers and edge runtime don't have those modules such as `fs`.
 * So, it's not possible to import this file in the files that run on browsers or edge runtime such as `middleware.ts`.
 */

import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);
