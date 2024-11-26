import React from "react";
import { Combo } from "@/store/comboStore";
import { Producto } from "@/store/productoStore";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/Card";

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
            <Card key={product.Codigo_Producto} className="overflow-hidden">
              <CardContent className="p-4 flex items-start gap-4">
                <img
                  src={product.Imagen_Producto}
                  alt={product.Nombre}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-grow">
                  <p className="text-lg font-semibold">{product.Nombre}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">
                      Cantidad: {product.Cantidad}
                    </Badge>
                    <p className="text-lg font-medium">
                      ${Number(product.Precio).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
      )}

      {combos.map(
        (combo) =>
          combo.Cantidad > 0 && (
            <Card key={combo.Codigo_Combo} className="overflow-hidden">
              <CardContent className="p-4 flex items-start gap-4">
                <img
                  src={combo.Imagen_Combo}
                  alt={combo.Nombre_Combo}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-grow">
                  <p className="text-lg font-semibold">{combo.Nombre_Combo}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">
                      Cantidad: {combo.Cantidad}
                    </Badge>
                    <p className="text-lg font-medium">
                      ${Number(combo.Precio).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
      )}
    </div>
  );
};

export default ItemsSeleccionados;

