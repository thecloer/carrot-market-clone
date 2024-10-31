interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errors?: string[];
}

export const FormInput = ({ label, errors, className, ...props }: FormInputProps) => {
  return (
    <label className='flex flex-col gap-y-2'>
      {label && <span className='text-neutral-300 has-[+:focus]:text-white'>{label}</span>}
      <input
        {...props}
        className={`bg-transparent border-none rounded-md ring-1 ring-neutral-200 focus:ring-2 focus:ring-orange-500 w-full h-10 placeholder:text-neutral-400 transition peer focus:outline-none ${className}`}
      />
      {errors?.map((error, index) => (
        <span key={index} className='font-medium text-red-500'>
          {error}
        </span>
      ))}
    </label>
  );
};
