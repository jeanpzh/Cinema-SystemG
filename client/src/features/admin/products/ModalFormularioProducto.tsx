import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Producto } from "@/constants/table";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useForm } from "react-hook-form";

interface Props {
  visible: boolean;
  onHide: () => void;
  onAdd: (data: Producto) => void;
  producto?: Producto;
}

const ModalFormularioProductos: React.FC<Props> = ({
  visible,
  onHide,
  onAdd,
  producto,
}) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [precio, setPrecio] = useState<number>(0);
  const {
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm<Producto>();

  const imageUrl = watch("Imagen_Producto");
  useEffect(() => {
    if (producto) {
      setNombre(producto.Nombre);
      setTipo(producto.Tipo);
      setStock(producto.Stock);
      setPrecio(producto.Precio);

      reset(producto);
    } else {
      setNombre("");
      setTipo("");
      setStock(0);
      setPrecio(0);
    }
  }, [producto, reset]);

  const handleSubmit = () => {
    const newProducto: Producto = {
      Codigo_Producto: producto ? producto.Codigo_Producto : "",
      Nombre: nombre,
      Tipo: tipo,
      Stock: stock,
      Precio: precio,
      Imagen_Producto: imageUrl || "",
    };
    onAdd(newProducto);
    onHide();
  };

  return (
    <Dialog
      header={producto ? "Editar Producto" : "Agregar Producto"}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
      breakpoints={{ "960px": "95vw" }}
      className="p-0"
      modal
      dismissableMask
    >
      <div className="flex flex-col h-full p-6 overflow-y-auto bg-white space-y-6">
        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <InputText
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 w-full"
            required
          />
        </div>

        {/* Tipo */}
        <div>
          <label
            htmlFor="tipo"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo
          </label>
          <InputText
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="mt-1 w-full"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <InputNumber
            id="stock"
            value={stock}
            onValueChange={(e) => setStock(e.value || 0)}
            className="mt-1 w-full"
            min={0}
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label
            htmlFor="precio"
            className="block text-sm font-medium text-gray-700"
          >
            Precio
          </label>
          <InputNumber
            id="precio"
            value={precio}
            onValueChange={(e) => setPrecio(e.value || 0)}
            className="mt-1 w-full"
            min={0}
            mode="currency"
            currency="USD"
            locale="es-ES"
            required
          />
        </div>

        {/* Imagen del Producto (URL) */}
        <div>
          <label
            htmlFor="Imagen_Producto"
            className="block text-sm font-medium text-gray-700"
          >
            URL de la Imagen del Producto
          </label>
          <input
            id="Imagen_Producto"
            type="url"
            {...register("Imagen_Producto", {
              required: "Este campo es requerido",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Ingrese una URL válida",
              },
            })}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.Imagen_Producto ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
          {errors.Imagen_Producto && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Imagen_Producto.message}
            </p>
          )}
          {/* Vista Previa de la Imagen */}
          {imageUrl && (
            <div className="mt-2 w-24 h-24">
              <img
                src={imageUrl}
                alt="Vista Previa"
                className="object-cover w-full h-full rounded-md shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <Button
            label="Cancelar"
            className="p-button-secondary p-button-outlined"
            onClick={onHide}
          />
          <Button
            label="Guardar"
            className="p-button-primary"
            onClick={handleSubmit}
            autoFocus
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ModalFormularioProductos;
