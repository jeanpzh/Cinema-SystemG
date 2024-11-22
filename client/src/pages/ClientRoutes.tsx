import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Faq from "./Faq";
import SeleccionarPelicula from "@/features/client/SeleccionarPelicula";
import Home from "./Home";
import DetallesPelicula from "@/features/client/DetallesPelicula";
import SeleccionarAsiento from "@/features/client/SeleccionarAsiento";
import ProductSelectionSPA from "@/features/client/SelecciónProductoCombo";
import { useProductoStore } from "@/store/productoStore";
import { useComboStore } from "@/store/comboStore";

function ClientRoutes() {
  const location = useLocation();

  // Funcion para limpiar la seleccion
  const limpiarSeleccion = () => {
    useProductoStore.getState().clearProductos();
    useComboStore.getState().clearCombos();
  };

  if (!location.pathname.includes("productos")) limpiarSeleccion();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Faq" element={<Faq />} />
      <Route path="peliculas" element={<SeleccionarPelicula />} />
      <Route path="404" element={<h1>404</h1>} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="peliculas/:id" element={<DetallesPelicula />}></Route>
      <Route
        path="peliculas/:idPelicula/:idSala/asientos"
        element={<SeleccionarAsiento />}
      />
      <Route
        path="peliculas/:idPelicula/:idSala/asientos/productos"
        element={<ProductSelectionSPA />}
      />
      <Route path="productos" element={<ProductSelectionSPA />} />
    </Routes>
  );
}

export default ClientRoutes;
