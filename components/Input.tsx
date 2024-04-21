import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, type, className, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `w-full disabled:cursor-not-allowed disabled:opacity-50  bg-neutral-700 text-sm file:border-0 file:bg-transparent file:font-medium placeholder:text-neutral-400 flex p-3 rounded-md border border-transparent focus:outline-none`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
