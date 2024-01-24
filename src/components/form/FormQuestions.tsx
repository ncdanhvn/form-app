import { VStack } from "@chakra-ui/react";
import { InputType, Question } from "../../types/question";
import { CheckboxQuestion } from "./CheckboxQuestion";
import { DropdownQuestion } from "./DropdownQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { ParagraphQuestion } from "./ParagraphQuestion";
import { ShortAnswerQuestion } from "./ShortAnswerQuestion";

// const questions = [
//   {
//     question: "Question example here",
//     inputType: "checkbox",
//     options: ["Option 1", "Option 2", "Option 3", "Other"],
//   },
//   {
//     question: "What is your meal preference?",
//     inputType: "multiple-choice",
//     options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free", "Other"],
//   },
//   {
//     question: "What is your meal preference?",
//     inputType: "dropdown",
//     options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free"],
//   },
//   {
//     question: "Example of short answer question?",
//     inputType: "short-answer",
//     options: [],
//   },
//   {
//     question: "Example of paragraph question?",
//     inputType: "paragraph",
//     options: [],
//   },
//   // You can add more questions here
// ];

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
