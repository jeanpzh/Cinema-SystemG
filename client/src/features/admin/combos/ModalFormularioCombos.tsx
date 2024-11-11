// ModalFormularioCombos.tsx
import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { Combo } from "@/constants/table";
import { obtenerOpcionesCombo } from "@/api/combos";
import { ProductoOpcion } from "@/constants/options";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

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
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      Nombre_Combo: "",
      Descripcion: "",
      Imagen_Combo: "",
      Descuento: 0,
    },
  });

  const [detalles, setDetalles] = React.useState<DetalleCombo[]>([]);
  const [productos, setProductos] = React.useState<ProductoOpcion[]>([]);
  const [selectedProducto, setSelectedProducto] = React.useState<string | null>(
    null
  );
  const imageUrl = watch("Imagen_Combo");

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
    console.log(combo);
    if (combo) {
      setValue("Nombre_Combo", combo.Nombre_Combo);
      setValue("Descripcion", combo.Descripcion);
      setValue("Imagen_Combo", combo.Imagen_Combo || "");
      setDetalles(combo.Detalles);
    } else {
      setDetalles([]);
      setValue("Nombre_Combo", "");
      setValue("Descripcion", "");
      setValue("Imagen_Combo", "");
      setValue("Descuento", 0);
      setPrecioTotal(0);
      setPrecioFinal(0);
    }
  }, [combo, setValue]);

  useEffect(() => {
    const descuento = watch("Descuento");
    calcularPrecios(detalles, descuento);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detalles, watch]);

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

  const onSubmit = () => {
    const newCombo: Combo = {
      Codigo_Combo: combo ? combo.Codigo_Combo : "",
      Nombre_Combo: watch("Nombre_Combo"),
      Descripcion: watch("Descripcion"),
      Imagen_Combo: watch("Imagen_Combo"),
      Precio: precioFinal,
      Detalles: detalles,
    };
    onAdd(newCombo);
    reset();
    onHide();
  };

  return (
    <Dialog
      header={combo ? "Editar Combo" : "Agregar Combo"}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
      breakpoints={{ "960px": "95vw" }}
      className="p-0"
      modal
      dismissableMask
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full p-6 overflow-y-auto bg-white space-y-6"
      >
        {/* Nombre del Combo */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Combo
          </label>
          <input
            id="nombre"
            type="text"
            {...register("Nombre_Combo", {
              required: "Este campo es requerido",
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            htmlFor="descripcion"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            {...register("Descripcion", {
              required: "Este campo es requerido",
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
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
          <input
            id="Imagen_Combo"
            type="url"
            {...register("Imagen_Combo", {
              required: "Este campo es requerido",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Ingrese una URL válida",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errors.Imagen_Combo && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Imagen_Combo.message}
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
            className="mt-1  w-full"
            required
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
                  <input
                    type="number"
                    value={detalle.Cantidad}
                    min={1}
                    onChange={(e) =>
                      handleCantidadChange(index, Number(e.target.value))
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            htmlFor="descuento"
            className="block text-sm font-medium text-gray-700"
          >
            Descuento (%)
          </label>
          <input
            id="descuento"
            type="number"
            {...register("Descuento", { required: true, min: 0, max: 100 })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={0}
            max={100}
          />
          {errors.Descuento && (
            <p className="text-red-500 text-xs mt-1">
              Ingrese un valor entre 0 y 100
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
            onClick={onSubmit}
          />
        </div>
      </form>
    </Dialog>
  );
}

export default ModalFormularioCombos;
