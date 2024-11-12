// components/ModalFormularioProductos.jsx
import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Producto } from "@/constants/table";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import { PRODUCT_OPTIONS } from "@/constants/productOptions";
import { Dropdown } from "primereact/dropdown";

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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Producto>();

  const imageUrl = watch("Imagen_Producto");

  useEffect(() => {
    if (producto) {
      reset(producto);
    } else {
      reset({
        Codigo_Producto: "",
        Nombre: "",
        Tipo: "",
        Stock: 0,
        Precio: 0,
        Imagen_Producto: "",
      });
    }
  }, [producto, reset]);

  const onSubmit = (data: Producto) => {
    onAdd(data);
    handleOnHide();
  };

  const handleOnHide = () => {
    onHide();
    reset({
      Codigo_Producto: "",
      Nombre: "",
      Tipo: "",
      Stock: 0,
      Precio: 0,
      Imagen_Producto: "",
    });
  };

  return (
    <Dialog
      header={
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {producto ? "Editar Producto" : "Agregar Producto"}
          </h2>
        </div>
      }
      visible={visible}
      style={{ width: "500px", maxWidth: "90vw" }}
      onHide={handleOnHide}
      className="p-0"
      modal
      draggable={false}
      resizable={false}
    >
      <div className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <Input
              id="nombre"
              {...register("Nombre", { required: "Este campo es requerido" })}
              className={`mt-1 w-full p-2 border ${
                errors.Nombre ? "border-red-500" : "border-gray-300"
              } rounded-2xl shadow-sm focus:ring-primary focus:border-primary focus:outline-none focus:ring-2`}
            />
            {errors.Nombre && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Nombre.message}
              </p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo
            </label>
            <Dropdown
              id="tipo"
              value={watch("Tipo")}
              {...register("Tipo", { required: "Este campo es requerido" })}
              options={PRODUCT_OPTIONS}
              placeholder="Seleccione un tipo"
              className={` w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.Tipo ? "border-red-500" : "border-gray-300"
              } focus:ring-primary focus:border-primary`}
            />

            {errors.Tipo && (
              <p className="text-red-500 text-xs mt-1">{errors.Tipo.message}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <Input
              id="stock"
              type="number"
              {...register("Stock", {
                required: "Este campo es requerido",
                min: {
                  value: 0,
                  message: "El valor mínimo es 0",
                },
              })}
              className={`mt-1 w-full p-2 border ${
                errors.Stock ? "border-red-500" : "border-gray-300"
              } rounded-2xl shadow-sm focus:ring-primary focus:border-primary focus:outline-none focus:ring-2`}
              min={0}
            />
            {errors.Stock && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Stock.message}
              </p>
            )}
          </div>

          {/* Precio */}
          <div>
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <Input
              id="precio"
              type="number"
              {...register("Precio", {
                required: "Este campo es requerido",
                min: {
                  value: 0,
                  message: "El valor mínimo es 0",
                },
              })}
              className={`mt-1 w-full p-2 border ${
                errors.Precio ? "border-red-500" : "border-gray-300"
              } rounded-2xl shadow-sm focus:ring-primary focus:border-primary focus:outline-none focus:ring-2`}
              min={0}
            />
            {errors.Precio && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Precio.message}
              </p>
            )}
          </div>

          {/* Imagen del Producto (URL) */}
          <div>
            <label
              htmlFor="Imagen_Producto"
              className="block text-sm font-medium text-gray-700"
            >
              URL de la Imagen del Producto
            </label>
            <Input
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
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.Imagen_Producto && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Imagen_Producto.message}
              </p>
            )}
            {/* Vista Previa de la Imagen */}
            {imageUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imageUrl}
                  alt="Vista Previa"
                  className="object-cover w-32 h-32 rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              label="Cancelar"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-none py-1 px-4"
              onClick={handleOnHide}
              type="button"
            />
            <Button
              label="Guardar"
              className="bg-primary hover:bg-primary-dark text-white border-none py-1 px-4"
              type="submit"
              autoFocus
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ModalFormularioProductos;
