import { firestore } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const saveAnswers = async (answers: any) => {
  try {
    const docRef = await addDoc(collection(firestore, "answers"), answers);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
