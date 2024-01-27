import { VStack } from "@chakra-ui/react";
import { InputType, Question } from "../../types/question";
import MultipleChoiceQuestionCanvas from "./MultipleChoiceQuestionCanvas";
import DropdownQuestionCanvas from "./DropdownQuestionCanvas";
import CheckboxQuestionCanvas from "./CheckboxQuestionCanvas";
import ShortAnswerQuestionCanvas from "./ShortAnswerQuestionCanvas";
import ParagraphQuestionCanvas from "./ParagraphQuestionCanvas";

interface Props {
  questions: Question[];
}

const FormQuestionsCanvas = ({ questions }: Props) => {
  return (
    <VStack gap={4}>
      {questions.map((q, index) => {
        switch (q.inputType) {
          case InputType.MultiChoices:
            return <MultipleChoiceQuestionCanvas key={index} question={q} />;
          case InputType.Dropdown:
            return <DropdownQuestionCanvas key={index} question={q} />;
          case InputType.Checkbox:
            return <CheckboxQuestionCanvas key={index} question={q} />;
          case InputType.ShortAnswer:
            return <ShortAnswerQuestionCanvas key={index} question={q} />;
          case InputType.Paragraph:
            return <ParagraphQuestionCanvas key={index} question={q} />;
          default:
            return null;
        }
      })}
      {/* Render other types of questions here if needed */}
    </VStack>
  );
};

export default FormQuestionsCanvas;
