import { create } from "zustand";

interface CanvasState {
  backgroundType: "color" | "image";
  backgroundValue: string;
  updateBackground: (newBackground: string, type: "color" | "image") => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  backgroundType: "image",
  backgroundValue: "url('./images/party-invitation-bg.webp')",
  updateBackground: (newBackground, type) =>
    set(() => ({ backgroundType: type, backgroundValue: newBackground })),
}));
