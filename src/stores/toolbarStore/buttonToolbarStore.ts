import { create } from "zustand";
import ToolbarState, { Align } from "./toolbarTypes";

export const useButtonToolbarStore = create<ToolbarState>((set) => ({
  bold: false,
  setBold: (bold) => set(() => ({ bold })),

  italic: false,
  setItalic: (italic) => set(() => ({ italic })),

  underline: false,
  setUnderline: (underline) => set(() => ({ underline })),

  align: Align.Center,
  setAlign: (align) => set(() => ({ align })),

  fontSize: 16,
  setFontSize: (fontSize) => set(() => ({ fontSize })),

  fontFamily: "Arial",
  setFontFamily: (fontFamily) => set(() => ({ fontFamily })),

  textColor: "#ffffff",
  setTextColor: (textColor) => set(() => ({ textColor })),
}));

export default useButtonToolbarStore;
