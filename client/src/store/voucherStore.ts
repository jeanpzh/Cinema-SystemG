import { create } from "zustand";

export type Voucher = {
  Codigo_Voucher_Pago: string;
};

type State = {
  voucher: null | Voucher;
};

type Actions = {
  setVoucher: (voucher: Voucher) => void;
};

export const useVoucherStore = create<State & Actions>((set) => ({
  voucher: null,
  setVoucher: (voucher) => set({ voucher }),
}));
