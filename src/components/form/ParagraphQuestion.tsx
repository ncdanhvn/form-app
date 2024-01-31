import React from "react";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { Question } from "../../types/question";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import RequiredMarker from "../RequiredMarker";

interface ParagraphQuestionProps {
  question: Question;
  onChange: (value: string) => void;
}

export const ParagraphQuestion: React.FC<ParagraphQuestionProps> = ({
  question,
  onChange,
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
      <Textarea mx={2} onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};
