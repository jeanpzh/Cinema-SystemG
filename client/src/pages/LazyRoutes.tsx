import ErrorBoundary from "@/components/ErrorBoundary";
import AdminLayout from "@/layouts/AdminLayout";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AdminRoutes = lazy(() => import("./AdminRoutes"));

/**
 *
 * @returns LazyRoutes - Componente que contiene las rutas de la aplicación
 * @see AdminRoutes - Componente que contiene las rutas del admin
 * @see Main - Componente que contiene el contenido principal de la aplicación
 * @see BrowserRouter - Componente que envuelve la aplicación y le proporciona las propiedades de la versión 7 de react-router
 * @see Route - Componente que renderiza un componente cuando la ruta coincide con la ubicación actual
 * @see Routes - Componente que renderiza el primer hijo <Route> o <Redirect> que coincide con la ubicación actual
 * @see Suspense - Componente que muestra un spinner de carga mientras se carga el componente
 * @see lazy - Función que permite cargar un componente de forma dinámica
 * @see ErrorBoundary - Componente que captura errores en la aplicación
 */

function LazyRoutes() {
  return (
    // relativeSplatPath: true - startTransition: true - Se añaden las propiedades de la versión 7 de react-router , para evitar posibles errores después de la actualización

    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      {" "}
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>

            <Route path="/" element={<h1>Home</h1>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default LazyRoutes;
