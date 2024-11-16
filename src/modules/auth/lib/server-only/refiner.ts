import { z } from 'zod';
import { UserRepository } from '@/modules/user/repositories';
import { USER_FIELDS } from '@/modules/user/lib';
import { AUTH_FIELDS } from '..';

// The process of checking if confirmPassword and password match can be done in `refine`, but if it fails, set fatal to true to prevent the next step from proceeding.
export const superDoesConfirmPasswordMatch = (
  {
    password,
    confirm_password,
  }: { [USER_FIELDS.password]: string; [AUTH_FIELDS.confirmPassword]: string },
  ctx: z.RefinementCtx
) => {
  if (password === confirm_password) return;
  ctx.addIssue({
    code: 'custom',
    message: 'Passwords do not match.',
    path: [AUTH_FIELDS.confirmPassword],
    fatal: true, // This will stop the validation process.
  });
  return z.NEVER; // Just to make sure typescript knows that this function will never return.
};

export const superIsUsernameUnique = async (
  { username }: { [USER_FIELDS.username]: string },
  ctx: z.RefinementCtx
) => {
  const usernameExist = await UserRepository.existsByUsername({ username });
  if (!usernameExist) return;
  ctx.addIssue({
    code: 'custom',
    path: [USER_FIELDS.username],
    message: 'Username is already taken.',
    fatal: true,
  });
  return z.NEVER;
};

export const superIsEmailUnique = async (
  { email }: { [USER_FIELDS.email]: string },
  ctx: z.RefinementCtx
) => {
  const emailExist = await UserRepository.existsByEmail({ email });
  if (!emailExist) return;
  ctx.addIssue({
    code: 'custom',
    path: [USER_FIELDS.email],
    message: 'Email is already taken.',
    fatal: true,
  });
  return z.NEVER;
};
