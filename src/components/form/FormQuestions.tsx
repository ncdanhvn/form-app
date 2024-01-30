import { VStack } from "@chakra-ui/react";
import { InputType, Question } from "../../types/question";
import { CheckboxQuestion } from "./CheckboxQuestion";
import { DropdownQuestion } from "./DropdownQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { ParagraphQuestion } from "./ParagraphQuestion";
import { ShortAnswerQuestion } from "./ShortAnswerQuestion";

interface Props {
  questions: Question[];
  handleAnswerChange: (
    questionUid: string,
    newValue: string | string[]
  ) => void;
}

export const FormQuestions = ({ handleAnswerChange, questions }: Props) => {
  return (
    <VStack gap={4}>
      {questions.map((q, index) => {
        switch (q.inputType) {
          case InputType.MultiChoices:
            return (
              <MultipleChoiceQuestion
                key={index}
                question={q}
                onAnswerValueChange={(newAnswerValue) =>
                  handleAnswerChange(q.questionUid, newAnswerValue)
                }
              />
            );
          case InputType.Dropdown:
            return (
              <DropdownQuestion
                key={index}
                question={q}
                onChange={(value) => handleAnswerChange(q.questionUid, value)}
              />
            );
          case InputType.Checkbox:
            return (
              <CheckboxQuestion
                key={index}
                question={q}
                onAnswerValueChange={(newAnswerValue) =>
                  handleAnswerChange(q.questionUid, newAnswerValue)
                }
              />
            );
          case InputType.ShortAnswer:
            return (
              <ShortAnswerQuestion
                key={index}
                question={q}
                onChange={(value) => handleAnswerChange(q.questionUid, value)}
              />
            );
          case InputType.Paragraph:
            return (
              <ParagraphQuestion
                key={index}
                question={q}
                onChange={(value) => handleAnswerChange(q.questionUid, value)}
              />
            );
          default:
            return null;
        }
      })}
      {/* Render other types of questions here if needed */}
    </VStack>
  );
};
