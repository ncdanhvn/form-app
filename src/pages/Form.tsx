import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Box, VStack, Button, Flex, Container } from "@chakra-ui/react";
import { FormHeader } from "../components/form/FormHeader";
import FormTitle from "../components/form/FormTitle";
import FormDescription from "../components/form/FormDescription";
import { FormQuestions } from "../components/form/FormQuestions";

import { saveAnswers } from "../services/firestoreService";
import { loadForm } from "../services/formServices";
import { Form as FormType } from "../types/form";
import { Answer } from "../types/answer";

const formUid = "yBpOOBYf1uzKgAMsByQu";

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

  // Get form from db to display
  const [form, setForm] = useState<FormType>();
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await loadForm(formUid);
        setForm(form);
      } catch (error) {
        console.error("Error loading form: ", error);
      }
    };
    fetchForm();
  }, [formUid]);

  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswerChange = (
    questionUid: string,
    newValue: string | string[]
  ) => {
    const newAnswers = [...answers];
    const answer = newAnswers.find((a) => a.questionUid === questionUid);
    if (answer) {
      answer.value = newValue;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await saveAnswers(formUid, answers);
      console.log("Answers saved successfully");
    } catch (error) {
      console.error("Error saving answers: ", error);
    }
  };

  return (
    <div ref={parentRef}>
      {form && (
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
                <FormTitle title={form.title} />
                <FormDescription description={form.description} />
                <form onSubmit={handleSubmit}>
                  <FormQuestions
                    handleAnswerChange={handleAnswerChange}
                    questions={form.questions}
                  />
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
      )}
    </div>
  );
};

export default Form;
