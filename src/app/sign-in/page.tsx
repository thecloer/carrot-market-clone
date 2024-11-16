'use client';

import React, { useActionState } from 'react';
import { FormButton, FormInput } from '@/modules/global/components';
import { SocialLogin } from '@/modules/auth/components';
import {
  PASSWORD_MIN_LENGTH,
  USER_FIELDS,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@/modules/user/lib';
import { signInAction } from './actions';

export default function SignInPage() {
  const [state, dispatch, isPending] = useActionState(signInAction, null);

  return (
    <main className='flex flex-col gap-y-10 p-6'>
      <div className='flex flex-col gap-y-2 *:font-medium'>
        <h1 className='text-2xl'>Welcome!</h1>
        <h2 className='text-xl'>Connect with your community.</h2>
      </div>
      <form className='flex flex-col gap-y-3' action={dispatch}>
        <FormInput
          type='text'
          name={USER_FIELDS.email}
          placeholder='Email'
          autoComplete='email'
          required
          defaultValue={state?.fieldValues.email}
          errors={state?.errors.fieldErrors.email}
          minLength={USERNAME_MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
        />
        <FormInput
          type='password'
          name={USER_FIELDS.password}
          autoComplete='new-password'
          placeholder='Password'
          required
          defaultValue={state?.fieldValues.password}
          errors={state?.errors.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton type='submit' disabled={isPending}>
          Sign in
        </FormButton>
      </form>
      <SocialLogin />
    </main>
  );
}
