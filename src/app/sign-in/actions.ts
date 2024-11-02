'use server';

import { ActionErrorResponse, objectMap } from '@/modules/global/lib';
import { SignInFromDataSchema } from '@/modules/auth/schemas';
import { USER_FIELDS } from '@/modules/user/lib';
import { UserRepository } from '@/modules/user/repositories';
import { comparePassword } from '@/modules/auth/lib/hash-password';

type SignInFormData = typeof SignInFromDataSchema._type;
type SignInActionResponse = Promise<void | ActionErrorResponse<SignInFormData>>;

export const signInAction = async (prevState: unknown, formData: FormData): SignInActionResponse => {
  const fieldValues = {
    [USER_FIELDS.email]: formData.get(USER_FIELDS.email),
    [USER_FIELDS.password]: formData.get(USER_FIELDS.password),
  };
  const validateResult = SignInFromDataSchema.safeParse(fieldValues);
  if (!validateResult.success) {
    return {
      fieldValues: objectMap(fieldValues, (value) => value?.toString()),
      errors: validateResult.error.flatten(),
    };
  }

  const { email, password } = validateResult.data;

  const user = await UserRepository.findByEmail(email);
  if (user == null) {
    return {
      fieldValues: objectMap(fieldValues, (value) => value?.toString()),
      errors: { fieldErrors: { email: ['User not found'] }, formErrors: [] },
    };
  }

  const doesPasswordMatch = await comparePassword(password, user.password);
  if (!doesPasswordMatch) {
    return {
      fieldValues: objectMap(fieldValues, (value) => value?.toString()),
      errors: { fieldErrors: { password: ['Incorrect password.'] }, formErrors: [] },
    };
  }

  console.log('User signed in: ', user);
};
