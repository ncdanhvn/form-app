import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Question } from "../../types/question";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import RequiredMarker from "../RequiredMarker";

interface DropdownQuestionProps {
  question: Question;
}

const DropdownQuestionCanvas: React.FC<DropdownQuestionProps> = ({
  question,
}) => {
  const { bold, italic, underline, textColor, fontFamily, fontSize } =
    useQuestionToolbarStore();

  return (
    <FormControl>
      <FormLabel
        fontSize={`${fontSize}`}
        fontFamily={`${fontFamily}, sans-serif`}
        fontWeight={bold ? "bold" : "normal"}
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={underline ? "underline" : "normal"}
        color={textColor}
      >
        {question.question}
        {question.required && <RequiredMarker />}
      </FormLabel>
      <Select placeholder="Select option">
        {question.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownQuestionCanvas;
