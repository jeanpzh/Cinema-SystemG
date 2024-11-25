import { ColumnProps } from "@/components/Table";
import { Combo, Pelicula, Producto } from "./table";
import DetailsColumn from "@/features/admin/combos/DetailsColumn";
const apiUrl = import.meta.env.VITE_API_URL;

export const COLUMN_PELICULAS = [
  { field: "Nombre_Pelicula", header: "Nombre" },

  { field: "Genero", header: "Género" },

  { field: "Duracion", header: "Duración" },

  { field: "Clasificacion", header: "Clasificación" },

  { field: "Sinopsis", header: "Sinopsis" },

  {
    field: "Imagen_Pelicula",
    header: "Imagen",
    body: (rowData: Pelicula) =>
      rowData.Imagen_Pelicula ? (
        <img
          src={`${apiUrl}/resize-${rowData.Imagen_Pelicula}`}
          alt={rowData.Nombre_Pelicula}
        />
      ) : (
        "No hay imagen"
      ),
  },
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
];
// Obtenemos productos por su id

export const COLUMN_FUNCIONES = [
  { field: "Nombre_Pelicula", header: "Película" },
  { field: "Duracion", header: "Duración" },
  { field: "Nombre_Sala", header: "Sala" },
  { field: "Capacidad", header: "Capacidad de sala" },
  { field: "Hora_Inicio", header: "Hora de inicio" },
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
    header: "Detalles",
    body: (rowData: Combo) =>
      rowData.Imagen_Combo ? (
        <DetailsColumn rowData={rowData} />
      ) : (
        "No hay imagen"
      ),
  },
];

export const COLUMN_TRABAJADORES = [
  { field: "Username", header: "Username" },
  { field: "Nombre", header: "Nombre" },
  { field: "Correo", header: "Email" },
  { field: "Rol", header: "Rol" },
  { field: "Telefono", header: "Teléfono" },
];

export const COLUMN_PREGUNTAS_FRECUENTES = [
  { field: "pregunta", header: "Pregunta" },
  { field: "respuesta", header: "Respuesta" },
];
