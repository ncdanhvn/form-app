import React from "react";
import { FormHeader } from "../components/form/FormHeader";
import { FormTitle } from "../components/form/FormTitle";
import { FormDescription } from "../components/form/FormDescription";
import { FormQuestion } from "../components/form/FormQuestion";

import { Box, VStack, Button, Flex, Container } from "@chakra-ui/react";

const questions = [
  {
    question: "Would you be able to join us?",
    inputType: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "What is your meal preference?",
    inputType: "select",
    options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free"],
  },
  // Add more questions as needed
];

const Form = () => {
  return (
    <Box
      bgImage="./images/party-invitation-bg.webp"
      height="100vh"
      width="100vw"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container bg="white" borderRadius={"lg"} p={0} overflow={"hidden"}>
        <VStack gap={0}>
          <FormHeader />
          <VStack w={"100%"} gap={4} mb={8}>
            <FormTitle />
            <FormDescription />
            <form>
              {questions.map((q, index) => (
                <FormQuestion
                  key={index}
                  question={q.question}
                  inputType={q.inputType}
                  options={q.options}
                />
              ))}
              <Flex justifyContent="center" width="full" mt={8}>
                <Button colorScheme="pink" type="submit">
                  Submit
                </Button>
              </Flex>
            </form>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Form;
