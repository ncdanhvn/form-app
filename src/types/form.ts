import { Question } from "./question";
import { Timestamp } from "firebase/firestore";
export interface Form {
  uid: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Timestamp;
  formThumbnailUrl: string;
}
