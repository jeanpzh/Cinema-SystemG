// ln/ProductoLN.ts
import { ProductoDA } from "../acessData/ProductoDA";
import Producto from "../models/Producto";

class ProductoLN {
  async obtenerProductosLN() {
    const productos: Producto[] = await new ProductoDA().obtenerProductos();
    return productos;
  }

  async añadirProductoLN(producto: Producto) {
    try {
      return await new ProductoDA().añadirProducto(producto);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async obtenerProductoPorCodigoLN(codigoProducto: string) {
    return await new ProductoDA().obtenerProductoPorCodigo(codigoProducto);
  }

  async actualizarProductoLN(producto: Producto) {
    try {
      return await new ProductoDA().actualizarProducto(producto);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async eliminarProductoLN(codigoProducto: string) {
    await new ProductoDA().eliminarProducto(codigoProducto);
  }
}

export default ProductoLN;
