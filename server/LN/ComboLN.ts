// ComboLN.ts

import { ComboDA } from "../acessData/ComboDA";
import Combo from "../models/Combo";
import DetalleCombo from "../models/DetalleCombo";

class ComboLN {
  async obtenerCombosLN(): Promise<any[]> {
    return await new ComboDA().obtenerCombosDA();
  }

  async añadirComboLN(comboData: any): Promise<any> {
    const detalles = comboData.Detalles.map(
      (detalle: any) =>
        new DetalleCombo(detalle.Codigo_Producto, detalle.Cantidad)
    );

    const combo = new Combo(
      comboData.Codigo_Combo,
      comboData.Nombre_Combo,
      comboData.Descripcion,
      comboData.Precio,
      comboData.Imagen_Combo,
      detalles
    );

    return await new ComboDA().añadirComboDA(combo);
  }

  async obtenerComboIDLN(id: string): Promise<any> {
    return await new ComboDA().obtenerComboPorIDDA(id);
  }

  async actualizarComboLN(comboData: any): Promise<any> {
    const detalles = comboData.Detalles.map(
      (detalle: any) =>
        new DetalleCombo(detalle.Codigo_Producto, detalle.Cantidad)
    );

    const combo = new Combo(
      comboData.Codigo_Combo,
      comboData.Nombre_Combo,
      comboData.Descripcion,
      comboData.Precio,
      comboData.Imagen_Combo || "", 
      detalles
    );

    return await new ComboDA().actualizarComboDA(combo);
  }

  async eliminarComboLN(id: string): Promise<void> {
    await new ComboDA().eliminarComboDA(id);
  }

  async obtenerOpcionesLN(): Promise<any> {
    return await new ComboDA().obtenerOpcionesComboDA();
  }
}

export default ComboLN;
