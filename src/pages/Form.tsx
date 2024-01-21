import React from "react";
import { FormHeader } from "../components/form/FormHeader";
import { FormTitle } from "../components/form/FormTitle";
import { FormDescription } from "../components/form/FormDescription";
import { FormQuestion } from "../components/form/FormQuestion";

const questions = [
  {
    question: "Would you be able to join us?",
    inputType: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "What is your meal preference?",
    inputType: "select",
    options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free"],
  },
  // Add more questions as needed
];

const Form = () => {
  return (
    <div
      className="app"
      style={{ backgroundImage: "url(/path-to-your-background-image.jpg)" }}
    >
      <FormHeader />
      <FormTitle />
      <FormDescription />
      <form>
        {questions.map((q, index) => (
          <FormQuestion
            key={index}
            question={q.question}
            inputType={q.inputType}
            options={q.options}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
