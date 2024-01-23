export enum InputType {
  Checkbox = "checkbox",
  ShortAnswer = "short-answer",
  Paragraph = "paragraph",
  MultiChoices = "multi-choices",
  Dropdown = "dropdown",
}

export interface Question {
  questionNumber: number;
  question: string;
  inputType: InputType;
  options?: string[];
}
