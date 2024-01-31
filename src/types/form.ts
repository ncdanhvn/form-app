import { Question } from "./question";
import { Timestamp } from "firebase/firestore";
export interface Form {
  userId: string;
  uid: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Timestamp;
  formThumbnailUrl: string;
  timesOfCopies: number;
  isSharedToCommunity: boolean;
}
