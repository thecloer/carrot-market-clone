import { z } from 'zod';
import validator from 'validator';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USER_FIELDS,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@/modules/user/lib/constants';
import { AUTH_FIELDS } from '../lib/constants';

const UsernameSchema = z
  .string({
    invalid_type_error: 'Username must be a string.',
    required_error: 'Username is required.',
  })
  .min(USERNAME_MIN_LENGTH, `Username must be longer than ${USERNAME_MIN_LENGTH} characters.`)
  .max(USERNAME_MAX_LENGTH, `Username must be shorter than ${USERNAME_MAX_LENGTH} characters.`)
  .trim()
  .toLowerCase();

const EmailSchema = z.string().email();

const PasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be longer than ${PASSWORD_MIN_LENGTH} characters.`)
  .regex(
    PASSWORD_REGEX,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(#?!@$%^&*-).'
  );

export const PhoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, 'ko-KR'), 'Invalid phone number.');

export const CodeSchema = z.coerce.number().int().min(100000).max(999999);

export const SignupFromDataSchema = z.object({
  [USER_FIELDS.username]: UsernameSchema,
  [USER_FIELDS.email]: EmailSchema,
  [USER_FIELDS.password]: PasswordSchema,
  [AUTH_FIELDS.confirmPassword]: PasswordSchema,
});

export const SignInFromDataSchema = z.object({
  [USER_FIELDS.email]: EmailSchema,
  [USER_FIELDS.password]: PasswordSchema,
});
