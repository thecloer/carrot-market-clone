'use server';

import { SignInFromDataSchema } from '@/modules/auth/schemas';
import { ActionErrorResponse } from '@/modules/global/lib';
import { USER_FIELDS } from '@/modules/user/lib';

type SignInFormData = typeof SignInFromDataSchema._type;
type SignInActionResponse = Promise<void | ActionErrorResponse<SignInFormData>>;

export const signInAction = async (prevState: unknown, formData: FormData): SignInActionResponse => {
  const fieldValues = {
    [USER_FIELDS.email]: formData.get(USER_FIELDS.email)?.toString(),
    [USER_FIELDS.password]: formData.get(USER_FIELDS.password)?.toString(),
  };

  const validateResult = SignInFromDataSchema.safeParse(fieldValues);
  if (!validateResult.success) {
    return { fieldValues, error: validateResult.error.flatten() };
  }

  const { data } = validateResult;

  // FIXME: Implement user sign in logic here and remove the console.log
  console.log('User sign in with: ', data);
};
