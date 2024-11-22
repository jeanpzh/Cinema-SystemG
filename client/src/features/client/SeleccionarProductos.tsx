import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Producto } from "@/constants/table";
import { useProductoStore } from "@/store/productoStore";

interface Props {
  products: Producto[];
  productosSeleccionados: Producto[];
}

export function SeleccionarProducto({
  products,
  productosSeleccionados,
}: Props) {
  const setProducts = useProductoStore((state) => state.setProductos);

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

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.Codigo_Producto}
          className="flex items-start space-x-4 rtl:space-x-reverse"
        >
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
                  className="text-base font-semibold"
                >
                  {product.Nombre}
                </Label>
                <p className="text-sm text-muted-foreground">{product.Tipo}</p>
              </div>
              <Checkbox
                id={`product-${product.Codigo_Producto}`}
                checked={handleChecked(product)}
                onCheckedChange={() => handleOnCheckedChange(product)}
              />
            </div>
            <p className="mt-2 text-sm font-medium">
              Precio: ${product.Precio}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
