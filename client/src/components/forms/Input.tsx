import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        className={`placeholder:text-slate-400 placeholder:text-base block text-lg text-textColor w-full h-10 rounded-md border pl-3 border-slate-300 focus:text-textColor  hover:border-slate-500 focus:ring-slate-500 focus:ring-1 outline-none ${className}`}
        {...rest}
      />
    );
  }
);

export default Input;
