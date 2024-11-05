import { SelectContent, SelectGroup, SelectLabel } from "../ui/select";

interface SelectContentProps {
  label: string;
  children: React.ReactNode;
}

function CustomSelectContent({ label, children }: SelectContentProps) {
  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        {children}
      </SelectGroup>
    </SelectContent>
  );
}

export default CustomSelectContent;
