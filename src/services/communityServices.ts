import { loadForm, updateForm } from "./formServices";
import { loadFormStyles, saveFormStyles } from "./formStyleServices";

export async function copyForm(sourceFormUid: string, targetFormUid: string) {
  const sourceFormContent = await loadForm(sourceFormUid);
  const sourceFormStyle = await loadFormStyles(sourceFormUid);

  await updateForm(targetFormUid, sourceFormContent);
  await saveFormStyles(targetFormUid, sourceFormStyle);
}
