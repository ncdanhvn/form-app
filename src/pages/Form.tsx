import { Box, Container, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormDescription from "../components/form/FormDescription";
import { FormHeader } from "../components/form/FormHeader";
import { FormQuestions } from "../components/form/FormQuestions";
import FormTitle from "../components/form/FormTitle";

import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import FormButton from "../components/form/FormButton";
import { loadForm } from "../services/formServices";
import { loadFormStyles } from "../services/formStyleServices";
import { saveAnswers } from "../services/submissionServices";
import useCanvasStore from "../stores/canvasStore";
import useButtonToolbarStore from "../stores/toolbarStore/buttonToolbarStore";
import useDescriptionToolbarStore from "../stores/toolbarStore/descriptionToolbarStore";
import useQuestionToolbarStore from "../stores/toolbarStore/questionToolbarStore";
import useTitleToolbarStore from "../stores/toolbarStore/titleToolbarStore";
import ToolbarState from "../stores/toolbarStore/toolbarTypes";
import { Answer } from "../types/answer";
import { Form as FormType } from "../types/form";
import { FormStyles, ToolbarAttributes } from "../types/formStyles";

const Form = () => {
  const { formUid } = useParams();

  // Get form from db to display
  const [form, setForm] = useState<FormType>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await loadForm(formUid!);
        setForm(form);
        await loadFormStylesData();

        // Init the answers
        if (form)
          setAnswers(
            form.questions.map(
              (q) => ({ questionUid: q.questionUid, value: "" } as Answer)
            )
          );
      } catch (error) {
        console.error("Error loading form: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchForm();
  }, [formUid]);

  // Get form style
  const { background, submitButton, title } = useCanvasStore();
  const titleToolbar = useTitleToolbarStore();
  const descriptionToolbar = useDescriptionToolbarStore();
  const questionsToolbar = useQuestionToolbarStore();
  const buttonToolbar = useButtonToolbarStore();

  const loadFormStylesData = async () => {
    try {
      const styles = await loadFormStyles(formUid!);
      setFormStyles(styles);
    } catch (err) {
      console.log("Form styles doesn't exist yet, load the default one");
    }
  };

  const setFormStyles = (formStyles: FormStyles) => {
    background.setBackgroundType(formStyles.background.type);
    background.setBackgroundImage(formStyles.background.image);
    background.setBackgroundColor(formStyles.background.color);

    submitButton.setBgColor(formStyles.buttonBgColor);

    title.setTitleBgColor(formStyles.titleBgColor);

    setToolbarAttribute(formStyles.titleText, titleToolbar);
    setToolbarAttribute(formStyles.descriptionText, descriptionToolbar);
    setToolbarAttribute(formStyles.questionsText, questionsToolbar);
    setToolbarAttribute(formStyles.buttonText, buttonToolbar);
  };

  const setToolbarAttribute = (
    toolbarAttribute: ToolbarAttributes,
    toolbarStore: ToolbarState
  ) => {
    toolbarStore.setBold(toolbarAttribute.bold);
    toolbarStore.setItalic(toolbarAttribute.italic);
    toolbarStore.setUnderline(toolbarAttribute.underline);
    toolbarStore.setAlign(toolbarAttribute.align);
    toolbarStore.setTextColor(toolbarAttribute.color);
    toolbarStore.setFontFamily(toolbarAttribute.font);
    toolbarStore.setFontSize(toolbarAttribute.size);
  };

  const handleAnswerChange = (
    questionUid: string,
    newValue: string | string[]
  ) => {
    const newAnswers = [...answers];
    const answer = newAnswers.find((a) => a.questionUid === questionUid);
    if (answer) {
      answer.value = newValue;
      setAnswers(newAnswers);
    }
    console.log(`${questionUid} | ${newValue}`);
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setIsSubmiting(true);
      await saveAnswers(formUid!, answers);
      console.log("Answers saved successfully");
    } catch (error) {
      console.error("Error saving answers: ", error);
    } finally {
      setIsSubmiting(false);
    }

    setIsSubmitted(true);
  };

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted)
    return (
      <Box
        height="100vh"
        width="100vw"
        {...(background.type === "color"
          ? { bg: background.color }
          : { bgImage: background.image })}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        overflow={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Container bg="white" borderRadius={"lg"} p={0} overflow={"hidden"}>
          <VStack spacing={0}>
            <FormHeader />
            <VStack w={"100%"} spacing={0} mb={8}>
              <FormTitle title={form!.title} />
              <FormDescription
                description={"Your response has been recorded "}
              />
            </VStack>
          </VStack>
        </Container>
      </Box>
    );

  return isLoading ? (
    <Loading />
  ) : (
    <Box
      height="100vh"
      width="100vw"
      {...(background.type === "color"
        ? { bg: background.color }
        : { bgImage: background.image })}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      overflow={"auto"}
      py={16}
    >
      <Container bg="white" borderRadius={"lg"} p={0} overflow={"hidden"}>
        <VStack spacing={0}>
          <FormHeader />
          <VStack w={"100%"} spacing={0} mb={8}>
            <FormTitle title={form!.title} />
            <FormDescription description={form!.description} />
            <Box
              display={"flex"}
              justifyContent={questionsToolbar.align}
              w={"100%"}
              px={8}
              py={4}
            >
              <FormQuestions
                handleAnswerChange={handleAnswerChange}
                questions={form!.questions}
              />
            </Box>
            <FormButton
              onButtonClick={handleSubmit}
              isSubmiting={isSubmiting}
            />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Form;
