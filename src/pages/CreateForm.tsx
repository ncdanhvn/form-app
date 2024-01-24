import { Button, Container, Input, Textarea, VStack } from "@chakra-ui/react";
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Container my={6}>
      {/* Questions */}
      <VStack spacing={4}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Form Title"
          mb={4}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Form Description"
          mb={4}
          rows={3}
        />
        <VStack spacing={2} width={"100%"}>
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
      </VStack>
    </Container>
  );
};

export default CreateForm;
