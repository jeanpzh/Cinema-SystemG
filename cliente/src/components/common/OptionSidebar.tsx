import { Link } from "react-router-dom";

interface OptionSidebarProps {
  path: string;
  nombre: string;
}
function OptionSidebar({ path, nombre }: OptionSidebarProps) {
  return (
    <li className="w-[200px] h-[42px]">
      <Link
        to={path}
        className="flex items-center justify-center h-full
        text-[#273240] hover:bg-[rgba(112,127,221,0.1)]
        rounded-md group"
      >
        <span className="text-[#273240] text-[14px] group-hover:text-[#5A6ACF]">
          {nombre}
        </span>
      </Link>
    </li>
  );
}

export default OptionSidebar;
