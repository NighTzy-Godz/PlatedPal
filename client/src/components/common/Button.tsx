import { VariantProps, cva } from "class-variance-authority";
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { cn } from "../../utils/utils";

const btnVariants = cva(
  "relative inline-flex items-center justify-center font-gelionReg transition-all ease-in delay-50",
  {
    variants: {
      variant: {
        main: "bg-mainColor text-white hover:bg-mainColorDark ",
        darkBlue: "bg-textColor text-white hover:bg-textColorDark",

        default: "bg-white border text-textColor hover:border-gray-500 ",
      },
      size: {
        sm: "px-4 py-2 text-lg rounded-[24px]",
        default: "py-2 px-4 py-2 text-xl rounded-[30px]",
        lg: "px-5 py-2 text-2xl rounded-[35px]",
        xl: "px-6 py-3 text-2xl rounded-[40px]",
        smallPill: "px-3 py-2 text-base rounded-[20px]",
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
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, isLoading, children, variant, size, ...props }: ButtonProps,
    ref
  ) => {
    const [msg, setMsg] = useState("");
    const [timer, setTimer] = useState(0);
    useEffect(() => {
      let timerId: number;
      if (isLoading) {
        if (timer > 1) {
          setMsg(
            "Please be patient, it may take some time to complete this action "
          );
        } else {
          setMsg("Loading ...");
        }

        timerId = setTimeout(() => {
          setTimer(timer + 1);
        }, 1000);
      }

      return () => {
        clearTimeout(timerId);
        if (!isLoading) setTimer(0);
      };
    }, [timer, isLoading]);

    return (
      <button
        className={`leading-tight ${className} ${cn(
          btnVariants({ variant, size, className })
        )}`}
        ref={ref}
        {...props}
      >
        {isLoading ? msg : children}
      </button>
    );
  }
);

export { btnVariants };

export default Button;
