import { Combo, DetalleCombo } from "@/constants/table";

interface Props {
  rowData: Combo;
}

function DetailsColumn({ rowData }: Props): JSX.Element {
  return (
    <div className="flex items-start">
      <img
        src={rowData.Imagen_Combo}
        alt={rowData.Nombre_Combo}
        style={{ width: "100px", height: "auto" }}
        className="object-cover rounded-md"
      />
      <div className="ml-4">
        {rowData.Detalles && rowData.Detalles.length > 0 ? (
          rowData.Detalles.map((detalle: DetalleCombo, index: number) => (
            <div key={index} className="text-sm text-gray-700">
              <span>{detalle.Nombre_Producto}</span>
              <span className="ml-2 text-gray-500">x{detalle.Cantidad}</span>
            </div>
          ))
        ) : (
          <span className="text-sm text-gray-500">Sin detalles</span>
        )}
      </div>
    </div>
  );
}
export default DetailsColumn;
