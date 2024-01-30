import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Box, VStack, Button, Flex, Container } from "@chakra-ui/react";
import { FormHeader } from "../components/form/FormHeader";
import FormTitle from "../components/form/FormTitle";
import FormDescription from "../components/form/FormDescription";
import { FormQuestions } from "../components/form/FormQuestions";

import { saveAnswers } from "../services/submissionServices";
import { loadForm } from "../services/formServices";
import { Form as FormType } from "../types/form";
import { Answer } from "../types/answer";
import { useParams } from "react-router-dom";

const Form = () => {
  const { formUid } = useParams();

  // Get form from db to display
  const [form, setForm] = useState<FormType>();
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await loadForm(formUid!);
        setForm(form);

        // Init the answers
        if (form)
          setAnswers(
            form.questions.map(
              (q) => ({ questionUid: q.questionUid, value: "" } as Answer)
            )
          );
      } catch (error) {
        console.error("Error loading form: ", error);
      }
    };
    fetchForm();
  }, [formUid]);

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
    console.log(`${questionUid} | ${newValue}`);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await saveAnswers(formUid!, answers);
      console.log("Answers saved successfully");
    } catch (error) {
      console.error("Error saving answers: ", error);
    }
  };

  return (
    <div>
      {form && (
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
