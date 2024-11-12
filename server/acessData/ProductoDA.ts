// src/da/ProductoDA.ts
import Producto from "../models/Producto";
import pool from "../db/config";

interface DuplicateCheck {
  producto: Producto;
  Codigo_Producto: string;
}

export class ProductoDA {
  /**
   * Comprueba si ya existe un producto con el mismo código.
   * @param codigoProducto Código del producto.
   * @param productoId ID del producto a actualizar.
   */
  async evitarDuplicados(nombreNormalizado: string, productoId?: string) {
    const producto = await this.obtenerProductoPorNombreNormalizado(
      nombreNormalizado
    );
    console.log(producto);
    if (producto && producto.Codigo_Producto !== productoId) {
      throw new Error("Ya existe un producto con el mismo título");
    }
  }
  /**
   * Obtiene un producto por su código.
   * @param codigoProducto Código del producto.
   * @returns El producto encontrado o null si no existe.
   */
  async obtenerProductoPorCodigo(
    codigoProducto: string
  ): Promise<Producto | null> {
    try {
      const query = 'SELECT * FROM "ObtenerProductoPorCodigo"($1)';
      const values = [codigoProducto];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener el producto por código");
    }
  }
  async obtenerProductoPorNombreNormalizado(
    nombreNormalizado: string
  ): Promise<DuplicateCheck | null> {
    try {
      const query = 'SELECT * FROM "ObtenerProductoPorTituloNormalizado"($1)';
      const values = [nombreNormalizado];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0] as DuplicateCheck;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener el producto por título normalizado");
    }
  }

  /**
   * Obtiene todos los productos.
   * @returns Un array de productos.
   */
  async obtenerProductos(): Promise<Producto[]> {
    try {
      const query = 'SELECT * FROM "ObtenerProductos"()';
      const result = await pool.query(query);

      return result.rows as Producto[];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener los productos");
    }
  }

  /**
   * Añade un nuevo producto a la base de datos.
   * @param producto Objeto Producto a añadir.
   * @returns El producto añadido.
   */
  async añadirProducto(producto: Producto): Promise<Producto> {
    try {
      const nombreNormalizado = producto
        .getNombre()
        .toLowerCase()
        .replace(/\s+/g, "");

      await this.evitarDuplicados(nombreNormalizado);
      const insertarProductoQuery = `
        SELECT "InsertarProducto"($1, $2, $3, $4, $5,$6)
      `;
      const insertarValues = [
        producto.getCodigoProducto(),
        producto.getNombre(),
        producto.getTipo(),
        producto.getStock(),
        producto.getPrecio(),
        producto.getImagenProducto(),
      ];

      await pool.query(insertarProductoQuery, insertarValues);

      const productoAñadido = await this.obtenerProductoPorCodigo(
        producto.getCodigoProducto()
      );
      if (!productoAñadido) {
        throw new Error("Error al obtener el producto recién añadido");
      }
      return productoAñadido;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("Error al añadir el producto");
    }
  }

  /**
   * Actualiza un producto existente en la base de datos.
   * @param producto Objeto Producto con los datos actualizados.
   * @returns El producto actualizado o null si no se encontró.
   */
  async actualizarProducto(producto: Producto): Promise<Producto | null> {
    try {
      const nombreNormalizado = producto
        .getNombre()
        .toLowerCase()
        .replace(/\s+/g, "");
      console.log(nombreNormalizado, producto.getCodigoProducto());
      await this.evitarDuplicados(
        nombreNormalizado,
        producto.getCodigoProducto()
      );

      const actualizarProductoQuery = `
        SELECT "ActualizarProducto"($1, $2, $3, $4, $5,$6)
      `;
      const actualizarValues = [
        producto.getCodigoProducto(),
        producto.getNombre(),
        producto.getTipo(),
        producto.getStock(),
        producto.getPrecio(),
        producto.getImagenProducto(),
      ];

      await pool.query(actualizarProductoQuery, actualizarValues);

      const productoActualizado = await this.obtenerProductoPorCodigo(
        producto.getCodigoProducto()
      );
      return productoActualizado;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al actualizar el producto");
    }
  }

  /**
   * Elimina un producto de la base de datos por su código.
   * @param codigoProducto Código del producto a eliminar.
   */
  async eliminarProducto(codigoProducto: string): Promise<void> {
    try {
      const eliminarProductoQuery = `
        SELECT "EliminarProducto"($1)
      `;
      const eliminarValues = [codigoProducto];

      await pool.query(eliminarProductoQuery, eliminarValues);
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al eliminar el producto");
    }
  }
}
