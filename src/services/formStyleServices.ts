import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

import useCanvasStore from "../stores/canvasStore";
import useButtonToolbarStore from "../stores/toolbarStore/buttonToolbarStore";
import useDescriptionToolbarStore from "../stores/toolbarStore/descriptionToolbarStore";
import useQuestionToolbarStore from "../stores/toolbarStore/questionToolbarStore";
import useTitleToolbarStore from "../stores/toolbarStore/titleToolbarStore";
import { FormStyles } from "../types/formStyles";

const { background, submitButton, title } = useCanvasStore();
const titleToolbar = useTitleToolbarStore();
const descriptionToolbar = useDescriptionToolbarStore();
const questionsToolbar = useQuestionToolbarStore();
const buttonToolbar = useButtonToolbarStore();

const formStyles: FormStyles = {
  background: {
    type: background.type,
    color: background.color,
    image: background.image,
  },
  titleBgColor: title.backgroundColor,
  titleText: {
    bold: titleToolbar.bold,
    italic: titleToolbar.italic,
    underline: titleToolbar.underline,
    align: titleToolbar.align,
    color: titleToolbar.textColor,
    font: titleToolbar.fontFamily,
    size: titleToolbar.fontSize,
  },
  descriptionText: {
    bold: descriptionToolbar.bold,
    italic: descriptionToolbar.italic,
    underline: descriptionToolbar.underline,
    align: descriptionToolbar.align,
    color: descriptionToolbar.textColor,
    font: descriptionToolbar.fontFamily,
    size: descriptionToolbar.fontSize,
  },
  questionsText: {
    bold: questionsToolbar.bold,
    italic: questionsToolbar.italic,
    underline: questionsToolbar.underline,
    align: questionsToolbar.align,
    color: questionsToolbar.textColor,
    font: questionsToolbar.fontFamily,
    size: questionsToolbar.fontSize,
  },
  buttonBgColor: submitButton.bgColor,
  buttonText: {
    bold: buttonToolbar.bold,
    italic: buttonToolbar.italic,
    underline: buttonToolbar.underline,
    align: buttonToolbar.align,
    color: buttonToolbar.textColor,
    font: buttonToolbar.fontFamily,
    size: buttonToolbar.fontSize,
  },
};

export const saveFormStyles = async (
  formUid: string,
  formStyles: FormStyles
): Promise<void> => {
  try {
    await setDoc(doc(firestore, "forms", formUid), formStyles);
    console.log("Form styles saved successfully");
  } catch (error) {
    console.error("Error saving form styles: ", error);
    throw error;
  }
};

export const loadFormStyles = async (formUid: string): Promise<FormStyles> => {
  try {
    const docRef = doc(firestore, "forms", formUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as FormStyles; // Cast the data to FormStyles type
    } else {
      throw new Error(`No form found with ID ${formUid}`);
    }
  } catch (error) {
    console.error("Error loading form styles: ", error);
    throw error; // Rethrow the error for handling by the caller
  }
};
