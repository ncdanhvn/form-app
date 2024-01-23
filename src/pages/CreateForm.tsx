import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  Input,
  VStack,
  HStack,
  Text,
  Container,
  IconButton,
  Divider,
  Checkbox,
} from "@chakra-ui/react";
import { Question, InputType } from "../types/question";
import CreateMultiOptionsQuestion from "../components/createForm/CreateMultiOptionsQuestion";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

const CreateForm = () => {
  const formUid = "hardcoded-uid"; // Replace this with dynamic UID later
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionNumber: 1,
      question: "This is a multi-choices question",
      inputType: InputType.MultiChoices,
      options: ["Option 1", "Option 2"],
      other: "",
      required: false,
    },
  ]);

  const onUpdateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    console.log(newQuestions);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      questionNumber: questions.length + 1,
      question: "",
      inputType: InputType.MultiChoices, // Default type, can be changed
      options: [""],
      required: false,
    };

    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(
      questions.filter((_, questionIndex) => questionIndex !== index)
    );
  };

  return (
    <Container>
      <VStack spacing={4}>
        {questions.map((question, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="2px"
            borderColor={"black.100"}
            borderRadius="lg"
            w={"100%"}
            sx={{
              transition: "border-color 0.2s ease, border-width 0.2s ease",
              ":hover": {
                borderColor: "blue.500",
                borderWidth: "2px",
              },
            }}
          >
            <Input
              value={question.question}
              onChange={(e) =>
                onUpdateQuestion(index, {
                  ...question,
                  question: e.target.value,
                })
              }
              variant="flushed"
              placeholder="The question goes here"
              fontWeight={600}
              mb={2}
              w={"100%"}
            />

            <Select
              value={question.inputType}
              onChange={(e) =>
                onUpdateQuestion(index, {
                  ...question,
                  inputType: e.target.value as InputType,
                })
              }
              mb={2}
            >
              {Object.values(InputType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            {[
              InputType.Dropdown,
              InputType.Checkbox,
              InputType.MultiChoices,
            ].includes(question.inputType) && (
              <CreateMultiOptionsQuestion
                index={index}
                question={question}
                onUpdateQuestion={onUpdateQuestion}
                inputType={question.inputType}
                key={index}
              />
            )}
            <Divider my={4} />
            <HStack justifyContent="end" spacing={4}>
              <Checkbox
                isChecked={question.required}
                onChange={(e) => {
                  const updatedQuestion = {
                    ...question,
                    required: e.target.checked,
                  };
                  onUpdateQuestion(index, updatedQuestion);
                }}
              >
                Required
              </Checkbox>
              <IconButton
                aria-label="Delete question"
                icon={<DeleteIcon />}
                onClick={() => deleteQuestion(index)}
              />
            </HStack>
          </Box>
        ))}
        <Button onClick={addQuestion} mt={4} colorScheme="blue">
          Add Question
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateForm;
