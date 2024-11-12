import ListaCombos from "@/features/admin/combos/ListaCombos";
import ListaPeliculas from "@/features/admin/movies/ListaPeliculas";
import ListaProductos from "@/features/admin/products/ListaProductos";
import ListaFunciones from "@/features/admin/shows/ListaFunciones";
import Dashboard from "@/features/admin/dashboard/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="peliculas" element={<ListaPeliculas />} />
      <Route path="productos" element={<ListaProductos />} />
      <Route path="funciones" element={<ListaFunciones />} />
      <Route path="combos" element={<ListaCombos />} />
    </Routes>
  );
}

export default AdminRoutes;
