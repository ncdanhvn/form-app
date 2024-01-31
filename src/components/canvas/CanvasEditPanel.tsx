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

const CanvasEditPanel = () => {
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
