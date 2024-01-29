import { Button, Container, Input, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OneQuestion from "./createForm/OneQuestion";
import { InputType, Question } from "../types/question";
import {
  loadForm,
  updateForm,
  deleteFormQuestion,
} from "../services/formServices";
import { Form } from "../types/form";
import useFormContentStore from "../stores/formContentStore";

const EditFormContent = ({ formUid }: { formUid: string }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    setQuestions,
    updateQuestion: onUpdateQuestion,
    addQuestion,
    deleteQuestion,
  } = useFormContentStore();

  const [form, setForm] = useState<Form>();
  useEffect(() => {
    (async () => {
      setForm(await loadForm(formUid));
    })();
    setTitle(form?.title ?? "");
    setDescription(form?.description ?? "");
    setQuestions(form?.questions ?? []);
  }, []);

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
              deleteQuestion={onDeleteQuestion}
              key={index}
            />
          ))}
          <Button onClick={onAddQuestion} mt={4} colorScheme="blue">
            Add Question
          </Button>
          <Button onClick={onUploadForm}>Save Form</Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default EditFormContent;
