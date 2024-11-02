'use server';

import { ActionErrorResponse, objectMap } from '@/modules/global/lib';
import { SignInFromDataSchema } from '@/modules/auth/schemas';
import { USER_FIELDS } from '@/modules/user/lib';

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

  const { data } = validateResult;

  // FIXME: Implement user sign in logic here and remove the console.log
  console.log('User sign in with: ', data);
};
