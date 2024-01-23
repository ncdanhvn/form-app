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
} from "@chakra-ui/react";
import { Question, InputType } from "../types/question";
import CreateMultiOptionsQuestion from "../components/createForm/CreateMultiOptionsQuestion";

const CreateForm = () => {
  const formUid = "hardcoded-uid"; // Replace this with dynamic UID later
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionNumber: 1,
      question: "This is a multi-choices question",
      inputType: InputType.MultiChoices,
      options: ["Option 1", "Option 2"],
      other: "",
    },
  ]);

  const onUpdateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    console.log(newQuestions);
    setQuestions(newQuestions);
  };

  return (
    <Container>
      <VStack spacing={4}>
        {questions.map((question, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w={"100%"}>
            <Text mb={2}>Question {question.questionNumber}</Text>
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
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default CreateForm;
