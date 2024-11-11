import { Request, Response } from "express";
import ComboLN from "../LN/ComboLN";
import { randomUUID } from "crypto";

export const obtenerCombos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const combos = await new ComboLN().obtenerCombosLN();
    res.status(200).json(combos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los combos" });
  }
};

export const añadirCombo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { Nombre_Combo, Descripcion, Precio, Imagen_Combo, Detalles } =
      req.body;
    
    const comboData = {
      Codigo_Combo: randomUUID(),
      Nombre_Combo,
      Descripcion,
      Precio,
      Imagen_Combo,
      Detalles,
    };

    const comboAgregado = await new ComboLN().añadirComboLN(comboData);
    res.status(201).json(comboAgregado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el combo" });
  }
};

export const obtenerComboPorID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const combo = await new ComboLN().obtenerComboIDLN(id);
    res.status(200).json(combo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el combo" });
  }
};

export const actualizarCombo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const { Nombre_Combo, Descripcion, Precio, Imagen_Combo, Detalles } =
      req.body;

    const comboData = {
      Codigo_Combo: id,
      Nombre_Combo,
      Descripcion,
      Precio,
      Imagen_Combo,
      Detalles,
    };

    const comboActualizado = await new ComboLN().actualizarComboLN(comboData);
    res.status(200).json(comboActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el combo" });
  }
};

export const eliminarCombo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await new ComboLN().eliminarComboLN(id);
    res.status(200).json({ message: "Combo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el combo" });
  }
};

export const obtenerOpcionesCombo = async (
  _: Request,
  res: Response
): Promise<any> => {
  try {
    const opciones = await new ComboLN().obtenerOpcionesLN();
    res.status(200).json(opciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las opciones del combo" });
  }
};
