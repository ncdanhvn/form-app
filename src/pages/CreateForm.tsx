import { Button, Container, VStack } from "@chakra-ui/react";
import { useState } from "react";
import OneQuestion from "../components/createForm/OneQuestion";
import { InputType, Question } from "../types/question";

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
      {/* Questions */}
      <VStack spacing={4}>
        {questions.map((question, index) => (
          <OneQuestion
            index={index}
            question={question}
            onUpdateQuestion={onUpdateQuestion}
            deleteQuestion={deleteQuestion}
            key={index}
          />
        ))}
        <Button onClick={addQuestion} mt={4} colorScheme="blue">
          Add Question
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateForm;
