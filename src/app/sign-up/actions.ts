'use server';

import { ActionErrorResponse, objectMap } from '@/modules/global/lib';
import { SignUpFromDataSchema } from '@/modules/auth/schemas';
import { AUTH_FIELDS } from '@/modules/auth/lib';
import { UserRepository } from '@/modules/user/repositories';
import { USER_FIELDS } from '@/modules/user/lib';
import { hashPassword } from '@/modules/auth/lib/hash-password';

type SignUpFormData = typeof SignUpFromDataSchema._type;
type SignUpActionResponse = Promise<void | ActionErrorResponse<SignUpFormData>>;

export const signUpAction = async (
  prevState: unknown,
  formData: FormData
): SignUpActionResponse => {
  const fieldValues = {
    [USER_FIELDS.username]: formData.get(USER_FIELDS.username),
    [USER_FIELDS.email]: formData.get(USER_FIELDS.email),
    [USER_FIELDS.password]: formData.get(USER_FIELDS.password),
    [AUTH_FIELDS.confirmPassword]: formData.get(AUTH_FIELDS.confirmPassword),
  };
  const validateResult = await SignUpFromDataSchema.safeParseAsync(fieldValues);
  if (!validateResult.success) {
    return {
      fieldValues: objectMap(fieldValues, (value) => value?.toString()),
      errors: validateResult.error.flatten(),
    };
  }

  const { username, email, password } = validateResult.data;

  const hashedPassword = await hashPassword(password);
  const user = await UserRepository.createByEmail({ username, email, password: hashedPassword });

  console.log('User signed up:', user);
};
