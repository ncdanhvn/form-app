import React, { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Question } from "../../types/question";

interface CheckboxQuestionProps {
  question: Question;
  onAnswerValueChange: (selectedOptions: string[]) => void;
}

export const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  question,
  onAnswerValueChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherValue, setOtherValue] = useState("");

  const handleCheckboxChange = (values: string[]) => {
    setSelectedOptions(values);
    if (!values.includes("Other")) {
      onAnswerValueChange(values.filter((v) => v !== "Other"));
    } else {
      onAnswerValueChange([...values.filter((v) => v !== "Other"), otherValue]);
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
    const newSelectedOptions = selectedOptions.includes("Other")
      ? [...selectedOptions.filter((v) => v !== "Other"), e.target.value]
      : [...selectedOptions, e.target.value];
    onAnswerValueChange(newSelectedOptions);
  };

  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question.question}</FormLabel>
      <CheckboxGroup value={selectedOptions} onChange={handleCheckboxChange}>
        <Stack direction="column">
          {question.options.map((option, index) => (
            <Checkbox key={index} value={option}>
              {option}
            </Checkbox>
          ))}
          {question.other && <Checkbox value={"Other"}>Other</Checkbox>}
        </Stack>
      </CheckboxGroup>
      {selectedOptions.includes("Other") && (
        <Input
          placeholder="Please specify"
          value={otherValue}
          onChange={handleOtherInputChange}
        />
      )}
    </FormControl>
  );
};
