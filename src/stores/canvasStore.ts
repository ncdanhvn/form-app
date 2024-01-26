import { create } from "zustand";
import { backgroundGallery } from "../resources/imageResources";

interface Background {
  type: "color" | "image";
  color: string;
  image: string;
}

interface Title {
  backgroundColor: string;
  isBold: boolean;
}

interface CanvasState {
  background: Background;
  setBackgroundType: (type: "color" | "image") => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (image: string) => void;

  title: Title;
  setTitleBgColor: (color: string) => void;
  setTitleIsBold: (isBold: boolean) => void;
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

  title: { backgroundColor: "#D53F8C", isBold: false },
  setTitleBgColor: (backgroundColor) =>
    set(({ title }) => ({
      title: { ...title, backgroundColor },
    })),
  setTitleIsBold: (isBold) =>
    set(({ title }) => ({
      title: { ...title, isBold },
    })),
}));

export default useCanvasStore;
