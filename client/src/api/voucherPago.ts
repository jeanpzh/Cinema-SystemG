/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pelicula } from "@/constants/table";
import { FuncionElegida } from "@/features/client/seleccionar_funcion/DetallesPelicula";
import { Combo } from "@/store/comboStore";
import { Entrada } from "@/store/entradaStore";
import { User } from "@/store/loginStore";
import { Producto } from "@/store/productoStore";
import axios from "axios";

interface VoucherPago {
  cliente: User;
  pelicula: Pelicula;
  funcion: FuncionElegida;
  entradas: Entrada[];
  productos: Producto[];
  combos: Combo[];
  formaPago: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const generar_voucher = async (data: VoucherPago): Promise<any> => {
  return await axios.post(`${apiUrl}/comprar-entrada`, data);
};

export const obtenerVoucher = async (id: string) => {
  return await axios.get(`${apiUrl}/comprar-entrada/${id}`);
};
