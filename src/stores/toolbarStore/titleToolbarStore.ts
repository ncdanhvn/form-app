import { create } from "zustand";
import ToolbarState, { Align } from "./toolbarTypes";

export const useTitleToolbarStore = create<ToolbarState>((set) => ({
  bold: false,
  setBold: (bold) => set(() => ({ bold })),

  italic: false,
  setItalic: (italic) => set(() => ({ italic })),

  underline: false,
  setUnderline: (underline) => set(() => ({ underline })),

  align: Align.Center,
  setAlign: (align) => set(() => ({ align })),

  fontSize: 36,
  setFontSize: (fontSize) => set(() => ({ fontSize })),

  fontFamily: "Grape Nuts",
  setFontFamily: (fontFamily) => set(() => ({ fontFamily })),

  textColor: "#ffffff",
  setTextColor: (textColor) => set(() => ({ textColor })),
}));

export default useTitleToolbarStore;
