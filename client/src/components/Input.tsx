// components/Input.tsx
import React from "react";
import { InputText } from "primereact/inputtext";

interface Props {
  id?: string;
  type?: string;
  value?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { type = "text", placeholder, className = "", ...rest } = props;

  return (
    <InputText
      type={type}
      placeholder={placeholder}
      className={`mt-1 w-full p-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary focus:outline-none focus:ring-2 ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
