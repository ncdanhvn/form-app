import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Question } from "../../types/question";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import RequiredMarker from "../RequiredMarker";

interface ShortAnswerQuestionProps {
  question: Question;
  onChange: (value: string) => void;
}

export const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
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
      <Input onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};
