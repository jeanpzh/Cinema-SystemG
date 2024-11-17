/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLoginStore } from "@/store/loginStore";

interface PrivateRouteProps {
  allowedRoles: string[] | null;
  forbiddenRoles: string[] | null;
  forbiddenRoutes: { [key: string]: string[] } | null;
}

const PrivateRoute = ({
  allowedRoles,
  forbiddenRoles,
  forbiddenRoutes,
}: PrivateRouteProps) => {
  const user = useLoginStore((state: any) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (forbiddenRoles && forbiddenRoles.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  if (
    forbiddenRoutes &&
    forbiddenRoutes[user.rol]?.includes(location.pathname)
  ) {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
