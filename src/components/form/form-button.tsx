'use client';

import { useFormStatus } from 'react-dom';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingMessage?: string;
}

export const FormButton = ({ loadingMessage = 'Loading...', children, className, ...props }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={`h-10 primary-btn ${className}`} {...props}>
      {pending ? loadingMessage : children}
    </button>
  );
};
