import {
  Box,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditFormContent from "../components/EditFormContent";
import { updateForm } from "../services/formServices";
import { saveFormStyles } from "../services/formStyleServices";
import { thumbnailGenerateRequest } from "../services/thumbnailServices";
import useCanvasStore from "../stores/canvasStore";
import useFormContentStore from "../stores/formContentStore";
import useButtonToolbarStore from "../stores/toolbarStore/buttonToolbarStore";
import useDescriptionToolbarStore from "../stores/toolbarStore/descriptionToolbarStore";
import useQuestionToolbarStore from "../stores/toolbarStore/questionToolbarStore";
import useTitleToolbarStore from "../stores/toolbarStore/titleToolbarStore";
import { FormStyles } from "../types/formStyles";
import AddStyles from "./Canvas";
import ShareForm from "./ShareForm";

const steps = [
  { title: "Content" },
  { title: "Styling" },
  { title: "Save & Share" },
];

const EditForm: React.FC = () => {
  const { formUid } = useParams();
  const stepsComponents = [
    <EditFormContent formUid={formUid!} />,
    <AddStyles formUid={formUid!} />,
    <ShareForm formUid={formUid!} />,
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const { title, questions, description } = useFormContentStore();
  const uploadForm = async () => {
    await updateForm(formUid!, {
      title,
      description,
      questions,
      uid: formUid!,
    });
    console.log("Loaded form content to db", title);
  };

  const canvasStore = useCanvasStore();
  const titleToolbar = useTitleToolbarStore();
  const descriptionToolbar = useDescriptionToolbarStore();
  const questionsToolbar = useQuestionToolbarStore();
  const buttonToolbar = useButtonToolbarStore();
  const formStyles: FormStyles = {
    background: {
      type: canvasStore.background.type,
      color: canvasStore.background.color,
      image: canvasStore.background.image,
    },
    titleBgColor: canvasStore.title.backgroundColor,
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
    buttonBgColor: canvasStore.submitButton.bgColor,
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

  useEffect(() => {
    // At last step
    if (activeStep == steps.length - 1) {
      uploadForm();
      saveFormStyles(formUid!, formStyles);
      thumbnailGenerateRequest(formUid!);
    }
  }, [activeStep]);

  return (
    <>
      <Box
        width="200px"
        padding="20px"
        position="fixed"
        top="0"
        height="100vh"
        overflowY="auto"
        display={"flex"}
        alignItems={"center"}
      >
        <Stepper
          index={activeStep}
          orientation="vertical"
          height="400px"
          gap="0"
          size={"lg"}
        >
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator cursor={"pointer"}>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0" cursor={"pointer"}>
                <StepTitle>{step.title}</StepTitle>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      <Flex>
        <Box width="200px" height="100vh" />
        <Box flex="1">{stepsComponents[activeStep]}</Box>
      </Flex>
    </>
  );
};

export default EditForm;
