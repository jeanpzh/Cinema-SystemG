// src/utils/enrichCombos.ts

import { Combo, ComboEnriquecido, Producto } from "@/constants/table";

/**
 * Enriquecer una lista de combos con los nombres de los productos.
 *
 * @param combos - Lista de combos a enriquecer.
 * @param productos - Lista de productos disponibles.
 * @returns Lista de combos enriquecidos con nombres de productos.
 */
export const enrichCombos = (
  combos: Combo[],
  productos: Producto[]
): ComboEnriquecido[] => {
  // Crear un mapa de productos por Código_Producto
  const productosMap: Record<string, string> = productos.reduce(
    (map, producto: Producto) => {
      map[producto.Codigo_Producto] = producto.Nombre;
      return map;
    },
    {} as Record<string, string>
  );

  // Enriquecer los combos con el nombre de los productos
  return combos.map((combo) => {
    const detallesEnriquecidos = combo.Detalles.map((detalle) => ({
      ...detalle,
      Nombre_Producto:
        productosMap[detalle.Codigo_Producto] || "Producto desconocido",
    }));
    return {
      ...combo,
      Detalles: detallesEnriquecidos,
    };
  });
};
