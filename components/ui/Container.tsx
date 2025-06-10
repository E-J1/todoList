import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        px-4
        mx-auto 
        sm:px-6
        sm:max-full
        lg:px-0
        lg:max-w-screen-lg
        ${className}
        `}
    >
      {children}
    </div>
  );
}
