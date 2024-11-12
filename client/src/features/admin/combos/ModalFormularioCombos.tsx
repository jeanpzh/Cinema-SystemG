// components/ModalFormularioCombos.tsx
import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { Combo } from "@/constants/table";
import { obtenerOpcionesCombo } from "@/api/combos";
import { ProductoOpcion } from "@/constants/options";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Input from "@/components/Input";

interface DetalleCombo {
  Codigo_Producto: string;
  Cantidad: number;
}

interface Props {
  visible: boolean;
  onHide: () => void;
  onAdd: (data: Combo) => void;
  combo?: Combo;
}

interface FormData {
  Nombre_Combo: string;
  Descripcion: string;
  Imagen_Combo: string;
  Descuento: number;
}

function ModalFormularioCombos({ visible, onHide, onAdd, combo }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [detalles, setDetalles] = React.useState<DetalleCombo[]>([]);
  const [productos, setProductos] = React.useState<ProductoOpcion[]>([]);
  const [selectedProducto, setSelectedProducto] = React.useState<string | null>(
    null
  );
  const imageUrl = watch("Imagen_Combo");
  const descuento = watch("Descuento") || 0;

  const [precioTotal, setPrecioTotal] = React.useState<number>(0);
  const [precioFinal, setPrecioFinal] = React.useState<number>(0);

  useEffect(() => {
    async function fetchOpciones() {
      try {
        const opciones = await obtenerOpcionesCombo();
        setProductos(opciones.productos || opciones);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOpciones();
  }, []);

  useEffect(() => {
    if (combo) {
      reset({
        Nombre_Combo: combo.Nombre_Combo,
        Descripcion: combo.Descripcion,
        Imagen_Combo: combo.Imagen_Combo || "",
      });
      setDetalles(combo.Detalles);
    } else {
      reset({
        Nombre_Combo: "",
        Descripcion: "",
        Imagen_Combo: "",
        Descuento: 0,
      });
      setDetalles([]);
      setPrecioTotal(0);
      setPrecioFinal(0);
    }
  }, [combo, reset]);

  useEffect(() => {
    calcularPrecios(detalles, descuento);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descuento, detalles]);

  const handleAddProducto = (codigoProducto: string) => {
    const existe = detalles.some(
      (detalle) => detalle.Codigo_Producto === codigoProducto
    );
    if (existe) {
      alert("El producto ya ha sido agregado al combo.");
      return;
    }

    const nuevoDetalle: DetalleCombo = {
      Codigo_Producto: codigoProducto,
      Cantidad: 1,
    };
    setDetalles([...detalles, nuevoDetalle]);
  };

  const handleCantidadChange = (index: number, cantidad: number) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index].Cantidad = cantidad;
    setDetalles(nuevosDetalles);
  };

  const handleEliminarDetalle = (index: number) => {
    const nuevaLista = detalles.filter((_, i) => i !== index);
    setDetalles(nuevaLista);
  };

  const calcularPrecios = (detalles: DetalleCombo[], descuento: number) => {
    const total = detalles.reduce((acc, detalle) => {
      const producto = productos.find(
        (prod) => prod.Codigo_Producto === detalle.Codigo_Producto
      );
      return acc + (producto ? producto.Precio * detalle.Cantidad : 0);
    }, 0);

    setPrecioTotal(total);
    setPrecioFinal(total - (total * descuento) / 100);
  };

  const onSubmit = (data: FormData) => {
    const newCombo: Combo = {
      Codigo_Combo: combo ? combo.Codigo_Combo : "",
      Nombre_Combo: data.Nombre_Combo,
      Descripcion: data.Descripcion,
      Imagen_Combo: data.Imagen_Combo,
      Precio: precioFinal,
      Detalles: detalles,
    };
    onAdd(newCombo);
    reset();
    onHide();
  };

  return (
    <Dialog
      header={
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {combo ? "Editar Combo" : "Agregar Combo"}
          </h2>
        </div>
      }
      visible={visible}
      style={{ width: "500px", maxWidth: "90vw" }}
      onHide={onHide}
      className="p-0"
      modal
      draggable={false}
      resizable={false}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full p-6 overflow-y-auto bg-white space-y-6"
      >
        {/* Nombre del Combo */}
        <div>
          <label
            htmlFor="Nombre_Combo"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Combo
          </label>
          <Input
            id="Nombre_Combo"
            {...register("Nombre_Combo", {
              required: "Este campo es requerido",
            })}
            className={`mt-1 w-full p-2 border ${
              errors.Nombre_Combo ? "border-red-500" : "border-gray-300"
            } rounded-2xl shadow-sm focus:ring-primary focus:border-primary focus:outline-none focus:ring-2`}
          />
          {errors.Nombre_Combo && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Nombre_Combo.message}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="Descripcion"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="Descripcion"
            {...register("Descripcion", {
              required: "Este campo es requerido",
            })}
            rows={3}
            className={`mt-1 w-full p-2 border ${
              errors.Descripcion ? "border-red-500" : "border-gray-300"
            } rounded-2xl shadow-sm focus:ring-primary focus:border-primary focus:outline-none focus:ring-2`}
          />
          {errors.Descripcion && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Descripcion.message}
            </p>
          )}
        </div>

        {/* Imagen del Combo (URL) */}
        <div>
          <label
            htmlFor="Imagen_Combo"
            className="block text-sm font-medium text-gray-700"
          >
            URL de la Imagen del Combo
          </label>
          <Input
            id="Imagen_Combo"
            type="url"
            {...register("Imagen_Combo", {
              required: "Este campo es requerido",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Ingrese una URL válida",
              },
            })}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.Imagen_Combo ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errors.Imagen_Combo && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Imagen_Combo.message}
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

        {/* Selección de Producto */}
        <div>
          <label
            htmlFor="producto"
            className="block text-sm font-medium text-gray-700"
          >
            Producto
          </label>
          <Dropdown
            id="producto"
            value={selectedProducto}
            options={productos.map((producto) => ({
              label: producto.Nombre,
              value: producto.Codigo_Producto,
            }))}
            onChange={(e) => {
              setSelectedProducto(e.value);
              handleAddProducto(e.value);
            }}
            placeholder="Seleccione un producto"
            className="mt-1 w-full p-2 border border-gray-300 rounded-2xl shadow-sm focus:ring-primary focus:border-primary focus:outline-none focus:ring-2"
            panelStyle={{ maxHeight: "15rem", overflow: "auto" }}
            style={{ whiteSpace: "normal" }}
          />
        </div>

        {/* Detalles del Combo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Detalles
          </label>
          <div className="mt-2 space-y-4">
            {detalles.map((detalle, index) => {
              const producto = productos.find(
                (prod) => prod.Codigo_Producto === detalle.Codigo_Producto
              );
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1 text-gray-700">
                    {producto ? producto.Nombre : detalle.Codigo_Producto}
                  </div>
                  <Input
                    type="number"
                    value={String(detalle.Cantidad)}
                    min={1}
                    onChange={(e) =>
                      handleCantidadChange(index, Number(e.target.value))
                    }
                    className="w-[75px] text-center px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger"
                    onClick={() => handleEliminarDetalle(index)}
                    aria-label="Eliminar detalle"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Descuento */}
        <div>
          <label
            htmlFor="Descuento"
            className="block text-sm font-medium text-gray-700"
          >
            Descuento (%)
          </label>
          <Input
            id="Descuento"
            type="number"
            {...register("Descuento", {
              required: "Este campo es requerido",
              min: {
                value: 0,
                message: "El valor mínimo es 0",
              },
              max: {
                value: 100,
                message: "El valor máximo es 100",
              },
            })}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.Descuento ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
            min={0}
            max={100}
          />
          {errors.Descuento && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Descuento.message}
            </p>
          )}
        </div>

        {/* Precio Total */}
        <div className="flex justify-between text-gray-700">
          <span>Precio Total:</span>
          <span>${precioTotal.toFixed(2)}</span>
        </div>

        {/* Precio con Descuento */}
        <div className="flex justify-between text-gray-700">
          <span>Precio con Descuento:</span>
          <span>${precioFinal.toFixed(2)}</span>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-secondary"
          />
          <Button
            type="submit"
            label="Guardar"
            icon="pi pi-check"
            className="p-button-primary"
          />
        </div>
      </form>
    </Dialog>
  );
}

export default ModalFormularioCombos;
