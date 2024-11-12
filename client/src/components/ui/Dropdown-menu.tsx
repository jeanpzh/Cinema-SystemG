import { ReactNode } from "react";

interface DropdownMenuProps {
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative">{children}</div>;
}

interface DropdownMenuTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
}: DropdownMenuTriggerProps) {
  return asChild ? <>{children}</> : <button>{children}</button>;
}

interface DropdownMenuContentProps {
  children: ReactNode;
  align?: "start" | "end";
}

export function DropdownMenuContent({
  children,
  align = "start",
}: DropdownMenuContentProps) {
  return (
    <div
      className={`absolute ${
        align === "end" ? "right-0" : ""
      } mt-2 w-48 bg-white border rounded shadow-lg`}
    >
      {children}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
}

export function DropdownMenuItem({ children }: DropdownMenuItemProps) {
  return (
    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
      {children}
    </button>
  );
}
