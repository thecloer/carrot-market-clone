interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingMessage?: string;
}

export const FormButton = ({
  loadingMessage = 'Loading...',
  disabled,
  children,
  className,
  ...props
}: FormButtonProps) => {
  return (
    <button disabled={disabled} className={`h-10 primary-btn ${className}`} {...props}>
      {disabled ? loadingMessage : children}
    </button>
  );
};
