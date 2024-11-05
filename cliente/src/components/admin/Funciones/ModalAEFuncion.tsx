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
  SelectItem,
} from "@/components/ui/select";
import { Funcion, Opciones } from "@/constants/models";
import CustomSelectContent from "@/components/common/CustomSelectContent";

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
        <DialogClose asChild/>
      </DialogHeader>
      <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="Codigo_Pelicula">Película</Label>
          <Select onValueChange={(value) => setValue("Codigo_Pelicula", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una película" />
            </SelectTrigger>
            <CustomSelectContent label="Películas">
              {peliculaOpcion?.map((pelicula) => (
                <SelectItem
                  key={pelicula.Codigo_Pelicula}
                  value={pelicula.Codigo_Pelicula}
                >
                  {pelicula.Nombre_Pelicula}
                </SelectItem>
              ))}
            </CustomSelectContent>
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
            <CustomSelectContent label="Horarios">
              {horarioOpcion?.map((horario) => (
                <SelectItem
                  key={horario.Codigo_Horario}
                  value={horario.Codigo_Horario}
                >
                  {horario.Hora_Inicio}
                </SelectItem>
              ))}
            </CustomSelectContent>
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
            <CustomSelectContent label="Sala">
              {salaOpcion?.map((sala) => (
                <SelectItem key={sala.Codigo_Sala} value={sala.Codigo_Sala}>
                  {sala.Nombre} | {sala.Capacidad}
                </SelectItem>
              ))}
            </CustomSelectContent>
          </Select>
        </div>

        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-blue-600 text-white">
            {type.toLowerCase() === "editar" ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default ModalAEFuncion;
