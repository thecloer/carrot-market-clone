import { IoChatbubbleEllipses, IoLogoGithub } from 'react-icons/io5';

import Link from 'next/link';
import React from 'react';

const socials = [
  { text: 'Continue with SMS', Icon: IoChatbubbleEllipses, href: '/sms' },
  { text: 'Continue with Github', Icon: IoLogoGithub, href: '/github' },
];

export const SocialLogin = () => {
  return (
    <>
      <div className='bg-neutral-500 w-full h-px' />
      <div className='flex flex-col gap-y-3'>
        {socials.map(({ text, Icon, href }, index) => (
          <Link href={href} key={index} className='flex justify-center items-center h-10 primary-btn'>
            <Icon className='mr-2 size-6' />
            <span>{text}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
