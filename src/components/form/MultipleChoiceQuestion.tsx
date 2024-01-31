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
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import RequiredMarker from "../RequiredMarker";

interface Props {
  question: Question;
  onAnswerValueChange: (newAnswerValue: string) => void;
}

export const MultipleChoiceQuestion: React.FC<Props> = ({
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
      <RadioGroup onChange={handleSelectionChange} value={answerValue}>
        <Stack direction="column">
          {question.options.map((option, index) => (
            <Radio key={index} value={option} px={2}>
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
