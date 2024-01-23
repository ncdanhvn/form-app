import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

interface DropdownQuestionProps {
  question: string;
  options: string[];
  onChange: (value: string) => void;
}

export const DropdownQuestion: React.FC<DropdownQuestionProps> = ({
  question,
  options,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question}</FormLabel>
      <Select
        placeholder="Select option"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
