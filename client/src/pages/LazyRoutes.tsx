/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorBoundary from "@/components/ErrorBoundary";
import AdminLayout from "@/layouts/AdminLayout";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./Login";
import PrivateRoute from "./PrivateRoute";
import { useLoginStore } from "@/store/loginStore";

const AdminRoutes = lazy(() => import("./AdminRoutes"));

function LazyRoutes() {
  const fetchUser = useLoginStore((state: any) => state.loadUser);
  const loading = useLoginStore((state: any) => state.loading);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setInitialLoading(false);
    };
    loadUser();
    return () => {
      setInitialLoading(true);
    };
  }, [fetchUser]);

  if (initialLoading || loading) {
    return <div>Loading...</div>;
  }
  const forbiddenRoutes = {
    producto: ["/admin/trabajadores", "/admin/peliculas", "/admin/funciones"],
    pelicula: ["/admin/trabajadores", "/admin/productos", "/admin/combos"],
  };
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <PrivateRoute
                  allowedRoles={["admin", "producto", "pelicula"]}
                  forbiddenRoutes={forbiddenRoutes}
                  forbiddenRoles={["cliente"]}
                />
              }
            >
              <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="*" element={<AdminRoutes />} />
              </Route>
            </Route>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default LazyRoutes;
