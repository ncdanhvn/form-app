import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useDescriptionToolbarStore from "../../stores/toolbarStore/descriptionToolbarStore";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import FormatTextToolbar from "../FormatTextToolbar";
import BackgroundAccordion from "./BackgroundAccordion";
import TitleAccordion from "./TitleAccordion";
import SubmitButtonAccordion from "./SubmitButtonAccordion";

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
      <Accordion allowToggle defaultIndex={[0]}>
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
    </Box>
  );
};

export default CanvasEditPanel;
