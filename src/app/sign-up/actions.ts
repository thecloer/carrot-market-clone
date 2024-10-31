'use server';

import { ActionErrorResponse } from '@/modules/global/lib';
import { SignupFromDataSchema } from '@/modules/auth/schemas';
import { AUTH_FIELDS } from '@/modules/auth/lib';
import { USER_FIELDS } from '@/modules/user/lib';

type SignupFormData = typeof SignupFromDataSchema._type;
type SignupActionResponse = Promise<void | ActionErrorResponse<SignupFormData>>;

export const signUpAction = async (prevState: unknown, formData: FormData): SignupActionResponse => {
  const fieldValues = {
    [USER_FIELDS.username]: formData.get(USER_FIELDS.username)?.toString(),
    [USER_FIELDS.email]: formData.get(USER_FIELDS.email)?.toString(),
    [USER_FIELDS.password]: formData.get(USER_FIELDS.password)?.toString(),
    [AUTH_FIELDS.confirmPassword]: formData.get(AUTH_FIELDS.confirmPassword)?.toString(),
  };
  const validateResult = await SignupFromDataSchema.safeParseAsync(fieldValues);
  if (!validateResult.success) {
    return { fieldValues, error: validateResult.error.flatten() };
  }

  const { data } = validateResult;

  // FIXME: Implement user signup logic here and remove the console.log
  console.log('User signup with: ', data);
};
