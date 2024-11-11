import { Link } from "react-router-dom";

interface SidebarOptionsProps {
  to: string;
  label: string;
}

function SidebarOptions({ to, label }: SidebarOptionsProps) {
  return (
    <ul>
      <Link
        to={to}
        className="flex items-center justify-center h-full
        text-[#273240] hover:bg-[rgba(112,127,221,0.1)]
        rounded-md group p-2"
      >
        <p className="text-[#273240] text-[14px] group-hover:text-[#5A6ACF]">
          {label}
        </p>
      </Link>
    </ul>
  );
}

export default SidebarOptions;
