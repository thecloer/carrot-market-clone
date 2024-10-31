'use client';

import React, { useActionState } from 'react';
import { FormButton, FormInput } from '@/modules/global/components';
import { SocialLogin } from '@/modules/auth/components';
import { AUTH_FIELDS } from '@/modules/auth/lib/constants';
import {
  PASSWORD_MIN_LENGTH,
  USER_FIELDS,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@/modules/user/lib/constants';
import { signUpAction } from './actions';

export default function SignUpPage() {
  const [state, action] = useActionState(signUpAction, null);

  return (
    <main className='flex flex-col gap-y-10 p-6'>
      <div className='flex flex-col gap-y-2 *:font-medium'>
        <h1 className='text-2xl'>Welcome!</h1>
        <h2 className='text-xl'>Fill in the form below to join.</h2>
      </div>
      <form action={action} className='flex flex-col gap-y-3'>
        <FormInput
          type='text'
          name={USER_FIELDS.username}
          placeholder='Username'
          autoComplete='username'
          required
          errors={state?.error.fieldErrors.username}
          minLength={USERNAME_MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
        />
        <FormInput
          type='email'
          name={USER_FIELDS.email}
          placeholder='Email'
          autoComplete='email'
          required
          errors={state?.error.fieldErrors.email}
        />
        <FormInput
          type='password'
          name={USER_FIELDS.password}
          autoComplete='new-password'
          placeholder='Password'
          required
          errors={state?.error.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormInput
          type='password'
          name={AUTH_FIELDS.confirmPassword}
          autoComplete='new-password'
          placeholder='Confirm Password'
          required
          errors={state?.error.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton type='submit'>Sign up</FormButton>
      </form>
      <SocialLogin />
    </main>
  );
}
