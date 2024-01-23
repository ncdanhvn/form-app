import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface ShortAnswerQuestionProps {
  question: string;
  onChange: (value: string) => void;
}

export const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  question,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question}</FormLabel>
      <Input onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};
