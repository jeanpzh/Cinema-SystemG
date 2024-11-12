// ModalFormularioFunciones.tsx
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Funcion } from "@/constants/table";
import { obtenerOpciones } from "@/api/funciones";
import { PeliculaOpcion, SalaOpcion, HorarioOpcion } from "@/constants/options";
import { Dropdown } from "primereact/dropdown";
import CustomButton from '@/components/Button';


interface Props {
  visible: boolean;
  onHide: () => void;
  onAdd: (data: Funcion) => void;
  funcion?: Funcion;
}

const ModalFormularioFunciones: React.FC<Props> = ({
  visible,
  onHide,
  onAdd,
  funcion,
}) => {
  const [codigoPelicula, setCodigoPelicula] = useState("");
  const [codigoSala, setCodigoSala] = useState("");
  const [codigoHorario, setCodigoHorario] = useState("");
  const [peliculas, setPeliculas] = useState<PeliculaOpcion[]>([]);
  const [salas, setSalas] = useState<SalaOpcion[]>([]);
  const [horarios, setHorarios] = useState<HorarioOpcion[]>([]);

  useEffect(() => {
    async function fetchOpciones() {
      try {
        const opciones = await obtenerOpciones();
        setPeliculas(opciones.peliculas);
        setSalas(opciones.salas);
        setHorarios(opciones.horarios);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOpciones();
  }, []);

  useEffect(() => {
    if (funcion) {
      setCodigoPelicula(funcion.Codigo_Pelicula);
      setCodigoSala(funcion.Codigo_Sala);
      setCodigoHorario(funcion.Codigo_Horario);
    } else {
      setCodigoPelicula("");
      setCodigoSala("");
      setCodigoHorario("");
    }
  }, [funcion]);

  // Función para manejar el cierre del modal
  const handleOnHide = () => {
    // Aquí puedes agregar cualquier lógica adicional antes de cerrar el modal
    resetForm(); // Resetear el formulario si lo necesitas
    onHide(); // Llamar a la función onHide pasada como prop
  };

  const resetForm = () => {
    setCodigoPelicula("");
    setCodigoSala("");
    setCodigoHorario("");
  };

  const handleSubmit = () => {
    const newFuncion: Funcion = {
      Codigo_Funcion: funcion ? funcion.Codigo_Funcion : "",
      Codigo_Pelicula: codigoPelicula,
      Codigo_Sala: codigoSala,
      Codigo_Horario: codigoHorario,
    };
    onAdd(newFuncion);
    handleOnHide(); // Usar handleOnHide para manejar el cierre
  };


  return (
    <Dialog
      header={funcion ? "Editar Función" : "Agregar Función"}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
      breakpoints={{ "960px": "95vw" }}
      className="p-0"
      modal
      dismissableMask
    >
      <div className="flex flex-col h-full p-6 overflow-y-auto bg-white space-y-6">
        {/* Película */}
        <div>
          <label
            htmlFor="pelicula"
            className="block text-sm font-medium text-gray-700"
          >
            Película
          </label>
          <Dropdown
            id="pelicula"
            value={codigoPelicula}
            options={peliculas}
            onChange={(e) => setCodigoPelicula(e.value)}
            optionLabel="Nombre_Pelicula"
            optionValue="Codigo_Pelicula"
            placeholder="Seleccione una película"
            className={`mt-1  w-full ${
              !codigoPelicula ? "border-gray-300" : "border-blue-500"
            }`}
            required
          />
        </div>

        {/* Sala */}
        <div>
          <label
            htmlFor="sala"
            className="block text-sm font-medium text-gray-700"
          >
            Sala
          </label>
          <Dropdown
            id="sala"
            value={codigoSala}
            options={salas}
            onChange={(e) => setCodigoSala(e.value)}
            optionLabel="Nombre"
            optionValue="Codigo_Sala"
            placeholder="Seleccione una sala"
            className={`mt-1 w-full ${
              !codigoSala ? "border-gray-300" : "border-blue-500"
            }`}
            required
          />
        </div>

        {/* Horario */}
        <div>
          <label
            htmlFor="horario"
            className="block text-sm font-medium text-gray-700"
          >
            Horario
          </label>
          <Dropdown
            id="horario"
            value={codigoHorario}
            options={horarios}
            onChange={(e) => setCodigoHorario(e.value)}
            optionLabel="Hora_Inicio"
            optionValue="Codigo_Horario"
            placeholder="Seleccione un horario"
            className="mt-1  w-full"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          {/* Botón de Cancelar */}
          <CustomButton buttonType="cancel" onClick={handleOnHide}>
            Cancelar
          </CustomButton>

          {/* Botón de Aceptar */}
          <CustomButton buttonType="accept" onClick={handleSubmit}>
            Aceptar
          </CustomButton>
        </div>

      </div>
    </Dialog>
  );
};

export default ModalFormularioFunciones;
