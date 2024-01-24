import { Question } from "./question";

export interface Form {
  uid: string;
  title: string;
  description: string;
  questions: Question[];
}
