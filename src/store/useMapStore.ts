import { create } from "zustand";

interface MapState {
  selectedHectareId?: string;
  selectHectare: (id: string) => void;
  deselectHectare: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedHectareId: undefined,
  selectHectare: (id) => set({ selectedHectareId: id }),
  deselectHectare: () => set({ selectedHectareId: undefined }),
}));
