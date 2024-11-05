// ModalAEPelicula.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Pelicula,
  MOCK_OPTIONS_PELICULAS_GENEROS,
  CLASIFICACION_OPTIONS,
} from "@/constants/models";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import CustomSelectContent from "@/components/common/CustomSelectContent";

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
    setValue,
    formState: { errors },
  } = useForm<Pelicula>({
    defaultValues: peliculaActual || {},
  });

  useEffect(() => {
    if (type.toLowerCase() === "agregar") reset({});
    else reset(peliculaActual || {});
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
          <Label htmlFor="Nombre_Pelicula">Película</Label>
          <Input
            {...register("Nombre_Pelicula", {
              required: "Este campo es requerido",
            })}
            type="text"
            className="mt-1 block w-full"
          />
          {errors.Codigo_Pelicula && (
            <span className="text-red-500 text-sm">
              {errors.Codigo_Pelicula.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Genero">Género</Label>
          <Select onValueChange={(value) => setValue("Genero", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un género" />
            </SelectTrigger>
            <CustomSelectContent label="Géneros">
              {MOCK_OPTIONS_PELICULAS_GENEROS.map((genero) => (
                <SelectItem key={genero.value} value={genero.value}>
                  {genero.label}
                </SelectItem>
              ))}
            </CustomSelectContent>
          </Select>
          {errors.Genero && (
            <span className="text-red-500 text-sm">
              {errors.Genero.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Clasificacion">Clasificación</Label>
          <Select onValueChange={(value) => setValue("Clasificacion", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una clasificación" />
            </SelectTrigger>
            <CustomSelectContent label="Clasificaciones">
              {CLASIFICACION_OPTIONS.map((clasificacion) => (
                <SelectItem
                  key={clasificacion.value}
                  value={clasificacion.value}
                >
                  {clasificacion.label}
                </SelectItem>
              ))}
            </CustomSelectContent>
          </Select>
          {errors.Clasificacion && (
            <span className="text-red-500 text-sm">
              {errors.Clasificacion.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Duracion">Duración (min)</Label>
          <Input
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
          <Label htmlFor="Sinopsis">Sinopsis</Label>
          <Input
            {...register("Sinopsis", {
              required: "Este campo es requerido",
            })}
            type="text"
            className="mt-1 block w-full"
          />
          {errors.Sinopsis && (
            <span className="text-red-500 text-sm">
              {errors.Sinopsis.message}
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
