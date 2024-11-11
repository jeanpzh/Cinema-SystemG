import { ColumnProps } from "@/components/Table";
import { Combo, Producto } from "./table";

export const COLUMN_PELICULAS = [
  { field: "Nombre_Pelicula", header: "Nombre" },
  { field: "Clasificacion", header: "Clasificación" },
  { field: "Duracion", header: "Duración" },
  { field: "Genero", header: "Género" },
  { field: "Sinopsis", header: "Sinopsis" },
  { field: "Acciones", header: "Acciones" },
];
export const COLUMN_PRODUCTOS = [
  { field: "Nombre", header: "Nombre" },
  { field: "Tipo", header: "Tipo" },
  { field: "Precio", header: "Precio" },
  { field: "Stock", header: "Stock" },
  {
    field: "Imagen_Combo",
    header: "Imagen",
    body: (rowData: Producto) =>
      rowData.Imagen_Producto ? (
        <img
          src={rowData.Imagen_Producto}
          alt={rowData.Nombre}
          style={{ width: "100px" }}
        />
      ) : (
        "No hay imagen"
      ),
  },
  { field: "Acciones", header: "Acciones" },
];
export const COLUMN_FUNCIONES = [
  { field: "Nombre_Pelicula", header: "Película" },
  { field: "Duracion", header: "Duración" },
  { field: "Nombre_Sala", header: "Sala" },
  { field: "Capacidad", header: "Capacidad de sala" },
  { field: "Hora_Inicio", header: "Hora de inicio" },
  { field: "Acciones", header: "Acciones" },
];

export const COLUMN_COMBOS: ColumnProps<Combo>[] = [
  {
    field: "Nombre_Combo",
    header: "Nombre",
  },
  {
    field: "Descripcion",
    header: "Descripción",
  },
  {
    field: "Precio",
    header: "Precio",
    body: (rowData: Combo) => `$${rowData.Precio}`,
  },
  {
    field: "Imagen_Combo",
    header: "Imagen",
    body: (rowData: Combo) =>
      rowData.Imagen_Combo ? (
        <img
          src={rowData.Imagen_Combo}
          alt={rowData.Nombre_Combo}
          style={{ width: "100px" }}
        />
      ) : (
        "No hay imagen"
      ),
  },
  {
    field: "Acciones",
    header: "Acciones",
  },
];
