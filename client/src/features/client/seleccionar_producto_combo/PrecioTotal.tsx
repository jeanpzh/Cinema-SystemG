import { Combo } from "@/store/comboStore";
import { Producto } from "@/store/productoStore";

const PrecioTotal = ({
  productosSeleccionados,
  combosSeleccionados,
}: {
  productosSeleccionados: Producto[];
  combosSeleccionados: Combo[];
}) => {
  return (
    <div>
      {
        productosSeleccionados.length > 0 || combosSeleccionados.length > 0 ? (
          <div className="flex justify-between">
            <p className="text-base font-semibold">Total:</p>
            <p className="text-base font-semibold">
              $
              {productosSeleccionados.reduce(
                (total, product) => total + product.Precio * product.Cantidad,
                0
              ) +
                combosSeleccionados.reduce(
                  (total, combo) => total + combo.Precio * combo.Cantidad,
                  0
                )}
            </p>
          </div>
        ) : null
        /* Si no hay items seleccionados, no se muestra el total */
      }
    </div>
  );
};
export default PrecioTotal;
