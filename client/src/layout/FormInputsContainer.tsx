import React from "react";

interface FormInputsContainerProps {
  children: React.ReactNode;
}

function FormInputsContainer({ children }: FormInputsContainerProps) {
  return <div className="flex flex-col w-full">{children}</div>;
}

export default FormInputsContainer;
