'use client';

import React, { useActionState } from 'react';
import { FormInput, FormButton } from '@/modules/global/components';
import { USER_FIELDS } from '@/modules/user/lib';
import { AUTH_FIELDS } from '@/modules/auth/lib';
import { smsSignInAction } from './action';

const initialState = {
  isCodeIssued: false as const,
  fieldValues: { phone: '' },
};

export default function SMSLoginPage() {
  const [state, dispatch, isPending] = useActionState(smsSignInAction, initialState);

  return (
    <main className='flex flex-col gap-y-10 p-6'>
      <div className='flex flex-col gap-y-2 *:font-medium'>
        <h1 className='text-2xl'>Log in with SMS.</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-y-3' action={dispatch}>
        {state.isCodeIssued ? (
          <FormInput
            type='number'
            placeholder='verification code'
            required
            key={AUTH_FIELDS.verificationCode}
            name={AUTH_FIELDS.verificationCode}
            defaultValue={state.fieldValues.verification_code}
            errors={state.errors?.formErrors}
          />
        ) : (
          <FormInput
            type='tel'
            placeholder='Phone number'
            required
            key={USER_FIELDS.phone}
            name={USER_FIELDS.phone}
            defaultValue={state.fieldValues.phone}
            errors={state.errors?.formErrors}
          />
        )}

        <FormButton type='submit' disabled={isPending}>
          {state.isCodeIssued ? 'Verify' : 'Send verification SMS'}
        </FormButton>
      </form>
    </main>
  );
}
