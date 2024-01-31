import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Question } from "../../types/question";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import RequiredMarker from "../RequiredMarker";

interface DropdownQuestionProps {
  question: Question;
  onChange: (value: string) => void;
}

export const DropdownQuestion: React.FC<DropdownQuestionProps> = ({
  question,
  onChange,
}) => {
  const { bold, italic, underline, textColor, fontFamily, fontSize } =
    useQuestionToolbarStore();

  return (
    <FormControl isRequired={question.required}>
      <FormLabel
        fontSize={`${fontSize}`}
        fontFamily={`${fontFamily}, sans-serif`}
        fontWeight={bold ? "bold" : "normal"}
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={underline ? "underline" : "normal"}
        color={textColor}
      >
        {question.question}
      </FormLabel>
      <Select
        placeholder="Select option"
        onChange={(e) => onChange(e.target.value)}
        px={2}
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
