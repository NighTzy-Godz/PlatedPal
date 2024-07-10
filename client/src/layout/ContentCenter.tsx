import React from "react";

interface ContentCenterProps {
  className?: string;
  children: React.ReactNode;
}

function ContentCenter({ className, children }: ContentCenterProps) {
  return (
    <div
      className={`w-full h-[90dvh] grid place-items-center py-10 ${className}`}
    >
      {children}
    </div>
  );
}

export default ContentCenter;
