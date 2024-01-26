import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import BackgroundAccordion from "./BackgroundAccordion";
import TitleAccordion from "./TitleAccordion";
import DescriptionAccordion from "./DescriptionAccordion";

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
            <DescriptionAccordion />
          </AccordionPanel>
        </AccordionItem>

        {/* Add other sections similarly */}
      </Accordion>
    </Box>
  );
};

export default CanvasEditPanel;
