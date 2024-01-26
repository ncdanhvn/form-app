import { create } from "zustand";
import { backgroundGallery } from "../resources/imageResources";
import { Align } from "../types/canvas";

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

  isBold: boolean;
  setTitleIsBold: (isBold: boolean) => void;

  isItalic: boolean;
  setTitleIsItalic: (isItalic: boolean) => void;

  isUnderline: boolean;
  setTitleIsUnderline: (isUnderline: boolean) => void;

  align: Align;
  setTitleAlign: (align: Align) => void;

  fontSize: number;
  setFontSize: (fontsize: number) => void;

  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;

  textColor: string;
  setTextColor: (textColor: string) => void;
}

interface CanvasState {
  background: Background;
  title: Title;
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

    isBold: false,
    setTitleIsBold: (isBold) =>
      set(({ title }) => ({
        title: { ...title, isBold },
      })),

    isItalic: false,
    setTitleIsItalic: (isItalic) =>
      set(({ title }) => ({
        title: { ...title, isItalic },
      })),

    isUnderline: false,
    setTitleIsUnderline: (isUnderline) =>
      set(({ title }) => ({
        title: { ...title, isUnderline },
      })),

    align: Align.Center,
    setTitleAlign: (align) =>
      set(({ title }) => ({
        title: { ...title, align },
      })),

    fontSize: 36,
    setFontSize: (fontSize) =>
      set(({ title }) => ({
        title: { ...title, fontSize },
      })),

    fontFamily: "Grape Nuts",
    setFontFamily: (fontFamily) =>
      set(({ title }) => ({
        title: { ...title, fontFamily },
      })),

    textColor: "#ffffff",
    setTextColor: (textColor) =>
      set(({ title }) => ({
        title: { ...title, textColor },
      })),
  },
}));

export default useCanvasStore;
