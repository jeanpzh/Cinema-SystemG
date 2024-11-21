import { Navigate, Route, Routes } from "react-router-dom";
import Faq from "./Faq";
import SeleccionarPelicula from "@/features/client/SeleccionarPelicula";
import Home from "./Home";
import DetallesPelicula from "@/features/client/detallesPelicula";
import SeleccionarAsiento from "@/features/client/SeleccionarAsiento";
function ClientRoutes() {
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
    </Routes>
  );
}

export default ClientRoutes;
