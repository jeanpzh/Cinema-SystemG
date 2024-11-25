/* eslint-disable @typescript-eslint/no-explicit-any */
// AgregarPelicula.tsx
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { Pelicula } from "@/constants/table";
import { useEffect, useState } from "react";

interface AgregarPeliculaProps {
  visible: boolean;
  onHide: () => void;
  onAdd: any;
  pelicula?: Pelicula;
}

const AgregarPelicula: React.FC<AgregarPeliculaProps> = ({
  visible,
  onHide,
  onAdd,
  pelicula,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Pelicula>(
    pelicula
      ? {
          defaultValues: {
            Nombre_Pelicula: pelicula.Nombre_Pelicula,
            Clasificacion: pelicula.Clasificacion,
            Genero: pelicula.Genero,
            Duracion: pelicula.Duracion,
            Codigo_Pelicula: pelicula.Codigo_Pelicula,
            Sinopsis: pelicula.Sinopsis,
          },
        }
      : {}
  );

  const handleOnHide = () => {
    onHide();
    reset(
      pelicula
        ? {
            Nombre_Pelicula: pelicula.Nombre_Pelicula,
            Clasificacion: pelicula.Clasificacion,
            Genero: pelicula.Genero,
            Duracion: pelicula.Duracion,
            Codigo_Pelicula: pelicula.Codigo_Pelicula,
            Sinopsis: pelicula.Sinopsis,
          }
        : {
            Nombre_Pelicula: "",
            Clasificacion: "",
            Genero: "",
            Duracion: "",
            Codigo_Pelicula: "",
            Sinopsis: "",
            Imagen_Pelicula: "",
          }
    );
    setPreview(null);
  };
  useEffect(() => {
    if (pelicula) {
      reset({
        Nombre_Pelicula: pelicula.Nombre_Pelicula,
        Clasificacion: pelicula.Clasificacion,
        Genero: pelicula.Genero,
        Duracion: pelicula.Duracion,
        Codigo_Pelicula: pelicula.Codigo_Pelicula,
        Sinopsis: pelicula.Sinopsis,
      });
    } else {
      reset({
        Nombre_Pelicula: "",
        Clasificacion: "",
        Genero: "",
        Duracion: "",
        Codigo_Pelicula: "",
        Sinopsis: "",
        Imagen_Pelicula: "",
      });
    }
  }, [reset, pelicula]);
  const onSubmit = async (data: Pelicula) => {
    const formData = new FormData();
    formData.append("Nombre_Pelicula", data.Nombre_Pelicula);
    formData.append("Clasificacion", data.Clasificacion);
    formData.append("Duracion", data.Duracion);
    formData.append("Sinopsis", data.Sinopsis);
    formData.append("Genero", data.Genero);
    formData.append("Imagen_Pelicula", data.Imagen_Pelicula[0]);
    onAdd(formData);
    handleOnHide();
  };

  const clasificacionOptions = [
    { label: "G", value: "G" },
    { label: "PG", value: "PG" },
    { label: "PG-13", value: "PG-13" },
    { label: "R", value: "R" },
    { label: "NC-17", value: "NC-17" },
  ];

  const generoOptions = [
    { label: "Acción", value: "Acción" },
    { label: "Comedia", value: "Comedia" },
    { label: "Drama", value: "Drama" },
    { label: "Terror", value: "Terror" },
    { label: "Ciencia Ficción", value: "Ciencia Ficción" },
    { label: "Romance", value: "Romance" },
    { label: "Documental", value: "Documental" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(newFile);
    }
  };

  return (
    <Dialog
      header={pelicula ? "Editar Película" : "Agregar Película"}
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
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="nombre"
              {...register("Nombre_Pelicula", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Nombre_Pelicula ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nombre de la película"
              required
            />
            {errors.Nombre_Pelicula && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Nombre_Pelicula.message}
              </p>
            )}
          </div>

          {/* Clasificación */}
          <div>
            <label
              htmlFor="clasificacion"
              className="block text-sm font-medium text-gray-700"
            >
              Clasificación
            </label>
            <Controller
              name="Clasificacion"
              control={control}
              rules={{ required: "Este campo es requerido." }}
              render={({ field }) => (
                <Dropdown
                  id="clasificacion"
                  {...field}
                  options={clasificacionOptions}
                  placeholder="Selecciona una clasificación"
                  className={`mt-1 w-full ${
                    errors.Clasificacion
                      ? "p-invalid border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                />
              )}
            />
            {errors.Clasificacion && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Clasificacion.message}
              </p>
            )}
          </div>

          {/* Duración */}
          <div>
            <label
              htmlFor="duracion"
              className="block text-sm font-medium text-gray-700"
            >
              Duración (min)
            </label>
            <input
              id="duracion"
              type="number"
              {...register("Duracion", {
                required: "Este campo es requerido.",
                min: {
                  value: 1,
                  message: "La duración debe ser al menos 1 minuto.",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Duracion ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Duración en minutos"
              required
            />
            {errors.Duracion && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Duracion.message}
              </p>
            )}
          </div>

          {/* Género */}
          <div>
            <label
              htmlFor="genero"
              className="block text-sm font-medium text-gray-700"
            >
              Género
            </label>
            <Controller
              name="Genero"
              control={control}
              rules={{ required: "Este campo es requerido." }}
              render={({ field }) => (
                <Dropdown
                  id="genero"
                  {...field}
                  options={generoOptions}
                  placeholder="Selecciona un género"
                  className={`mt-1 w-full ${
                    errors.Genero
                      ? "p-invalid border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                />
              )}
            />
            {errors.Genero && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Genero.message}
              </p>
            )}
          </div>

          {/* Sinopsis */}
          <div>
            <label
              htmlFor="sinopsis"
              className="block text-sm font-medium text-gray-700"
            >
              Sinopsis
            </label>
            <textarea
              id="sinopsis"
              {...register("Sinopsis", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Sinopsis ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={4}
              placeholder="Descripción de la película"
              required
            ></textarea>
            {errors.Sinopsis && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Sinopsis.message}
              </p>
            )}
          </div>
          {/* 
            Subir imagen para procesar en el backend
          */}
          <div>
            <label
              htmlFor="imagen"
              className="block text-sm font-medium text-gray-700"
            >
              Imagen
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("Imagen_Pelicula", {
                required: "Este campo es requerido.",
              })}
              onChange={handleImageChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona una imagen"
              required
            />
            {errors.Imagen_Pelicula && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Imagen_Pelicula.message}
              </p>
            )}
          </div>
          {/* Imagen previa */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Imagen de la película"
                className="w-1/2 h-auto"
              />
            </div>
          )}

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

export default AgregarPelicula;
