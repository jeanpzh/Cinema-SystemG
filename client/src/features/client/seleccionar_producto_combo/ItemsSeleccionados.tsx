// src/components/ItemsSeleccionados.tsx
import React from "react";
import { Combo } from "@/store/comboStore";
import { Producto } from "@/store/productoStore";
import { Badge } from "@/components/ui/badge";

interface Props {
  products: Producto[];
  combos: Combo[];
}

const ItemsSeleccionados: React.FC<Props> = ({ products, combos }) => {
  return (
    <div className="space-y-4">
      {products.map(
        (product) =>
          product.Cantidad > 0 && (
            <div
              key={product.Codigo_Producto}
              className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <img
                src={product.Imagen_Producto}
                alt={product.Nombre}
                width={50}
                height={50}
                className="rounded-md object-cover w-12 h-12"
              />
              <div className="flex-grow">
                <p className="text-base font-semibold text-gray-800">
                  {product.Nombre}
                </p>
                <p className="text-sm text-gray-500">
                  Precio: ${Number(product.Precio).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-sm">
                    Cantidad: {product.Cantidad}
                  </Badge>
                </div>
              </div>
            </div>
          )
      )}

      {combos.map(
        (combo) =>
          combo.Cantidad > 0 && (
            <div
              key={combo.Codigo_Combo}
              className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <img
                src={combo.Imagen_Combo}
                alt={combo.Nombre_Combo}
                width={50}
                height={50}
                className="rounded-md object-cover w-12 h-12"
              />
              <div className="flex-grow">
                <p className="text-base font-semibold text-gray-800">
                  {combo.Nombre_Combo}
                </p>
                <p className="text-sm text-gray-500">
                  Precio: ${Number(combo.Precio).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-sm">
                    Cantidad: {combo.Cantidad}
                  </Badge>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default ItemsSeleccionados;
