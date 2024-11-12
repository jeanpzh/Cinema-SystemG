import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "ghost";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function HomeButton({
  children,
  className = "",
  variant = "default",
  ...props
}: ButtonProps) {
  const variants = {
    default: "bg-blue-500 text-white",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-200",
  };

  return (
    <button
      className={`${variants[variant]} ${className} py-2 px-4 rounded`}
      {...props}
    >
      {children}
    </button>
  );
}
