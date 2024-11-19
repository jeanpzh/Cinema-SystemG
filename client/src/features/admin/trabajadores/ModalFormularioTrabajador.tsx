// ModalFormularioTrabajador.tsx
import { Controller, useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { useEffect } from "react";
import { Trabajador } from "@/constants/table";

interface ModalFormularioTrabajadorProps {
  visible: boolean;
  onHide: () => void;
  onAdd: (data: Trabajador) => void;
  trabajador?: Trabajador;
}

const ModalFormularioTrabajador: React.FC<ModalFormularioTrabajadorProps> = ({
  visible,
  onHide,
  onAdd,
  trabajador,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Trabajador>({
    defaultValues: trabajador || {
      Correo: "",
      Nombre: "",
      Username: "",
      Password: "",
      Telefono: "",
      Rol: "",
    },
  });

  const handleOnHide = () => {
    onHide();
    reset({
      Codigo_Trabajador: "",
      Correo: "",
      Nombre: "",
      Username: "",
      Password: "",
      Telefono: "",
      Rol: "",
    });
  };

  useEffect(() => {
    if (trabajador) {
      reset({
        Codigo_Trabajador: trabajador.Codigo_Trabajador,
        Correo: trabajador.Correo,
        Nombre: trabajador.Nombre,
        Username: trabajador.Username,
        Password: trabajador.Password,
        Telefono: trabajador.Telefono,
        Rol: trabajador.Rol,
      });
    } else {
      reset({
        Codigo_Trabajador: "",
        Correo: "",
        Nombre: "",
        Username: "",
        Password: "",
        Telefono: "",
        Rol: "",
      });
    }
  }, [reset, trabajador]);

  const onSubmit = (data: Trabajador) => {
    data.Rol = data.Rol === "supervisor de productos" ? "producto" : "pelicula";
    onAdd(data);
    handleOnHide();
  };

  const RolOptions = [
    { label: "Supervisor de Productos", value: "supervisor de productos" },
    { label: "Supervisor de Películas", value: "supervisor de peliculas" },
  ];

  return (
    <Dialog
      header={trabajador ? "Editar Trabajador" : "Agregar Trabajador"}
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
          {/* Correo */}
          <div>
            <label
              htmlFor="Correo"
              className="block text-sm font-medium text-gray-700"
            >
              Correo
            </label>
            <input
              id="Correo"
              type="email"
              {...register("Correo", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Correo ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Correo del trabajador"
              required
            />
            {errors.Correo && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Correo.message}
              </p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label
              htmlFor="Nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="Nombre"
              {...register("Nombre", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Nombre ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nombre del trabajador"
              required
            />
            {errors.Nombre && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Nombre.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="Username"
              {...register("Username", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Username ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Username del trabajador"
              required
            />
            {errors.Username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="Password"
              type="Password"
              {...register("Password", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Password del trabajador"
              required
            />
            {errors.Password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Password.message}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label
              htmlFor="Telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              id="Telefono"
              type="tel"
              {...register("Telefono", {
                required: "Este campo es requerido.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.Telefono ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Teléfono del trabajador"
              required
            />
            {errors.Telefono && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Telefono.message}
              </p>
            )}
          </div>

          {/* Rol */}
          <div>
            <label
              htmlFor="Rol"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <Controller
              control={control}
              name="Rol"
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Dropdown
                  id="Rol"
                  {...field}
                  options={RolOptions}
                  placeholder="Seleccione un rol"
                  className={`mt-1 w-full p-2 border ${
                    errors.Rol ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              )}
            />
            {errors.Rol && (
              <p className="mt-1 text-sm text-red-600">{errors.Rol.message}</p>
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

export default ModalFormularioTrabajador;
