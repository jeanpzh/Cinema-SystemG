import { AlertProps } from "@/constants/types";

export const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
};
