import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { PreguntaFrecuente } from "@/constants/table";
import { useEffect } from "react";

interface ModalFormularioPreguntaFrecuenteProps {
  visible: boolean;
  onHide: () => void;
  onAdd: (data: PreguntaFrecuente) => void;
  pregunta?: PreguntaFrecuente;
}

const ModalFormularioPF: React.FC<ModalFormularioPreguntaFrecuenteProps> = ({
  visible,
  onHide,
  onAdd,
  pregunta,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PreguntaFrecuente>({
    defaultValues: pregunta || {
      pregunta: "",
      respuesta: "",
      id: "",
    },
  });

  const handleOnHide = () => {
    onHide();
    reset();
  };

  useEffect(() => {
    if (pregunta) {
      reset({
        pregunta: pregunta.pregunta,
        respuesta: pregunta.respuesta,
        id: pregunta.id,
      });
    } else {
      reset({
        pregunta: "",
        respuesta: "",
        id: "",
      });
    }
  }, [reset, pregunta]);

  const onSubmit = (data: PreguntaFrecuente) => {
    onAdd(data);
    handleOnHide();
  };

  return (
    <Dialog
      header={
        pregunta ? "Editar Pregunta Frecuente" : "Agregar Pregunta Frecuente"
      }
      visible={visible}
      style={{ width: "50vw" }}
      onHide={handleOnHide}
      breakpoints={{ "960px": "95vw" }}
      className="p-0"
      modal
      dismissableMask
    >
      <div className="flex flex-col h-full p-6 overflow-y-auto bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pregunta */}
          <div>
            <label
              htmlFor="pregunta"
              className="block text-sm font-medium text-gray-700"
            >
              Pregunta
            </label>
            <input
              id="pregunta"
              {...register("pregunta", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.pregunta ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Pregunta"
              required
            />
            {errors.pregunta && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pregunta.message}
              </p>
            )}
          </div>

          {/* Respuesta */}
          <div>
            <label
              htmlFor="respuesta"
              className="block text-sm font-medium text-gray-700"
            >
              Respuesta
            </label>
            <textarea
              id="respuesta"
              {...register("respuesta", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.respuesta ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={4}
              placeholder="Respuesta"
              required
            ></textarea>
            {errors.respuesta && (
              <p className="mt-1 text-sm text-red-600">
                {errors.respuesta.message}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleOnHide}
              className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#FF5E5E] before:to-[#FF9191] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl text-[#fff] hover:before:left-0"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl text-[#fff] hover:before:left-0"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ModalFormularioPF;
