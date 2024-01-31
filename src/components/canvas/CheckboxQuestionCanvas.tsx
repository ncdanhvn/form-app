import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Question } from "../../types/question";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";
import RequiredMarker from "../RequiredMarker";

interface CheckboxQuestionProps {
  question: Question;
}

const CheckboxQuestionCanvas: React.FC<CheckboxQuestionProps> = ({
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
      <CheckboxGroup>
        <Stack direction="column">
          {question.options.map((option, index) => (
            <Checkbox key={index} value={option}>
              {option}
            </Checkbox>
          ))}
          {question.other && <Checkbox value={"Other"}>Other</Checkbox>}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
};

export default CheckboxQuestionCanvas;
