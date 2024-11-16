/**
 * `bcrypt` is using Node.js's modules that browsers don't have such as `fs`.
 * So, it's not possible to use `bcrypt` in the browser.
 * If this file is imported in `./index.ts`, it will be included in the client bundle.
 * To prevent this, use `bcrypt` only in this file and import it directly in the server files not throw the index file.
 */

import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const comparePassword = (password: string, hashedPassword: string) => bcrypt.compare(password, hashedPassword);
