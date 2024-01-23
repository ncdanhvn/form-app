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
      <Input
        value={question.question}
        onChange={(e) =>
          onUpdateQuestion(index, { ...question, question: e.target.value })
        }
        variant="flushed"
        placeholder="Your question goes here"
        fontWeight={600}
        mb={2}
        w={"100%"}
      />
      {question.options.map((option, optIndex) => {
        return (
          <HStack key={optIndex} spacing={4} mb={2} align={"center"}>
            {inputType === InputType.Checkbox && <NonReactCheckbox />}
            <Input
              key={optIndex}
              value={option}
              variant="flushed"
              onChange={(e) => handleOptionChange(optIndex, e.target.value)}
              placeholder={`Option ${optIndex + 1}`}
            />
            <IconButton
              aria-label="Delete option"
              icon={<CloseIcon />}
              onClick={() => deleteOption(optIndex)}
              size="xs"
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
