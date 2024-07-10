import React from "react";

interface AuthFormWidthProps {
  className?: string;
  children: React.ReactNode;
}

function AuthFormWidth({ className, children }: AuthFormWidthProps) {
  return (
    <div
      className={`2xl:w-1/3 md:w-2/4 sm:w-3/4 sm:px-0 px-5 mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default AuthFormWidth;
