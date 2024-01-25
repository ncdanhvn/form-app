import { create } from "zustand";
import { backgroundGallery } from "../resources/imageResources";

interface Background {
  type: "color" | "image";
  color: string;
  image: string;
}

interface CanvasState {
  background: Background;
  setBackgroundType: (type: "color" | "image") => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (image: string) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  background: {
    color: "#ffffff",
    image: backgroundGallery[0],
    type: "image",
  },
  setBackgroundType: (type) =>
    set(({ background }) => ({ background: { ...background, type } })),
  setBackgroundColor: (color) =>
    set(({ background }) => ({
      background: { ...background, color },
    })),
  setBackgroundImage: (image) =>
    set(({ background }) => ({
      background: { ...background, image },
    })),
}));
