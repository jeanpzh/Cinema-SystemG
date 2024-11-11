import ListaCombos from "@/features/admin/combos/ListaCombos";
import ListaPeliculas from "@/features/admin/movies/ListaPeliculas";
import ListaProductos from "@/features/admin/products/ListaProductos";
import ListaFunciones from "@/features/admin/shows/ListaFunciones";
import { Route, Routes } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
      <Route path="peliculas" element={<ListaPeliculas />} />
      <Route path="productos" element={<ListaProductos />} />
      <Route path="funciones" element={<ListaFunciones />} />
      <Route path="combos" element={<ListaCombos />} />
    </Routes>
  );
}

export default AdminRoutes;
