import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='flex flex-col items-center p-6 min-h-dvh'>
      <div className='flex flex-col items-center gap-y-2 my-auto font-medium'>
        <span className='text-9xl'>🥕</span>
        <h1 className='text-4xl'>Carrot Market</h1>
        <h2 className='text-2xl'>Welcome to Carrot Market!</h2>
      </div>
      <div className='flex flex-col items-center gap-y-3 w-full'>
        <Link href='/sign-up' className='py-2.5 font-medium text-lg primary-btn'>
          Join now
        </Link>
        <div className='flex gap-x-2'>
          <span>Already on Carrot Market?</span>
          <Link href='/sign-in' className='hover:underline'>
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
