import { create } from "zustand";
import { Question } from "../types/question";
import { loadForm } from "../services/formServices";

interface FormContentStore {
  isFetched: boolean;

  title: string;
  setTitle: (title: string) => void;

  description: string;
  setDescription: (description: string) => void;

  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (index: number, updatedQuestion: Question) => void;
  deleteQuestion: (index: number) => void;

  fetchForm: (formUid: string) => Promise<void>;
}

const useFormContentStore = create<FormContentStore>((set) => ({
  isFetched: false,

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

  fetchForm: async (formUid) => {
    const { title, description, questions } = await loadForm(formUid);
    set(() => ({ title, description, questions, isFetched: true }));
  },
}));

export default useFormContentStore;
