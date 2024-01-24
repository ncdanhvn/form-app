import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Question } from "../../types/question";

interface DropdownQuestionProps {
  question: Question;
  onChange: (value: string) => void;
}

export const DropdownQuestion: React.FC<DropdownQuestionProps> = ({
  question,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question.question}</FormLabel>
      <Select
        placeholder="Select option"
        onChange={(e) => onChange(e.target.value)}
      >
        {question.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
