import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Producto } from "@/store/productoStore";
import { useProductoStore } from "@/store/productoStore";
import { Plus, Minus } from "lucide-react";

interface Props {
  products: Producto[];
  productosSeleccionados: Producto[];
}

export function SeleccionarProducto({
  products = [],
  productosSeleccionados = [],
}: Props) {
  const setProducts = useProductoStore((state) => state.setProductos);
  const updateCantidad = useProductoStore((state) => state.updateCantidad);

  const handleOnCheckedChange = (product: Producto) => {
    setProducts(
      productosSeleccionados.some(
        (p) => p.Codigo_Producto === product.Codigo_Producto
      )
        ? productosSeleccionados.filter(
            (p) => p.Codigo_Producto !== product.Codigo_Producto
          )
        : [...productosSeleccionados, product]
    );
  };

  const handleChecked = (product: Producto) => {
    return (
      productosSeleccionados.findIndex(
        (p) => p.Codigo_Producto === product.Codigo_Producto
      ) !== -1
    );
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const product = productosSeleccionados.find(
      (p) => p.Codigo_Producto === productId
    );

    if (!product) return;

    if (product.Cantidad + change > product.Stock) {
      return;
    }
    updateCantidad(
      productId,
      Math.max(
        0,
        (productosSeleccionados.find((p) => p.Codigo_Producto === productId)
          ?.Cantidad || 0) + change
      )
    );
  };

  const calculateTotal = () => {
    return productosSeleccionados.reduce((total, product) => {
      return total + product.Precio * (product.Cantidad || 0);
    }, 0);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-4">Menú del Cine</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.Codigo_Producto} className="shadow-md">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={product.Imagen_Producto}
                  alt={product.Nombre}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <Label
                      htmlFor={`product-${product.Codigo_Producto}`}
                      className="text-lg font-semibold"
                    >
                      {product.Nombre}
                    </Label>
                    <Checkbox
                      id={`product-${product.Codigo_Producto}`}
                      checked={handleChecked(product)}
                      onCheckedChange={() => handleOnCheckedChange(product)}
                    />
                  </div>
                  <p className="text-sm">{product.Tipo}</p>
                  <p className="mt-2 text-sm font-medium">
                    Precio: ${product.Precio}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(product.Codigo_Producto, -1)
                  }
                  disabled={
                    !productosSeleccionados.find(
                      (p) => p.Codigo_Producto === product.Codigo_Producto
                    )
                  }
                >
                  <Minus />
                </Button>
                <span>
                  {productosSeleccionados.find(
                    (p) => p.Codigo_Producto === product.Codigo_Producto
                  )?.Cantidad || 0}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    handleQuantityChange(product.Codigo_Producto, 1)
                  }
                >
                  <Plus />
                </Button>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleOnCheckedChange(product)}
              >
                {handleChecked(product) ? "Quitar" : "Agregar"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="mt-6 shadow-md">
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">Resumen del Pedido</h3>
          {productosSeleccionados.map((product) => (
            <div
              key={product.Codigo_Producto}
              className="flex justify-between items-center py-2"
            >
              <span>
                {product.Nombre} x {product.Cantidad}
              </span>
              <span>
                ${(product.Precio * (product.Cantidad || 0)).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
