// routes/ProductoRoutes.ts
import express from "express";
import {
  obtenerProductos,
  añadirProducto,
  obtenerProductoPorCodigo,
  eliminarProducto,
  editarProducto,
} from "../controllers/ProductoController";

const productRouter = express.Router();

// Obtener todos los productos
productRouter.get("/", obtenerProductos);

// Añadir un nuevo producto
productRouter.post("/", añadirProducto);

// Obtener un producto por código
productRouter.get("/:codigo", obtenerProductoPorCodigo);

// Eliminar un producto por código
productRouter.delete("/:codigo", eliminarProducto);

// Editar un producto por código
productRouter.put("/:codigo", editarProducto);

export default productRouter;
