import Header from "@/features/client/Header";
import { Outlet } from "react-router-dom";

function ClientLayout() {
  return (
    <div className="min-h-screen bg-tokyoNight-bg text-tokyoNight-text font-poppins">
      <Header />
      <Outlet />
    </div>
  );
}

export default ClientLayout;
