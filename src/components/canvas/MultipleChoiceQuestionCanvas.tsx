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
}

const MultipleChoiceQuestionCanvas: React.FC<Props> = ({ question }) => {
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
      <RadioGroup value={""}>
        <Stack direction="column">
          {question.options.map((option, index) => (
            <Radio key={index} value={option} px={2}>
              {option}
            </Radio>
          ))}
          {question.other && (
            <Radio value={"Other"} px={2}>
              Other
            </Radio>
          )}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default MultipleChoiceQuestionCanvas;
