import { Button, Container, Input, Textarea, VStack } from "@chakra-ui/react";
import { deleteFormQuestion } from "../services/formServices";
import useFormContentStore from "../stores/formContentStore";
import { InputType, Question } from "../types/question";
import OneQuestion from "./createForm/OneQuestion";

const EditFormContent = ({ formUid }: { formUid: string }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    updateQuestion: onUpdateQuestion,
    addQuestion,
    deleteQuestion,
  } = useFormContentStore();

  const onAddQuestion = () => {
    const newQuestion: Question = {
      questionNumber: questions.length,
      question: "",
      inputType: InputType.MultiChoices, // Default type, can be changed
      options: [""],
      required: false,
      other: false,
      questionUid: "",
    };

    addQuestion(newQuestion);
  };

  const onDeleteQuestion = async (index: number) => {
    const questionUid = questions[index].questionUid;
    if (questionUid) await deleteFormQuestion(formUid, questionUid);
    deleteQuestion(index);
  };

  return (
    <>
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
                deleteQuestion={onDeleteQuestion}
                key={index}
              />
            ))}
            <Button onClick={onAddQuestion} mt={4}>
              Add Question
            </Button>
            {/* <Button onClick={uploadForm}>Save Form</Button> */}
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default EditFormContent;
