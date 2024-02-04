import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditFormContent from "../components/EditFormContent";
import { loadForm, updateForm } from "../services/formServices";
import { loadFormStyles, saveFormStyles } from "../services/formStyleServices";
import { thumbnailGenerateRequest } from "../services/thumbnailServices";
import useCanvasStore from "../stores/canvasStore";
import useFormContentStore from "../stores/formContentStore";
import useButtonToolbarStore from "../stores/toolbarStore/buttonToolbarStore";
import useDescriptionToolbarStore from "../stores/toolbarStore/descriptionToolbarStore";
import useQuestionToolbarStore from "../stores/toolbarStore/questionToolbarStore";
import useTitleToolbarStore from "../stores/toolbarStore/titleToolbarStore";
import { FormStyles, ToolbarAttributes } from "../types/formStyles";
import AddStyles from "./Canvas";
import ShareForm from "./ShareForm";
import Loading from "../components/Loading";
import ToolbarState from "../stores/toolbarStore/toolbarTypes";
import { ChevronRightIcon } from "@chakra-ui/icons";
import useDocumentTitle from "../services/useDocumentTitle";

const sidebarWidth = 260;

const steps = [
  { title: "Content" },
  { title: "Styling" },
  { title: "Save & Share" },
];

const EditForm: React.FC = () => {
  useDocumentTitle("Edit Form");

  const { formUid } = useParams();
  const stepsComponents = [
    <EditFormContent formUid={formUid!} />,
    <AddStyles />,
    <ShareForm formUid={formUid!} />,
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load stores
  const { title, description, questions, fetchForm } = useFormContentStore();
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

  const loadFormStylesData = async () => {
    try {
      const styles = await loadFormStyles(formUid!);
      setFormStyles(styles);
    } catch (err) {
      console.log("Form styles doesn't exist yet, load the default one");
    }
  };
  const setFormStyles = (formStyles: FormStyles) => {
    canvasStore.background.setBackgroundType(formStyles.background.type);
    canvasStore.background.setBackgroundImage(formStyles.background.image);
    canvasStore.background.setBackgroundColor(formStyles.background.color);

    canvasStore.submitButton.setBgColor(formStyles.buttonBgColor);

    canvasStore.title.setTitleBgColor(formStyles.titleBgColor);

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

  // Load form content and styles when component mounted
  useEffect(() => {
    const loadFormContentAndStyles = async () => {
      try {
        await fetchForm(formUid!);
        await loadFormStylesData();
      } catch (error) {
        console.log("Error when fetching form content and styles. ", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFormContentAndStyles();
  }, []);

  // Upload form content and style when finish editting
  const uploadForm = async () => {
    await updateForm(formUid!, {
      title,
      description,
      questions,
      uid: formUid!,
    });
    console.log("Loaded form content to db", title);
  };

  useEffect(() => {
    // At last step
    if (activeStep == steps.length - 1) {
      uploadForm();
      saveFormStyles(formUid!, formStyles);
      thumbnailGenerateRequest(formUid!);
    }
  }, [activeStep]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <VStack
        width={sidebarWidth}
        padding="20px"
        position="fixed"
        top="0"
        height="100vh"
        bg="gray.100"
        overflowY="auto"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Breadcrumb
          mt={4}
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Edit Form</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex flex={1} alignItems={"center"}>
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
        </Flex>
      </VStack>
      <Flex>
        <Box width={sidebarWidth} height="100vh" />
        <Box flex="1">{stepsComponents[activeStep]}</Box>
      </Flex>
    </>
  );
};

export default EditForm;
