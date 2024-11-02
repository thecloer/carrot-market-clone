'use client';

import React, { useActionState } from 'react';
import { FormButton, FormInput } from '@/modules/global/components';
import { SocialLogin } from '@/modules/auth/components';
import { AUTH_FIELDS } from '@/modules/auth/lib';
import { PASSWORD_MIN_LENGTH, USER_FIELDS, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '@/modules/user/lib';
import { signUpAction } from './actions';

export default function SignUpPage() {
  const [state, dispatch, isPending] = useActionState(signUpAction, null);

  return (
    <main className='flex flex-col gap-y-10 p-6'>
      <div className='flex flex-col gap-y-2 *:font-medium'>
        <h1 className='text-2xl'>Welcome!</h1>
        <h2 className='text-xl'>Fill in the form below to join.</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-y-3'>
        <FormInput
          type='text'
          name={USER_FIELDS.username}
          placeholder='Username'
          autoComplete='username'
          required
          defaultValue={state?.fieldValues.username}
          errors={state?.errors.fieldErrors.username}
          minLength={USERNAME_MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
        />
        <FormInput
          type='email'
          name={USER_FIELDS.email}
          placeholder='Email'
          autoComplete='email'
          required
          defaultValue={state?.fieldValues.email}
          errors={state?.errors.fieldErrors.email}
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
        <FormInput
          type='password'
          name={AUTH_FIELDS.confirmPassword}
          autoComplete='new-password'
          placeholder='Confirm Password'
          required
          defaultValue={state?.fieldValues.confirm_password}
          errors={state?.errors.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton type='submit' disabled={isPending}>
          Sign up
        </FormButton>
      </form>
      <SocialLogin />
    </main>
  );
}
