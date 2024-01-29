import React, { useState } from "react";
import {
  Flex,
  Box,
  Stepper,
  Step,
  useSteps,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
} from "@chakra-ui/react";
import AddContent from "./CreateForm";
import AddStyles from "./Canvas";
import Share from "./Share";

const steps = [
  { title: "Add Content" },
  { title: "Styling" },
  { title: "Share" },
];

const CreateNew: React.FC = () => {
  const stepsComponents = [<AddContent />, <AddStyles />, <Share />];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

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

export default CreateNew;
