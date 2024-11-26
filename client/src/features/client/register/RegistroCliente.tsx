/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";

import { Film, User, Mail, Lock, AtSign, Phone } from "lucide-react";
import { useCliente } from "@/hooks/useCrud";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RegistroCliente() {
  const navigate = useNavigate();
  const { createItem: crear_cliente } = useCliente();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      const res = await crear_cliente({
        nombre: name,
        correo: email,
        username: username,
        telefono: parseInt(phone),
        password: password,
      });

      if (res.status === 200)
        setTimeout(() => {
          setShowModal(true);
        }, 1500);
    } catch (error: any) {
      if (error.response.status === 400) {
        alert("El email ya está registrado");
      }
    }
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4`}
    >
      <div className="max-w-4xl w-full bg-black/30 p-8 rounded-lg backdrop-blur-sm shadow-2xl animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="text-white space-y-6">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 animate-pulse">
              Cine Club
            </h1>
            <p className="text-lg">
              Únete a nuestra comunidad de amantes del cine. Descubre nuevas
              películas, comparte tus opiniones y conecta con otros cinéfilos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm animate-float">
                <h3 className="font-semibold text-yellow-400">
                  Acceso Exclusivo
                </h3>
                <p className="text-sm">A estrenos y eventos especiales</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm animate-float animation-delay-200">
                <h3 className="font-semibold text-yellow-400">
                  Reseñas Detalladas
                </h3>
                <p className="text-sm">
                  Comparte tus opiniones con la comunidad
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 animate-slideUp">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nombre
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Correo electrónico
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Nombre de usuario
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Tu nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />
                <AtSign
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Teléfono
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white"
                />

                {error && (
                  <p className="text-red-500 text-pretty">
                    Las contraseñas no coinciden
                  </p>
                )}
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={18}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              <Film className="mr-2 h-4 w-4" /> Unirse al Cine Club
            </Button>
          </form>
        </div>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
          <DialogHeader>
            <DialogTitle>¡Registro Exitoso!</DialogTitle>
            <DialogDescription className="text-gray-300">
              Tu cuenta ha sido creada con éxito. ¿Qué te gustaría hacer ahora?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              onClick={() => {
                setShowModal(false);
                navigate("/login");
              }}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-900"
            >
              Ir a Login
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-white"
            >
              Ir a Inicio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
