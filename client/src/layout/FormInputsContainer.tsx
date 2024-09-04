import React from "react";

interface FormInputsContainerProps {
  children: React.ReactNode;
  className?: string;
}

function FormInputsContainer({
  className,
  children,
}: FormInputsContainerProps) {
  return <div className={`flex flex-col w-full ${className}`}>{children}</div>;
}

export default FormInputsContainer;
