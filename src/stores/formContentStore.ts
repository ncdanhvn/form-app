import { create } from "zustand";
import { Question } from "../types/question";

interface FormContentStore {
  title: string;
  setTitle: (title: string) => void;

  description: string;
  setDescription: (description: string) => void;

  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (index: number, updatedQuestion: Question) => void;
  deleteQuestion: (index: number) => void;
}

const useFormContentStore = create<FormContentStore>((set) => ({
  title: "",
  setTitle: (title: string) => set(() => ({ title })),

  description: "",
  setDescription: (description: string) => set(() => ({ description })),

  questions: [],
  setQuestions: (questions: Question[]) => set(() => ({ questions })),
  addQuestion: (question: Question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  updateQuestion: (index: number, updatedQuestion: Question) =>
    set((state) => ({
      questions: state.questions.map((q, i) =>
        i === index ? updatedQuestion : q
      ),
    })),
  deleteQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter(
        (_, questionIndex) => questionIndex !== index
      ),
    })),
}));

export default useFormContentStore;
