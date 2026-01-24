import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IHectare } from "@domain";

interface CartState {
  items: IHectare[];
  addItem: (item: IHectare) => void;
  removeItem: (_id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (item) =>
        set((state) => {
          const exists = state.items.find((i) => i._id === item._id);

          if (exists) {
            return { isCartOpen: true };
          }

          const newItems = [...state.items, item];
          const newTotalPrice = newItems.reduce(
            (total, currentItem) => total + currentItem.value,
            0,
          );

          return {
            items: newItems,
            totalItems: newItems.length,
            totalPrice: newTotalPrice,
            isCartOpen: true,
          };
        }),

      removeItem: (_id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item._id !== _id);
          const newTotalPrice = newItems.reduce(
            (total, currentItem) => total + currentItem.value,
            0,
          );

          return {
            items: newItems,
            totalItems: newItems.length,
            totalPrice: newTotalPrice,
          };
        }),

      clearCart: () =>
        set({ items: [], totalItems: 0, totalPrice: 0, isCartOpen: false }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
