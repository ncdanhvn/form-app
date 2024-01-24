import { firestore } from "../firebaseConfig";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { Form } from "../types/form";

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
      const questionRef = doc(
        questionsCollectionRef,
        question.questionNumber.toString()
      );
      await setDoc(questionRef, question);
    }
  } catch (error) {
    console.error("Error updating form: ", error);
    throw error;
  }
};
