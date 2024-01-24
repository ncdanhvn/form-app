import { firestore } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { Form } from "../types/form";
import { Question } from "../types/question";

export const createForm = async () => {
  try {
    const formRef = doc(collection(firestore, "forms"));
    const blankForm = {
      uid: formRef.id,
      title: "",
      description: "",
      questions: [],
    };

    await setDoc(formRef, blankForm);
    return blankForm;
  } catch (error) {
    console.error("Error creating form: ", error);
    throw error;
  }
};

export const updateForm = async (formUid: string, updatedForm: Form) => {
  try {
    // Reference to the form document
    const formRef = doc(firestore, "forms", formUid);

    // Update the title and description
    await updateDoc(formRef, {
      title: updatedForm.title,
      description: updatedForm.description,
    });

    // Update each question in the questions sub-collection
    const questionsCollectionRef = collection(formRef, "questions");
    for (const question of updatedForm.questions) {
      let questionRef;
      if (question.questionUid) {
        // Update existing question
        questionRef = doc(questionsCollectionRef, question.questionUid);
      } else {
        // Create new question with auto-generated UID
        questionRef = doc(questionsCollectionRef);
        question.questionUid = questionRef.id; // Update questionUid with auto-generated id
      }
      await setDoc(questionRef, question);
    }

    console.log("Update form succesfully!");
  } catch (error) {
    console.error("Error updating form: ", error);
    throw error;
  }
};

export const loadForm = async (formUid: string): Promise<Form> => {
  try {
    // Reference to the form document
    const formRef = doc(firestore, "forms", formUid);

    // Get the form document
    const formSnap = await getDoc(formRef);
    if (!formSnap.exists()) {
      throw new Error(`No form found with UID: ${formUid}`);
    }
    const formData = formSnap.data();

    // Get questions from the sub-collection
    const questionsCollectionRef = collection(formRef, "questions");
    const querySnapshot = await getDocs(questionsCollectionRef);
    const questions: Question[] = [];
    querySnapshot.forEach((doc) => {
      questions.push({ ...doc.data() } as Question);
    });

    // Combine form data with questions
    return { ...formData, questions } as Form;
  } catch (error) {
    console.error("Error loading form: ", error);
    throw error;
  }
};
