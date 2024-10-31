import { z } from 'zod';
import { EmailSchema, PasswordSchema, UsernameSchema } from '@/modules/user/schemas';
import { USER_FIELDS } from '@/modules/user/lib';
import { AUTH_FIELDS } from '../lib';

export const SignUpFromDataSchema = z.object({
  [USER_FIELDS.username]: UsernameSchema,
  [USER_FIELDS.email]: EmailSchema,
  [USER_FIELDS.password]: PasswordSchema,
  [AUTH_FIELDS.confirmPassword]: PasswordSchema,
});
