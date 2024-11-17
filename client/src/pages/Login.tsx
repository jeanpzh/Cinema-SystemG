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
        className="flex-1 relative bg-cover bg-center filter blur-md"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/026/427/810/small_2x/a-row-of-red-seats-in-front-of-a-projector-screen-ai-generated-photo.jpg')",
        }}
        aria-hidden="true"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-tokyoNight-bg/80"></div>
      </div>

      {/* Right Pane */}
      <main className="flex-1 bg-gradient-to-br from-tokyoNight-bg to-[#2c2e3e] flex flex-col items-center justify-center p-8 relative overflow-y-auto">
        {/* Logo */}
        <div
          className="text-3xl text-tokyoNight-primary mb-8 animate-flicker"
          aria-label="CinePlex Logo"
        >
          🎬 CinePlex
        </div>

        {/* Form Container */}
        <div className="bg-tokyoNight-inputBg p-8 rounded-2xl w-full max-w-md text-tokyoNight-text shadow-lg transition-all duration-500">
          {!isForgot ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h2 className="text-2xl font-semibold text-center mb-6">
                Iniciar Sesión
              </h2>

              {/* Email or Username Input */}
              <div
                className={`flex items-center bg-tokyoNight-bg rounded-lg px-4 py-3 mb-3 ${
                  errors.username ? "border-2 border-tokyoNight-accent" : ""
                }`}
              >
                <FaEnvelope
                  className="text-tokyoNight-primary mr-3"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Correo Electrónico o Username"
                  {...register("username")}
                  className="flex-1 focus:bg-tokyoNight-bg bg-tokyoNight-bg text-tokyoNight-text placeholder-tokyoNight-text border-none focus:outline-none focus:ring-0"
                  aria-invalid={errors.username ? "true" : "false"}
                  aria-describedby={errors.username ? "email-error" : undefined}
                />
              </div>
              {errors.username && (
                <p
                  id="email-error"
                  className="text-tokyoNight-accent text-sm mb-3"
                >
                  {errors.username.message}
                </p>
              )}

              {/* Password Input */}
              <div
                className={`relative flex items-center bg-tokyoNight-bg rounded-lg px-4 py-3 mb-3 ${
                  errors.password ? "border-2 border-tokyoNight-accent" : ""
                }`}
              >
                <FaLock
                  className="text-tokyoNight-primary mr-3"
                  aria-hidden="true"
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Contraseña"
                  {...register("password")}
                  className="flex-1 bg-transparent focus:outline-none text-tokyoNight-text placeholder-tokyoNight-text"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tokyoNight-primary focus:outline-none"
                  aria-label={
                    passwordVisible
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {passwordVisible ? (
                    <FaLockOpen className="transition-transform duration-300 transform rotate-0" />
                  ) : (
                    <FaLock className="transition-transform duration-300 transform rotate-0" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="text-tokyoNight-accent text-sm mb-3"
                >
                  {errors.password.message}
                </p>
              )}

              {/* Remember Me */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="remember"
                  {...register("remember")}
                  className="mr-2 accent-tokyoNight-primary"
                />
                <label htmlFor="remember" className="text-sm">
                  Recuérdame
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-lg bg-tokyoNight-buttonPrimary text-tokyoNight-bg font-semibold flex items-center justify-center relative transition-colors duration-300 ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:bg-tokyoNight-secondary"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="absolute left-4">
                    <div className="w-4 h-4 border-2 border-tokyoNight-bg border-t-2 rounded-full animate-spin"></div>
                  </div>
                ) : null}
                Iniciar Sesión
              </button>

              {/* Footer Links */}
              <div className="flex justify-between mt-6">
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-tokyoNight-primary text-sm hover:text-tokyoNight-secondary transition-colors duration-300"
                >
                  ¿Olvidaste tu contraseña?
                </a>
                <a
                  href="#"
                  className="text-tokyoNight-primary text-sm hover:text-tokyoNight-secondary transition-colors duration-300"
                >
                  Regístrate Ahora
                </a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleResetPassword)} noValidate>
              <h2 className="text-2xl font-semibold text-center mb-6">
                Restablecer Contraseña
              </h2>

              {/* Email Input */}
              <div
                className={`flex items-center bg-tokyoNight-bg rounded-lg px-4 py-3 mb-3 ${
                  errors.username ? "border-2 border-tokyoNight-accent" : ""
                }`}
              >
                <FaEnvelope
                  className="text-tokyoNight-primary mr-3"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  {...register("username")}
                  className="flex-1 bg-transparent focus:outline-none text-tokyoNight-text placeholder-tokyoNight-text"
                  aria-invalid={errors.username ? "true" : "false"}
                  aria-describedby={
                    errors.username ? "reset-email-error" : undefined
                  }
                />
              </div>
              {errors.username && (
                <p
                  id="reset-email-error"
                  className="text-tokyoNight-accent text-sm mb-3"
                >
                  {errors.username.message}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-lg bg-tokyoNight-buttonPrimary text-tokyoNight-bg font-semibold flex items-center justify-center relative transition-colors duration-300 ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:bg-tokyoNight-secondary"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="absolute left-4">
                    <div className="w-4 h-4 border-2 border-tokyoNight-bg border-t-2 rounded-full animate-spin"></div>
                  </div>
                ) : null}
                Enviar Enlace
              </button>

              {/* Footer Links */}
              <div className="flex justify-center mt-6">
                <a
                  href="#"
                  onClick={handleBackToLogin}
                  className="text-tokyoNight-primary text-sm hover:text-tokyoNight-secondary transition-colors duration-300"
                >
                  Volver a Iniciar Sesión
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 w-full text-center text-tokyoNight-text text-sm">
          &copy; {new Date().getFullYear()} CinePlex. Todos los derechos
          reservados.
        </footer>
      </main>
    </div>
  );
};

export default LoginPage;
