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
    // Si la cantidad es menor al stock, se actualiza la cantidad

    const product = productosSeleccionados.find(
      (p) => p.Codigo_Producto === productId
    );

    if (!product) return;

    if (product.Cantidad + change > product.Stock) {
      return;
    }
    console.log(product.Cantidad);
    console.log(product.Stock);
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
    <div className="space-y-6 p-4 bg-[#1a1b26] text-[#a9b1d6]">
      <h2 className="text-2xl font-bold text-[#7aa2f7] mb-4">Menú del Cine</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card
            key={product.Codigo_Producto}
            className="bg-[#24283b] border-[#414868]"
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={product.Imagen_Producto}
                  alt={product.Nombre}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Label
                        htmlFor={`product-${product.Codigo_Producto}`}
                        className="text-lg font-semibold text-[#7aa2f7]"
                      >
                        {product.Nombre}
                      </Label>
                      <p className="text-sm text-[#565f89]">{product.Tipo}</p>
                    </div>
                    <Checkbox
                      id={`product-${product.Codigo_Producto}`}
                      checked={handleChecked(product)}
                      onCheckedChange={() => handleOnCheckedChange(product)}
                      className="border-[#414868]"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">
                    Precio: ${product.Precio}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-[#1f2335] p-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
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
                  className="h-8 w-8 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">
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
                  className="h-8 w-8 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleOnCheckedChange(product)}
                className="bg-[#7aa2f7] text-[#1a1b26] hover:bg-[#7aa2f7]/80"
              >
                {handleChecked(product) ? "Quitar" : "Agregar"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="mt-6 bg-[#24283b] border-[#414868]">
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold text-[#7aa2f7] mb-2">
            Resumen del Pedido
          </h3>
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
          <div className="flex justify-between items-center pt-4 border-t border-[#414868] mt-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
