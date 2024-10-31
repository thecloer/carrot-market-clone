import { z } from 'zod';
import validator from 'validator';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '../lib';

export const UsernameSchema = z
  .string({
    invalid_type_error: 'Username must be a string.',
    required_error: 'Username is required.',
  })
  .min(USERNAME_MIN_LENGTH, `Username must be longer than ${USERNAME_MIN_LENGTH} characters.`)
  .max(USERNAME_MAX_LENGTH, `Username must be shorter than ${USERNAME_MAX_LENGTH} characters.`)
  .trim()
  .toLowerCase();

export const EmailSchema = z.string().email();

export const PasswordSchema = z
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
