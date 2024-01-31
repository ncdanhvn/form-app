import { firestore, auth } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { Form } from "../types/form";
import { Question } from "../types/question";

export const createNewForm = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const formCollection = collection(firestore, "forms");
  const formDocRef = await addDoc(formCollection, {
    userId: user.uid,
    createdAt: new Date(),
  });
  return formDocRef.id;
};

export const updateForm = async (formUid: string, updatedForm: any) => {
  try {
    // Reference to the form document
    const formRef = doc(firestore, "forms", formUid);

    // Update the title and description
    await updateDoc(formRef, {
      title: updatedForm.title,
      description: updatedForm.description,
      formThumbnailUrl: updatedForm.formThumbnailUrl,
    });

    // Update each question in the questions sub-collection
    const questionsCollectionRef = collection(formRef, "questions");
    for (const [index, question] of updatedForm.questions.entries()) {
      let questionRef;
      if (question.questionUid) {
        // Update existing question
        questionRef = doc(questionsCollectionRef, question.questionUid);
      } else {
        // Create new question with auto-generated UID
        questionRef = doc(questionsCollectionRef);
        question.questionUid = questionRef.id; // Update questionUid with auto-generated id
      }
      question.questionNumber = index;
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

    questions.sort((a, b) => a.questionNumber - b.questionNumber);
    // Combine form data with questions
    return { ...formData, questions, uid: formUid } as Form;
  } catch (error) {
    console.error("Error loading form: ", error);
    throw error;
  }
};

export const deleteFormQuestion = async (
  formUid: string,
  questionUid: string
) => {
  try {
    // Check if the form exists
    const formRef = doc(firestore, "forms", formUid);
    const formSnap = await getDoc(formRef);
    if (!formSnap.exists()) {
      console.error(`Form with UID: ${formUid} does not exist.`);
      return;
    }

    // Check if the question exists
    const questionRef = doc(formRef, "questions", questionUid);
    const questionSnap = await getDoc(questionRef);
    if (!questionSnap.exists()) {
      console.error(
        `Question with UID: ${questionUid} does not exist in form: ${formUid}.`
      );
      return;
    }

    // Delete the question
    await deleteDoc(questionRef);
    console.log(
      `Question with UID: ${questionUid} has been deleted from form: ${formUid}.`
    );
  } catch (error) {
    console.error("Error deleting question: ", error);
  }
};
