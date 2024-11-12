// controllers/ProductoController.ts
import { Request, Response } from "express";
import ProductoLN from "../LN/ProductoLN";
import Producto from "../models/Producto";
import { randomUUID } from "crypto";

export const obtenerProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  return new ProductoLN().obtenerProductosLN().then((productos) => {
    res.status(200).json(productos);
  });
};

export const añadirProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { Nombre, Tipo, Stock, Precio, Imagen_Producto } = req.body;

  const producto = new Producto(
    randomUUID(),
    Nombre,
    Tipo,
    Stock,
    Precio,
    Imagen_Producto
  );
  try {
    const productoAgregado = await new ProductoLN().añadirProductoLN(producto);
    res.status(201).json(productoAgregado);
  } catch (error: any) {
    console.error("Error al agregar producto:", error);
    if (error.message === "El producto ya existe en la base de datos") {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
};

export const obtenerProductoPorCodigo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { codigo } = req.params;
  return new ProductoLN()
    .obtenerProductoPorCodigoLN(codigo)
    .then((producto) => {
      res.status(200).json(producto);
    });
};

export const eliminarProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { codigo } = req.params;
  try {
    await new ProductoLN().eliminarProductoLN(codigo);
    res.status(200).json({ mensaje: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el producto" });
  }
};

export const editarProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { codigo } = req.params;
  const { Nombre, Tipo, Stock, Precio, Imagen_Producto } = req.body;

  const producto = new Producto(
    codigo,
    Nombre,
    Tipo,
    Stock,
    Precio,
    Imagen_Producto
  );
  try {
    const productoEditado = await new ProductoLN().actualizarProductoLN(
      producto
    );
    if (!productoEditado) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }
    res.status(200).json(productoEditado);
  } catch (error: any) {
    console.error("Error al editar producto:", error);
    if (error.message === "El producto ya existe en la base de datos") {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
};
