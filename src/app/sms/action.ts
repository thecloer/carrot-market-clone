'use server';

import { AUTH_FIELDS } from '@/modules/auth/lib';
import { VerificationCodeSchema } from '@/modules/auth/schemas';
import { FormError } from '@/modules/global/lib';
import { USER_FIELDS } from '@/modules/user/lib';
import { PhoneSchema } from '@/modules/user/schemas';

type PhoneState = {
  isCodeIssued: false;
  fieldValues: { [USER_FIELDS.phone]: string };
} & Partial<FormError<typeof PhoneSchema._type>>;

type VerificationCodeState = {
  isCodeIssued: true;
  fieldValues: { [AUTH_FIELDS.verificationCode]: string };
} & Partial<FormError<typeof VerificationCodeSchema._type>>;

type SmsSignInActionState = PhoneState | VerificationCodeState;
type SmsSignInActionResult = Promise<SmsSignInActionState>;

export const smsSignInAction = async (prevState: SmsSignInActionState, formData: FormData): SmsSignInActionResult => {
  if (!prevState.isCodeIssued) {
    // [Phone Number Phase] check whether the phone number is valid
    const validateResult = PhoneSchema.safeParse(formData.get(USER_FIELDS.phone));
    if (!validateResult.success) {
      return {
        isCodeIssued: false,
        errors: validateResult.error.flatten(),
        fieldValues: { phone: formData.get(USER_FIELDS.phone)?.toString() ?? '' },
      };
    }

    // TODO: Issue a verification code here
    console.log('Issue a verification code.');

    return { isCodeIssued: true, fieldValues: { verification_code: '' } };
  }

  // [Verification Code Phase] verify the code
  const validateResult = VerificationCodeSchema.safeParse(formData.get(AUTH_FIELDS.verificationCode));
  if (!validateResult.success) {
    return {
      isCodeIssued: true,
      errors: validateResult.error.flatten(),
      fieldValues: { verification_code: formData.get(AUTH_FIELDS.verificationCode)?.toString() ?? '' },
    };
  }

  // TODO: Implement the code verification and sign-in logic here
  console.log('SMS sign in success.');

  return {
    isCodeIssued: false,
    fieldValues: { phone: '' },
  };
};
