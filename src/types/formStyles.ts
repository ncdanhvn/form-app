import { Align } from "../stores/toolbarStore/toolbarTypes";

interface ToolbarAttributes {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: Align;
  color: string;
  size: number;
  font: string;
}

export interface FormStyles {
  background: {
    type: "image" | "color";
    color: string;
    image: string;
  };
  titleBgColor: string;
  titleText: ToolbarAttributes;
  descriptionText: ToolbarAttributes;
  questionsText: ToolbarAttributes;
  buttonBgColor: string;
  buttonText: ToolbarAttributes;
}
