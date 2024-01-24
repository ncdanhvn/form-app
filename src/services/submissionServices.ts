import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
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
