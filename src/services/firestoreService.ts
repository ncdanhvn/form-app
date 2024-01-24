import { firestore } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { Question } from "../types/question";
import { Answer } from "../types/answer";

export const saveAnswers = async (formUid: string, answers: Answer[]) => {
  try {
    const submissionDocRef = doc(firestore, "submission", formUid);
    const answersCollectionRef = collection(submissionDocRef, "answers");

    // Transform the array of answers into an object
    const answersObject = answers.reduce((obj, item) => {
      obj[item.questionUid] = item.value;
      return obj;
    }, {} as { [questionUid: string]: string | string[] });

    const docRef = await addDoc(answersCollectionRef, answersObject);
    console.log("Answer document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding answer document: ", e);
    throw e;
  }
};

export const loadQuestions = async (formUid: string): Promise<Question[]> => {
  try {
    const formDocRef = doc(firestore, "forms", formUid);
    const questionsCollectionRef = collection(formDocRef, "questions");
    const querySnapshot = await getDocs(questionsCollectionRef);
    const questions: Question[] = [];

    querySnapshot.forEach((docSnapshot) => {
      const questionData = docSnapshot.data() as Omit<
        Question,
        "questionNumber"
      >;
      const question: Question = {
        ...questionData,
        questionNumber: parseInt(docSnapshot.id), // Use the document ID as the question number
      };
      questions.push(question);
    });

    // Sort questions by their question number
    questions.sort((a, b) => a.questionNumber - b.questionNumber);

    return questions;
  } catch (error) {
    console.error("Error loading questions: ", error);
    throw error;
  }
};
