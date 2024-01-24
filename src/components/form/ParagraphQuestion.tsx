import React from "react";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { Question } from "../../types/question";

interface ParagraphQuestionProps {
  question: Question;
  onChange: (value: string) => void;
}

export const ParagraphQuestion: React.FC<ParagraphQuestionProps> = ({
  question,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question.question}</FormLabel>
      <Textarea onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};
