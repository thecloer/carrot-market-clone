'use client';

import React from 'react';
import { FormButton, FormInput, SocialLogin } from '@/components/form';

export default function SignUpPage() {
  return (
    <main className='flex flex-col gap-y-10 p-6'>
      <div className='flex flex-col gap-y-2 *:font-medium'>
        <h1 className='text-2xl'>Welcome!</h1>
        <h2 className='text-xl'>Fill in the form below to join.</h2>
      </div>
      <form className='flex flex-col gap-y-3'>
        <FormInput name='username' type='text' placeholder='Username' required />
        <FormInput name='email' type='email' placeholder='Email' required />
        <FormInput name='password' type='password' autoComplete='new-password' placeholder='Password' required />
        <FormInput
          name='confirm_password'
          type='password'
          autoComplete='new-password'
          placeholder='Confirm Password'
          required
        />
        <FormButton type='submit'>Sign up</FormButton>
      </form>
      <SocialLogin />
    </main>
  );
}
