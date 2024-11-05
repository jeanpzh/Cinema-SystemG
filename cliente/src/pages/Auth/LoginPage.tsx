import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  interface FormData {
    email: string;
    password: string;
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    axios.post("http://localhost:3000/auth/login", data);
    console.log(data);
  };

  return (
    <div id="app" className="grid grid-cols-[720px_1fr] h-screen">
      <div className="top-0 z-[-2] h-full w-[720px] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="p-16 flex flex-col items-center justify-center gap-4">
        <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
          Bienvenido
        </h2>
        <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          ¡Hola! Bienvenido a nuestra aplicación.
        </span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input
            type="text"
            className="w-[400px] h-[48px] border border-gray-300 rounded-md p-4"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              Este campo es requerido
            </span>
          )}
          <label>Contraseña</label>
          <input
            type="password"
            className="w-[400px] h-[48px] border border-gray-300 rounded-md p-4"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              Este campo es requerido
            </span>
          )}
          <button
            className="
            w-[400px] h-[48px] bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500
            text-white font-semibold rounded-md
            hover:from-neutral-800 hover:via-slate-400 hover:to-neutral-400
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500
          "
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
