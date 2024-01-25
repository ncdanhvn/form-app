import { create } from "zustand";
import { backgroundGallery } from "../resources/imageResources";

interface Background {
  type: "color" | "image";
  color: string;
  image: string;
}

interface FormTitle {
  backgroundColor: string;
}

interface CanvasState {
  background: Background;
  setBackgroundType: (type: "color" | "image") => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (image: string) => void;

  formTitle: FormTitle;
  setFormTitleBg: (color: string) => void;
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

  formTitle: { backgroundColor: "#D53F8C" },
  setFormTitleBg: (backgroundColor) =>
    set(({ formTitle }) => ({ formTitle: { ...formTitle, backgroundColor } })),
}));

export default useCanvasStore;
