import { create } from "zustand";
import ToolbarState, { Align } from "./toolbarTypes";

export const useDescriptionToolbarStore = create<ToolbarState>((set) => ({
  bold: false,
  setBold: (bold) => set(() => ({ bold })),

  italic: false,
  setItalic: (italic) => set(() => ({ italic })),

  underline: false,
  setUnderline: (underline) => set(() => ({ underline })),

  align: Align.Center,
  setAlign: (align) => set(() => ({ align })),

  fontSize: 20,
  setFontSize: (fontSize) => set(() => ({ fontSize })),

  fontFamily: "Times New Roman",
  setFontFamily: (fontFamily) => set(() => ({ fontFamily })),

  textColor: "#5FAD0A",
  setTextColor: (textColor) => set(() => ({ textColor })),
}));

export default useDescriptionToolbarStore;
