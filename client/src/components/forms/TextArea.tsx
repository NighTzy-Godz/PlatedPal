import React, { ChangeEvent, TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, onChange, ...rest }: TextAreaProps, ref) => {
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.currentTarget.style.height = "auto";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <textarea
        ref={ref}
        {...rest}
        onChange={handleTextAreaChange}
        className={`resize-none py-2  placeholder:text-slate-400 placeholder:text-base block text-textColor w-full rounded-md border pl-3 border-slate-300 focus:text-textColor  hover:border-slate-500 focus:ring-slate-500 focus:ring-1 outline-none ${className}`}
      />
    );
  }
);

export default TextArea;
