import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import BackgroundAccordion from "./BackgroundAccordion";

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
      <Accordion allowMultiple defaultIndex={[0]}>
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

        {/* Repeat AccordionItem for each section: Header, Title, Description, Questions */}

        {/* Example for Header */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Header
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {/* Header edit options go here */}
          </AccordionPanel>
        </AccordionItem>

        {/* Add other sections similarly */}
      </Accordion>
    </Box>
  );
};

export default CanvasEditPanel;
