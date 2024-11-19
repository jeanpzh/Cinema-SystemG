/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/LoginPage.tsx

import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "@/store/loginStore";

// Esquema de validación con Zod
const schema = z.object({
  username: z
    .string()
    .nonempty({ message: "El correo electrónico o username es obligatorio" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  remember: z.boolean().optional(),
});

// Tipos inferidos de Zod
type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const fetchUser = useLoginStore((state: any) => state.loadUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await login(data.username, data.password);
      if (res.status !== 200) {
        setTimeout(() => {
          setLoading(false);
          alert("¡Usuario o contraseña incorrectos!");
        }, 2000);

        setLoading(false);
        return;
      }

      // Simular carga
      setTimeout(() => {
        setLoading(false);
        alert("¡Has iniciado sesión correctamente!");
        fetchUser();
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setTimeout(() => {
        setLoading(false);
        alert("¡Usuario o contraseña incorrectos!");
      }, 500);
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setIsForgot(true);
  };

  const handleBackToLogin = () => {
    setIsForgot(false);
  };

  const handleResetPassword = async (data: FormData) => {
    if (!data.username) {
      alert("Por favor, ingresa tu correo electrónico");
      return;
    }

    setLoading(true);
    try {
      // Simular envío de link de restablecimiento
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("¡Se ha enviado un enlace para restablecer la contraseña!");
      setIsForgot(false);
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      alert("¡Ocurrió un error al restablecer la contraseña!");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex h-screen font-poppins text-tokyoNight-text">
  {/* Left Pane */}
  <div
    className="flex-1 relative bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://static.vecteezy.com/system/resources/previews/007/000/304/non_2x/cinema-auditorium-with-red-seats-and-white-blank-screen-vector.jpg')",
    }}
    aria-hidden="true"
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] via-[#8B0000] to-transparent opacity-60"></div>
  </div>

  {/* Right Pane */}
  <main className="flex-1 bg-gradient-to-br from-black to-[#2A2A2A] flex flex-col items-center justify-center p-8 relative overflow-y-auto">
    {/* Logo */}
    <div
      className="text-6xl font-bold text-white mb-8 animate-flicker"
      aria-label="CinePlex Logo"
    >
      🎬 CinePlex
    </div>

    {/* Form Container */}
    <div className="bg-[#1E1E1E] p-12 rounded-3xl w-full max-w-lg text-tokyoNight-text shadow-lg transition-all duration-500">
      {!isForgot ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="text-3xl font-bold text-white text-center mb-8">Iniciar Sesión</h2>

          {/* Email or Username Input */}
          <div
            className={`flex items-center bg-tokyoNight-bg rounded-lg px-6 py-4 mb-4 ${
              errors.username ? "border-2 border-[#215cec]" : ""
            }`}
          >
            <FaEnvelope
              className="text-[#215cec] mr-4"
              aria-hidden="true"
            />
            <input
              type="email"
              placeholder="Correo Electrónico o Username"
              {...register("username")}
              className="flex-1 bg-transparent focus:outline-none text-tokyoNight-text placeholder-tokyoNight-text"
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby={errors.username ? "email-error" : undefined}
            />
          </div>
          {errors.username && (
            <p id="email-error" className="text-[#215cec] text-sm mb-4">
              {errors.username.message}
            </p>
          )}

          {/* Password Input */}
          <div
            className={`relative flex items-center bg-tokyoNight-bg rounded-lg px-6 py-4 mb-4 ${
              errors.password ? "border-2 border-[#215cec]" : ""
            }`}
          >
            <FaLock
              className="text-[#215cec] mr-4"
              aria-hidden="true"
            />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Contraseña"
              {...register("password")}
              className="flex-1 bg-transparent focus:outline-none text-tokyoNight-text placeholder-tokyoNight-text"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#215cec] focus:outline-none"
              aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {passwordVisible ? (
                <FaLockOpen className="transition-transform duration-300 transform rotate-0" />
              ) : (
                <FaLock className="transition-transform duration-300 transform rotate-0" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-[#215cec] text-sm mb-4">
              {errors.password.message}
            </p>
          )}

          {/* Remember Me */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="mr-4 accent-[#215cec]"
            />
            <label htmlFor="remember" className="text-sm text-white">
              Recuérdame
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-lg bg-[#215cec] text-white font-semibold flex items-center justify-center relative transition-colors duration-300 ${
              loading ? "cursor-not-allowed" : "hover:bg-[#1A4FCC]"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="absolute left-4">
                <div className="w-5 h-5 border-2 border-white border-t-2 rounded-full animate-spin"></div>
              </div>
            ) : null}
            Iniciar Sesión
          </button>

          {/* Footer Links */}
          <div className="flex justify-between mt-8">
            <a
              href="#"
              onClick={handleForgotPassword}
              className="text-[#215cec] text-sm hover:text-[#1A4FCC] transition-colors duration-300"
            >
              ¿Olvidaste tu contraseña?
            </a>
            <a
              href="#"
              className="text-[#215cec] text-sm hover:text-[#1A4FCC] transition-colors duration-300"
            >
              Regístrate Ahora
            </a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handleResetPassword)} noValidate>
          <h2 className="text-3xl font-bold text-center mb-8">Restablecer Contraseña</h2>

          {/* Email Input */}
          <div
            className={`flex items-center bg-tokyoNight-bg rounded-lg px-6 py-4 mb-4 ${
              errors.username ? "border-2 border-[#215cec]" : ""
            }`}
          >
            <FaEnvelope
              className="text-[#215cec] mr-4"
              aria-hidden="true"
            />
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              {...register("username")}
              className="flex-1 bg-transparent focus:outline-none text-tokyoNight-text placeholder-tokyoNight-text"
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby={errors.username ? "reset-email-error" : undefined}
            />
          </div>
          {errors.username && (
            <p id="reset-email-error" className="text-[#215cec] text-sm mb-4">
              {errors.username.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-lg bg-[#215cec] text-white font-semibold flex items-center justify-center relative transition-colors duration-300 ${
              loading ? "cursor-not-allowed" : "hover:bg-[#1A4FCC]"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="absolute left-4">
                <div className="w-5 h-5 border-2 border-white border-t-2 rounded-full animate-spin"></div>
              </div>
            ) : null}
            Enviar Enlace
          </button>

          {/* Footer Links */}
          <div className="flex justify-center mt-8">
            <a
              href="#"
              onClick={handleBackToLogin}
              className="text-[#215cec] text-sm hover:text-[#1A4FCC] transition-colors duration-300"
            >
              Volver a Iniciar Sesión
            </a>
          </div>
        </form>
      )}
    </div>
  </main>
</div>

  );
};

export default LoginPage;
