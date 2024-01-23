export enum InputType {
  Checkbox = "Checkbox",
  ShortAnswer = "Short Answer",
  Paragraph = "Paragraph Answer",
  MultiChoices = "Multi Choices",
  Dropdown = "Dropdown",
}

export interface Question {
  questionNumber: number;
  question: string;
  inputType: InputType;
  options: string[];
  other?: string;
}
