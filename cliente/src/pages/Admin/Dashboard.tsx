import Aside from "@/components/common/Aside";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex">
      <Aside />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
