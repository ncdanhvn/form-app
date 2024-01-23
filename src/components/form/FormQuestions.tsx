import React, { useState } from "react";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { DropdownQuestion } from "./DropdownQuestion";
import { CheckboxQuestion } from "./CheckboxQuestion";
import { VStack } from "@chakra-ui/react";
import { ParagraphQuestion } from "./ParagraphQuestion";
import { ShortAnswerQuestion } from "./ShortAnswerQuestion";
import { loadQuestions } from "../../services/firestoreService";
import { InputType } from "../../types/question";

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

const formUid = "7DgXAwHJQPrNVK1HS7kg";
const questions = await loadQuestions(formUid);

interface Props {
  handleAnswerChange: (question: string, value: string | string[]) => void;
}

export const FormQuestions = ({ handleAnswerChange }: Props) => {
  return (
    <VStack gap={4}>
      {questions.map((q, index) => {
        switch (q.inputType) {
          case InputType.MultiChoices:
            return (
              <MultipleChoiceQuestion
                key={index}
                question={q.question}
                options={q.options!}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
          case InputType.Dropdown:
            return (
              <DropdownQuestion
                key={index}
                question={q.question}
                options={q.options!}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
          case InputType.Checkbox:
            return (
              <CheckboxQuestion
                key={index}
                question={q.question}
                options={q.options!}
                onChange={(selectedOptions) =>
                  handleAnswerChange(q.question, selectedOptions)
                }
              />
            );
          case InputType.ShortAnswer:
            return (
              <ShortAnswerQuestion
                key={index}
                question={q.question}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
          case InputType.Paragraph:
            return (
              <ParagraphQuestion
                key={index}
                question={q.question}
                onChange={(value) => handleAnswerChange(q.question, value)}
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
