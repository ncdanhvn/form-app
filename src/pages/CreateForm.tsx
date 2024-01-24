import { Button, Container, Input, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import OneQuestion from "../components/createForm/OneQuestion";
import { InputType, Question } from "../types/question";
import {
  loadForm,
  updateForm,
  deleteFormQuestion,
} from "../services/formServices";

const formUid = "yBpOOBYf1uzKgAMsByQu"; // Replace this with dynamic UID later
const form = await loadForm(formUid);

const CreateForm = () => {
  const [questions, setQuestions] = useState<Question[]>(form.questions);

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
      other: null,
      questionUid: "",
    };

    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = async (index: number) => {
    const questionUid = questions[index].questionUid;
    if (questionUid) await deleteFormQuestion(formUid, questionUid);
    setQuestions(
      questions.filter((_, questionIndex) => questionIndex !== index)
    );
  };

  const [title, setTitle] = useState(form.title);
  const [description, setDescription] = useState(form.description);

  const onUploadForm = async () => {
    await updateForm(formUid, {
      title,
      description,
      questions,
      uid: formUid,
    });
  };

  return (
    <Container my={6}>
      {/* Questions */}
      <VStack spacing={4}>
        <Input
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Form Title"
          mb={4}
        />
        <Textarea
          value={description ?? ""}
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
          <Button onClick={onUploadForm}>Save Form</Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default CreateForm;
