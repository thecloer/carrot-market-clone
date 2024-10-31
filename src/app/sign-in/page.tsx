'use client';

import React from 'react';
import { FormButton, FormInput } from '@/modules/global/components';
import { SocialLogin } from '@/modules/auth/components';

export default function SignInPage() {
  return (
    <main className='flex flex-col gap-y-10 p-6'>
      <div className='flex flex-col gap-y-2 *:font-medium'>
        <h1 className='text-2xl'>Welcome!</h1>
        <h2 className='text-xl'>Connect with your community.</h2>
      </div>
      <form className='flex flex-col gap-y-3'>
        <FormInput name='email' type='email' autoComplete='email' placeholder='Email' required />
        <FormInput name='password' type='password' autoComplete='current-password' placeholder='Password' required />
        <FormButton type='submit'>Sign in</FormButton>
      </form>
      <SocialLogin />
    </main>
  );
}
