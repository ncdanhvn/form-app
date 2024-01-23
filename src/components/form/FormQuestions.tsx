import React, { useState } from "react";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { DropdownQuestion } from "./DropdownQuestion";

const questions = [
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
  // You can add more questions here
];

export const FormQuestions = () => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
    console.log(`${question} | ${value}`);
  };

  return (
    <>
      {questions.map((q, index) => {
        let rt;
        switch (q.inputType) {
          case "multiple-choice":
            rt = (
              <MultipleChoiceQuestion
                key={index}
                question={q.question}
                options={q.options}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
            break;
          case "dropdown":
            rt = (
              <DropdownQuestion
                key={index}
                question={q.question}
                options={q.options}
                onChange={(value) => handleAnswerChange(q.question, value)}
              />
            );
            break;
        }

        return rt;
      })}
      {/* Render other types of questions here if needed */}
    </>
  );
};
