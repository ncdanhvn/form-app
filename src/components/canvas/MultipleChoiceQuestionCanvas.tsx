import React, { useState } from "react";
import {
  RadioGroup,
  Radio,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Question } from "../../types/question";

interface Props {
  question: Question;
}

const MultipleChoiceQuestionCanvas: React.FC<Props> = ({ question }) => {
  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question.question}</FormLabel>
      <RadioGroup value={""}>
        <Stack direction="column">
          {question.options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
          {question.other && <Radio value={"Other"}>Other</Radio>}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default MultipleChoiceQuestionCanvas;
