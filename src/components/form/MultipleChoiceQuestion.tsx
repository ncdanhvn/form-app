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

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswerValueChange: (newAnswerValue: string) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswerValueChange,
}) => {
  const [answerValue, setAnswerValue] = useState("");
  const [otherValue, setOtherValue] = useState("");

  const handleSelectionChange = (newSelection: string) => {
    setAnswerValue(newSelection);
    if (newSelection !== "Other") {
      onAnswerValueChange(newSelection);
    } else {
      onAnswerValueChange(otherValue);
    }
  };

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(event.target.value);
    onAnswerValueChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question.question}</FormLabel>
      <RadioGroup onChange={handleSelectionChange} value={answerValue}>
        <Stack direction="column">
          {question.options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
          {question.other && <Radio value={"Other"}>Other</Radio>}
        </Stack>
      </RadioGroup>
      {answerValue === "Other" && (
        <Input
          placeholder="Please specify"
          value={otherValue}
          onChange={handleOtherChange}
        />
      )}
    </FormControl>
  );
};
