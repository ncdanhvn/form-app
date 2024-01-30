import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

import { FormStyles } from "../types/formStyles";

const collectionName = "formStyles";

export const saveFormStyles = async (
  formUid: string,
  formStyles: FormStyles
): Promise<void> => {
  try {
    console.log("save form: ", formUid, formStyles);
    await setDoc(doc(firestore, collectionName, formUid), formStyles);
    console.log("Form styles saved successfully");
  } catch (error) {
    // console.error("Error saving form styles: ", error);
    throw error;
  }
};

export const loadFormStyles = async (formUid: string): Promise<FormStyles> => {
  try {
    const docRef = doc(firestore, collectionName, formUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as FormStyles; // Cast the data to FormStyles type
    } else {
      throw new Error(`No form found with ID ${formUid}`);
    }
  } catch (error) {
    throw error; // Rethrow the error for handling by the caller
  }
};
