import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Opciones } from "@/constants/models";

interface Funcion {
  Codigo_Funcion: string;
  Codigo_Pelicula: string;
  Codigo_Horario: string;
  Codigo_Sala: string;
}

interface ModalAEFuncionProps {
  funcionActual?: Funcion;
  handleSubmit: (data: Funcion) => void;
  type: string;
  isLoading?: boolean;
  peliculaOpcion?: Opciones["peliculaOpcion"];
  salaOpcion?: Opciones["salaOpcion"];
  horarioOpcion?: Opciones["horarioOpcion"];
}

const ModalAEFuncion: React.FC<ModalAEFuncionProps> = ({
  funcionActual,
  handleSubmit,
  type,

  peliculaOpcion,
  salaOpcion,
  horarioOpcion,
}) => {
  const {
    handleSubmit: handleFormSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Funcion>({
    defaultValues: funcionActual || {},
  });

  useEffect(() => {
    if (type.toLowerCase() === "agregar") {
      reset({});
    } else {
      reset(funcionActual || {});
    }
  }, [funcionActual, reset, type]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{type}</DialogTitle>
        <DialogClose asChild>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </DialogClose>
      </DialogHeader>
      <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="Codigo_Pelicula">Película</Label>
          <Select onValueChange={(value) => setValue("Codigo_Pelicula", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una película" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Películas</SelectLabel>
                {peliculaOpcion?.map((pelicula) => (
                  <SelectItem
                    key={pelicula.Codigo_Pelicula}
                    value={pelicula.Codigo_Pelicula}
                  >
                    {pelicula.Nombre_Pelicula}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.Codigo_Pelicula && (
            <span className="text-red-500 text-sm">
              {errors.Codigo_Pelicula.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Codigo_Horario">Horario</Label>
          <Select onValueChange={(value) => setValue("Codigo_Horario", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un horario" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Horarios</SelectLabel>
                {horarioOpcion?.map((horario) => (
                  <SelectItem
                    key={horario.Codigo_Horario}
                    value={horario.Codigo_Horario}
                  >
                    {horario.Hora_Inicio}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.Codigo_Horario && (
            <span className="text-red-500 text-sm">
              {errors.Codigo_Horario.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="Codigo_Sala">Sala</Label>
          <Select onValueChange={(value) => setValue("Codigo_Sala", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una sala" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Salas</SelectLabel>
                {salaOpcion?.map((sala) => (
                  <SelectItem key={sala.Codigo_Sala} value={sala.Codigo_Sala}>
                    {sala.Nombre} | {sala.Capacidad}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.Codigo_Sala && (
            <span className="text-red-500 text-sm">
              {errors.Codigo_Sala.message}
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

export default ModalAEFuncion;
