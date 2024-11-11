// AgregarPelicula.tsx
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { Pelicula } from "@/constants/table";

interface AgregarPeliculaProps {
  visible: boolean;
  onHide: () => void;
  onAdd: (data: Pelicula) => void;
  pelicula?: Pelicula;
}

const AgregarPelicula: React.FC<AgregarPeliculaProps> = ({
  visible,
  onHide,
  onAdd,
  pelicula,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Pelicula>({
    defaultValues: pelicula || {
      Nombre_Pelicula: "",
      Clasificacion: "",
      Genero: "",
      Duracion: "",
      Codigo_Pelicula: "",
      Sinopsis: "",
    },
  });

  const onSubmit = (data: Pelicula) => {
    onAdd(data);
    reset();
    onHide();
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

  return (
    <Dialog
      header={pelicula ? "Editar Película" : "Agregar Película"}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
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

          {/* Botones */}
          <div className="flex justify-end space-x-4">
            <Button
              label="Cancelar"
              className="p-button-secondary p-button-outlined"
              onClick={onHide}
            />
            <Button
              label={pelicula ? "Actualizar" : "Agregar"}
              type="submit"
              className="p-button-primary"
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AgregarPelicula;
