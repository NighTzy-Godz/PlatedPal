import React, { LabelHTMLAttributes } from "react";

interface InputLabel extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

function InputLabel({ className, children, ...rest }: InputLabel) {
  return (
    <label className={`${className}  font-semibold text-textColor`} {...rest}>
      {children}
    </label>
  );
}

export default InputLabel;
