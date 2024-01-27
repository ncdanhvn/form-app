import { create } from "zustand";
import ToolbarState, { Align } from "./toolbarTypes";

export const useQuestionToolbarStore = create<ToolbarState>((set) => ({
  bold: true,
  setBold: (bold) => set(() => ({ bold })),

  italic: false,
  setItalic: (italic) => set(() => ({ italic })),

  underline: false,
  setUnderline: (underline) => set(() => ({ underline })),

  align: Align.Left,
  setAlign: (align) => set(() => ({ align })),

  fontSize: 16,
  setFontSize: (fontSize) => set(() => ({ fontSize })),

  fontFamily: "Arial",
  setFontFamily: (fontFamily) => set(() => ({ fontFamily })),

  textColor: "#000000",
  setTextColor: (textColor) => set(() => ({ textColor })),
}));

export default useQuestionToolbarStore;
