import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`border border-gray-300 rounded px-4 py-2 ${className}`}
      {...props}
    />
  );
}
