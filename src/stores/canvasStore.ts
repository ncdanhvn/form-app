import { create } from "zustand";
import { backgroundGallery } from "../resources/imageResources";

interface Background {
  type: "color" | "image";
  color: string;
  image: string;
  setBackgroundType: (type: "color" | "image") => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (image: string) => void;
}

interface Title {
  backgroundColor: string;
  setTitleBgColor: (color: string) => void;
}

interface SubmitButton {
  bgColor: string;
  setBgColor: (color: string) => void;
}

interface CanvasState {
  background: Background;
  title: Title;
  submitButton: SubmitButton;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  background: {
    color: "#ffffff",
    image: backgroundGallery[0],
    type: "image",
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
  },

  title: {
    backgroundColor: "#D53F8C",
    setTitleBgColor: (backgroundColor) =>
      set(({ title }) => ({
        title: { ...title, backgroundColor },
      })),
  },

  submitButton: {
    bgColor: "#D53F8C",
    setBgColor: (bgColor) =>
      set(({ submitButton }) => ({
        submitButton: { ...submitButton, bgColor },
      })),
  },
}));

export default useCanvasStore;
