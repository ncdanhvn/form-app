export enum InputType {
  MultiChoices = "Multi Choices",
  Checkbox = "Checkbox",
  Dropdown = "Dropdown",
  ShortAnswer = "Short Answer",
  Paragraph = "Paragraph Answer",
}

export interface Question {
  questionNumber: number;
  question: string;
  inputType: InputType;
  options: string[];
  other?: string;
}
