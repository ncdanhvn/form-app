export enum Align {
  Left = "left",
  Center = "center",
  Right = "right",
}

export default interface ToolbarState {
  bold: boolean;
  setBold: (bold: boolean) => void;

  italic: boolean;
  setItalic: (italic: boolean) => void;

  underline: boolean;
  setUnderline: (underline: boolean) => void;

  align: Align;
  setAlign: (align: Align) => void;

  fontSize: number;
  setFontSize: (fontsize: number) => void;

  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;

  textColor: string;
  setTextColor: (textColor: string) => void;
}
