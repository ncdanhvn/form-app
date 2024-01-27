import { VStack } from "@chakra-ui/react";
import { InputType, Question } from "../../types/question";
import MultipleChoiceQuestionCanvas from "./MultipleChoiceQuestionCanvas";
import DropdownQuestionCanvas from "./DropdownQuestionCanvas";

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
          // case InputType.Checkbox:
          //   return (
          //     <CheckboxQuestion
          //       key={index}
          //       question={q}
          //       onAnswerValueChange={(newAnswerValue) =>
          //         handleAnswerChange(q.questionUid, newAnswerValue)
          //       }
          //     />
          //   );
          // case InputType.ShortAnswer:
          //   return (
          //     <ShortAnswerQuestion
          //       key={index}
          //       question={q}
          //       onChange={(value) => handleAnswerChange(q.questionUid, value)}
          //     />
          //   );
          // case InputType.Paragraph:
          //   return (
          //     <ParagraphQuestion
          //       key={index}
          //       question={q}
          //       onChange={(value) => handleAnswerChange(q.questionUid, value)}
          //     />
          //   );
          default:
            return null;
        }
      })}
      {/* Render other types of questions here if needed */}
    </VStack>
  );
};

export default FormQuestionsCanvas;
