import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Faq from "./Faq";
import SeleccionarPelicula from "@/features/client/seleccionar_pelicula/SeleccionarPelicula";
import Home from "./Home";
import DetallesPelicula from "@/features/client/seleccionar_funcion/DetallesPelicula";
import SeleccionarAsiento from "@/features/client/seleccionar_asiento/SeleccionarAsiento";
import ProductSelectionSPA from "@/features/client/seleccionar_producto_combo/SelecciónProductoCombo";
import { useProductoStore } from "@/store/productoStore";
import { useComboStore } from "@/store/comboStore";
import ResumenCompra from "@/features/client/resumen_compra/ResumenCompra";
import SeleccionEntradas from "@/features/client/seleccionar_entrada/SeleccionarEntrada";
import { useEntradaStore } from "@/store/entradaStore";
import GestionPagos from "@/features/client/gestion_pagos/IU_Pago";
import BoletaCompra from "@/features/client/gestion_boletos/BoletaCompra";
import { useLoginStore } from "@/store/loginStore";
import NotFound from "./NotFound";
import RegistroCliente from "@/features/client/registrar_cliente/Registro_Cliente";
function ClientRoutes() {
  const location = useLocation();

  const user = useLoginStore((state) => state.user);
  // Funcion para limpiar la seleccion
  const limpiarSeleccionProductos = () => {
    useProductoStore.getState().clearProductos();
    useComboStore.getState().clearCombos();
  };

  const limpiarSeleccionEntradas = () => {
    useEntradaStore.getState().reset();
  };

  if (!location.pathname.includes("productos")) limpiarSeleccionProductos();
  if (!location.pathname.includes("peliculas")) limpiarSeleccionEntradas();

  if (!user && location.pathname.includes("entradas"))
    return <Navigate to="/login" />;
  if (!user && location.pathname.includes("resumen-compra"))
    return <Navigate to="/login" />;
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
        path="peliculas/:idPelicula/:idSala/asientos/entradas"
        element={<SeleccionEntradas />}
      />
      <Route
        path="peliculas/:idPelicula/:idSala/asientos/entradas/productos"
        element={<ProductSelectionSPA />}
      />
      <Route path="productos" element={<ProductSelectionSPA />} />

      <Route path="productos/resumen-compra" element={<ResumenCompra />} />
      <Route path="productos/resumen-compra/pago" element={<GestionPagos />} />
      <Route
        path="productos/resumen-compra/pago/:idPago"
        element={<BoletaCompra />}
      />
      <Route
        path="peliculas/:idPelicula/:idSala/asientos/entradas/productos/resumen-compra"
        element={<ResumenCompra />}
      />

      <Route
        path="peliculas/:idPelicula/:idSala/asientos/entradas/resumen-compra"
        element={<ResumenCompra />}
      />
      <Route
        path="peliculas/:idPelicula/:idSala/asientos/entradas/resumen-compra/pago"
        element={<GestionPagos />}
      />
      <Route
        path="peliculas/:idPelicula/:idSala/asientos/entradas/productos/resumen-compra/pago"
        element={<GestionPagos />}
      />
      <Route
        path="peliculas/:idPelicula/:idSala/asientos/entradas/productos/resumen-compra/pago/:idPago"
        element={<BoletaCompra />}
      />
      <Route
        path="peliculas/:idPelicula/:idSala/asientos/entradas/resumen-compra/pago/:idPago"
        element={<BoletaCompra />}
      />
      <Route path="/register" element={<RegistroCliente />} />

      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="404" element={<NotFound />} />
    </Routes>
  );
}

export default ClientRoutes;
