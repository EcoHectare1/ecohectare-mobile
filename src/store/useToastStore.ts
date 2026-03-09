import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  toastId: number;
  show: (message: string, type?: ToastType, duration?: number) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: "",
  type: "info",
  duration: 3000,
  toastId: 0,
  show: (message, type = "info", duration = 3000) =>
    set((state) => ({
      visible: true,
      message,
      type,
      duration,
      toastId: state.toastId + 1,
    })),
  hide: () => set({ visible: false }),
}));
