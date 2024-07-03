import { VariantProps, cva } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/utils";

const btnVariants = cva(
  "relative inline-flex items-center justify-center font-gelionReg transition-all ease-in delay-50",
  {
    variants: {
      variant: {
        main: "bg-mainColor text-white hover:bg-mainColorDark tra",
        default: "bg-white border text-textColor hover:border-gray-500 ",
      },
      size: {
        sm: "px-4 py-2 text-lg rounded-[24px]",
        default: "py-2 px-4 py-2 text-xl rounded-[30px]",
        lg: "px-5 py-2 text-2xl rounded-[35px]",
        xl: "px-6 py-3 text-2xl rounded-[40px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof btnVariants> {
  isLoading?: boolean;
}

const Button = ({
  className,
  isLoading,
  children,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`leading-tight ${className} ${cn(
        btnVariants({ variant, size, className })
      )}`}
    >
      {children}
    </button>
  );
};

export { btnVariants };

export default Button;
