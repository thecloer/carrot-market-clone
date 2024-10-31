'use client';

import React from 'react';
import { FormInput, FormButton } from '@/modules/global/components';

export default function SMSLoginPage() {
  return (
    <main className='flex flex-col gap-y-10 p-6'>
      <div className='flex flex-col gap-y-2 *:font-medium'>
        <h1 className='text-2xl'>Log in with SMS.</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-y-3'>
        <FormInput name='phone' key='phone' type='number' placeholder='verification code' required />
        <FormInput name='verification_code' key='verification code' type='tel' placeholder='Phone number' required />
        <FormButton type='submit'> Verify</FormButton>
      </form>
    </main>
  );
}
