import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  loadFormStyles,
  saveFormStyles,
} from "../../services/formStyleServices";
import useCanvasStore from "../../stores/canvasStore";
import useButtonToolbarStore from "../../stores/toolbarStore/buttonToolbarStore";
import useDescriptionToolbarStore from "../../stores/toolbarStore/descriptionToolbarStore";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import useTitleToolbarStore from "../../stores/toolbarStore/titleToolbarStore";
import ToolbarState from "../../stores/toolbarStore/toolbarTypes";
import { FormStyles, ToolbarAttributes } from "../../types/formStyles";
import FormatTextToolbar from "../FormatTextToolbar";
import BackgroundAccordion from "./BackgroundAccordion";
import SubmitButtonAccordion from "./SubmitButtonAccordion";
import TitleAccordion from "./TitleAccordion";

interface Props {
  formUid: string;
  setIsLoadingFormStyle: (isLoading: boolean) => void;
}

const CanvasEditPanel = ({ formUid, setIsLoadingFormStyle }: Props) => {
  const { background, submitButton, title, setIsFetched, isFetched } =
    useCanvasStore();
  const titleToolbar = useTitleToolbarStore();
  const descriptionToolbar = useDescriptionToolbarStore();
  const questionsToolbar = useQuestionToolbarStore();
  const buttonToolbar = useButtonToolbarStore();

  // Get form styles if it exists
  const loadFormStylesData = async () => {
    try {
      setIsLoadingFormStyle(true);

      const styles = await loadFormStyles(formUid);
      setFormStyles(styles);
    } catch (err) {
      console.log("Form styles doesn't exist yet, load the default one");
    } finally {
      setIsLoadingFormStyle(false);
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

  useEffect(() => {
    if (!isFetched) {
      loadFormStylesData();
      setIsFetched(true);
    }
  }, []);

  return (
    <Box
      position="fixed"
      right="0"
      top="0"
      width="300px"
      height="100vh"
      bg="white"
      boxShadow="md"
    >
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Background
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <BackgroundAccordion />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Title
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <TitleAccordion />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Description
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormatTextToolbar useToolbarStore={useDescriptionToolbarStore} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Questions
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormatTextToolbar useToolbarStore={useQuestionToolbarStore} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Submit Button
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SubmitButtonAccordion />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {/* <Box display={"flex"} justifyContent={"center"}>
        <Button mt={4} onClick={() => saveFormStyles(formUid, formStyles)}>
          Save Style
        </Button>
      </Box> */}
    </Box>
  );
};

export default CanvasEditPanel;
