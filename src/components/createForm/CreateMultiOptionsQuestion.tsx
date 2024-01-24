import React from "react";
import {
  Box,
  Input,
  Button,
  Checkbox,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Question, InputType } from "../../types/question";
import NonReactCheckbox from "./NonReactCheckbox";

interface Props {
  question: Question;
  index: number;
  onUpdateQuestion: (index: number, question: Question) => void;
  inputType: InputType;
}

const CreateMultiOptionsQuestion: React.FC<Props> = ({
  question,
  index,
  onUpdateQuestion,
  inputType,
}) => {
  const handleOptionChange = (optionIndex: number, value: string) => {
    const newOptions = [...question.options!];
    newOptions[optionIndex] = value;
    onUpdateQuestion(index, { ...question, options: newOptions });
  };

  const addOption = () => {
    const newOption = "";
    const newOptions = [...question.options, newOption];
    onUpdateQuestion(index, { ...question, options: newOptions });
  };

  const deleteOption = (optionIndex: number) => {
    const newOptions = question.options.filter((_, idx) => idx !== optionIndex);
    onUpdateQuestion(index, { ...question, options: newOptions });
  };

  const handleOtherOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateQuestion(index, {
      ...question,
      other: question.other === undefined ? "" : undefined,
    });
  };

  return (
    <Box>
      {question.options.map((option, optIndex) => {
        return (
          <HStack
            key={optIndex}
            spacing={4}
            mb={2}
            align={"center"}
            position={"relative"}
            sx={{
              "&:hover #delete-option-button": {
                opacity: 1,
              },
            }}
          >
            {inputType === InputType.Checkbox && <NonReactCheckbox />}
            <Input
              key={optIndex}
              value={option}
              variant="flushed"
              onChange={(e) => handleOptionChange(optIndex, e.target.value)}
              placeholder={`Option ${optIndex + 1}`}
            />
            <IconButton
              id="delete-option-button"
              aria-label="Delete option"
              icon={<CloseIcon />}
              onClick={() => deleteOption(optIndex)}
              size="xs"
              sx={{
                position: "absolute",
                right: 0, // Adjust as needed
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            />
          </HStack>
        );
      })}
      <Button onClick={addOption} my={2}>
        Add Option
      </Button>
      {inputType !== InputType.Dropdown && (
        <Box>
          <Checkbox
            isChecked={!(question.other === undefined)}
            onChange={handleOtherOptionChange}
            mb={2}
          >
            Include "Other" option
          </Checkbox>
        </Box>
      )}
    </Box>
  );
};

export default CreateMultiOptionsQuestion;
