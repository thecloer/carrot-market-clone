import { z } from 'zod';
import { EmailSchema, PasswordSchema, UsernameSchema } from '@/modules/user/schemas';
import { USER_FIELDS } from '@/modules/user/lib';
import { AUTH_FIELDS, doesConfirmPasswordMatch } from '../lib';

export const SignUpFromDataSchema = z
  .object({
    [USER_FIELDS.username]: UsernameSchema,
    [USER_FIELDS.email]: EmailSchema,
    [USER_FIELDS.password]: PasswordSchema,
    [AUTH_FIELDS.confirmPassword]: PasswordSchema,
  })
  .refine(doesConfirmPasswordMatch, {
    path: [AUTH_FIELDS.confirmPassword],
    message: 'Passwords do not match.',
  });

export const SignInFromDataSchema = z.object({
  [USER_FIELDS.email]: EmailSchema,
  [USER_FIELDS.password]: PasswordSchema,
});

// TODO: Implement the verification code issuing and verification logic
export const VerificationCodeSchema = z.coerce.number().int().min(100000).max(999999);
