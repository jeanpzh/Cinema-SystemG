import { Combo, Producto } from "@/constants/table";

interface Props {
  products: Producto[];
  combos: Combo[];
}

const ItemsSeleccionados: React.FC<Props> = ({ products, combos }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.Codigo_Producto}
          className="flex items-center space-x-4 rtl:space-x-reverse"
        >
          <img
            src={product.Imagen_Producto}
            alt={product.Nombre}
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
          <div className="flex-grow">
            <p className="text-base font-semibold">{product.Nombre}</p>
            <p className="text-sm text-muted-foreground">
              Precio: ${product.Precio}
            </p>
          </div>
        </div>
      ))}
      {combos.map((combo) => (
        <div
          key={combo.Codigo_Combo}
          className="flex items-center space-x-4 rtl:space-x-reverse"
        >
          <img
            src={combo.Imagen_Combo}
            alt={combo.Nombre_Combo}
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
          <div className="flex-grow">
            <p className="text-base font-semibold">{combo.Nombre_Combo}</p>
            <p className="text-sm text-muted-foreground">
              Precio: ${combo.Precio}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemsSeleccionados;
