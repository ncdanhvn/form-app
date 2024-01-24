export enum InputType {
  MultiChoices = "Multi Choices",
  Checkbox = "Checkbox",
  Dropdown = "Dropdown",
  ShortAnswer = "Short Answer",
  Paragraph = "Paragraph Answer",
}

export interface Question {
  questionUid: string;
  questionNumber: number;
  question: string;
  inputType: InputType;
  options: string[];
  other: boolean;
  required: boolean;
}
