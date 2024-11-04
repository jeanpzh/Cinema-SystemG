// ModalAEPelicula.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pelicula } from "@/constants/models";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ModalAEPeliculaProps {
  peliculaActual?: Pelicula;
  handleSubmit: (data: Pelicula) => void;
  type: string;
  isLoading?: boolean;
}

const ModalAEPelicula: React.FC<ModalAEPeliculaProps> = ({
  peliculaActual,
  handleSubmit,
  type,
  isLoading,
}) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm<Pelicula>({
    defaultValues: peliculaActual || {},
  });

  useEffect(() => {
    if (type.toLowerCase() === "agregar") {
      reset({});
    } else {
      reset(peliculaActual || {});
    }
  }, [peliculaActual, reset, type]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{type}</DialogTitle>
        <DialogClose asChild />
      </DialogHeader>
      <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="Nombre_Pelicula">Nombre de la Película</Label>
          <Input
            id="Nombre_Pelicula"
            {...register("Nombre_Pelicula", {
              required: "Este campo es requerido",
            })}
            type="text"
            className="mt-1 block w-full"
          />
          {errors.Nombre_Pelicula && (
            <span className="text-red-500 text-sm">
              {errors.Nombre_Pelicula.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Clasificacion">Clasificación</Label>
          <Input
            id="Clasificacion"
            {...register("Clasificacion", {
              required: "Este campo es requerido",
            })}
            type="text"
            className="mt-1 block w-full"
          />
          {errors.Clasificacion && (
            <span className="text-red-500 text-sm">
              {errors.Clasificacion.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Duracion">Duración (min)</Label>
          <Input
            id="Duracion"
            {...register("Duracion", {
              required: "Este campo es requerido",
              valueAsNumber: true,
              min: { value: 1, message: "Debe ser al menos 1 minuto" },
            })}
            type="number"
            className="mt-1 block w-full"
          />
          {errors.Duracion && (
            <span className="text-red-500 text-sm">
              {errors.Duracion.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Genero">Género</Label>
          <Input
            id="Genero"
            {...register("Genero", {
              required: "Este campo es requerido",
            })}
            type="text"
            className="mt-1 block w-full"
          />
          {errors.Genero && (
            <span className="text-red-500 text-sm">
              {errors.Genero.message}
            </span>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-blue-600 text-white">
            {type === "Editar" ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default ModalAEPelicula;
