'use server';

import { ActionErrorResponse } from '@/modules/global/lib';
import { SignupFromDataSchema } from '@/modules/auth/schemas';
import { AUTH_FIELDS } from '@/modules/auth/lib';
import { USER_FIELDS } from '@/modules/user/lib';

type SignupFormData = typeof SignupFromDataSchema._type;

export const signUpAction = async (
  prevState: unknown,
  formData: FormData
): Promise<ErrorResponse<SignupFormData> | void> => {
  const validateResult = await SignupFromDataSchema.safeParseAsync({
    [USER_FIELDS.username]: formData.get(USER_FIELDS.username),
    [USER_FIELDS.email]: formData.get(USER_FIELDS.email),
    [USER_FIELDS.password]: formData.get(USER_FIELDS.password),
    [AUTH_FIELDS.confirmPassword]: formData.get(AUTH_FIELDS.confirmPassword),
  });
  if (!validateResult.success) return { error: validateResult.error.flatten() };

  const { data } = validateResult;

  // FIXME: Implement user signup logic here and remove the console.log
  console.log('User signup with: ', data);
};
