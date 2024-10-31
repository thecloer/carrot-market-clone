'use server';

import { ActionErrorResponse } from '@/modules/global/lib';
import { SignUpFromDataSchema } from '@/modules/auth/schemas';
import { AUTH_FIELDS } from '@/modules/auth/lib';
import { USER_FIELDS } from '@/modules/user/lib';

type SignUpFormData = typeof SignUpFromDataSchema._type;
type SignUpActionResponse = Promise<void | ActionErrorResponse<SignUpFormData>>;

export const signUpAction = async (prevState: unknown, formData: FormData): SignUpActionResponse => {
  const fieldValues = {
    [USER_FIELDS.username]: formData.get(USER_FIELDS.username)?.toString(),
    [USER_FIELDS.email]: formData.get(USER_FIELDS.email)?.toString(),
    [USER_FIELDS.password]: formData.get(USER_FIELDS.password)?.toString(),
    [AUTH_FIELDS.confirmPassword]: formData.get(AUTH_FIELDS.confirmPassword)?.toString(),
  };
  const validateResult = SignUpFromDataSchema.safeParse(fieldValues);
  if (!validateResult.success) {
    return { fieldValues, error: validateResult.error.flatten() };
  }

  const { data } = validateResult;

  // FIXME: Implement user signup logic here and remove the console.log
  console.log('User signup with: ', data);
};
