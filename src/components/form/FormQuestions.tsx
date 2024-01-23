import React, { useState } from "react";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { DropdownQuestion } from "./DropdownQuestion";
import { CheckboxQuestion } from "./CheckboxQuestion";
import { VStack } from "@chakra-ui/react";
import { ParagraphQuestion } from "./ParagraphQuestion";
import { ShortAnswerQuestion } from "./ShortAnswerQuestion";

const questions = [
  {
    question: "Question example here",
    inputType: "checkbox",
    options: ["Option 1", "Option 2", "Option 3", "Other"],
  },
  {
    question: "What is your meal preference?",
    inputType: "multiple-choice",
    options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free", "Other"],
  },
  {
    question: "What is your meal preference?",
    inputType: "dropdown",
    options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free"],
  },
  {
    question: "Example of short answer question?",
    inputType: "short-answer",
    options: [],
  },
  {
    question: "Example of paragraph question?",
    inputType: "paragraph",
    options: [],
  },
  // You can add more questions here
];

interface Props {
  handleAnswerChange: (question: string, value: string | string[]) => void;
}

export const FormQuestions = ({ handleAnswerChange }: Props) => {
  return (
    <VStack gap={4}>
      {questions.map((q, index) => {
        switch (q.inputType) {
          case "multiple-choice":
            return (
              <MultipleChoiceQuestion
                key={index}
                question={q.question}
                options={q.options}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
          case "dropdown":
            return (
              <DropdownQuestion
                key={index}
                question={q.question}
                options={q.options}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
          case "checkbox":
            return (
              <CheckboxQuestion
                key={index}
                question={q.question}
                options={q.options}
                onChange={(selectedOptions) =>
                  handleAnswerChange(q.question, selectedOptions)
                }
              />
            );
          case "short-answer":
            return (
              <ShortAnswerQuestion
                key={index}
                question={q.question}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
          case "paragraph":
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
