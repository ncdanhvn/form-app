import React, { FormEvent, useRef, useState } from "react";
import { Box, VStack, Button, Flex, Container } from "@chakra-ui/react";
import { FormHeader } from "../components/form/FormHeader";
import { FormTitle } from "../components/form/FormTitle";
import { FormDescription } from "../components/form/FormDescription";
import { FormQuestions } from "../components/form/FormQuestions";

import { saveAnswers } from "../services/firestoreService";

const Form = () => {
  const [boxHeight, setBoxHeight] = useState("100vh");
  const parentRef = useRef<HTMLDivElement>(null);
  const updateHeight = () => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;

      setBoxHeight(viewportHeight > parentHeight ? "100vh" : "100%");
    }
  };

  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (question: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
    console.log(`${question} | ${value}`);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await saveAnswers(answers);
      console.log("Answers saved successfully");
    } catch (error) {
      console.error("Error saving answers: ", error);
    }
  };

  return (
    <div ref={parentRef}>
      <Box
        bgImage="./images/party-invitation-bg.webp"
        height={boxHeight}
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
              <form onSubmit={handleSubmit}>
                <FormQuestions handleAnswerChange={handleAnswerChange} />
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
    </div>
  );
};

export default Form;
