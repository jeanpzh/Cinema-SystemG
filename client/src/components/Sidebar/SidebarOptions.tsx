import { Link, useLocation } from "react-router-dom";

interface SidebarOptionsProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function SidebarOptions({ to, label, icon, onClick }: SidebarOptionsProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-6 py-3 my-2 rounded-md transition-colors duration-200
        ${isActive ? "bg-comandanteN-2" : "hover:bg-comandanteN-3"}`}
      onClick={onClick}
    >
      <span className="text-lg mr-3">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export default SidebarOptions;
