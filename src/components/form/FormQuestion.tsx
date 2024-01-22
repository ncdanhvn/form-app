import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Radio,
  Box,
  RadioGroup,
  HStack,
  Flex,
} from "@chakra-ui/react";

interface Props {
  question: string;
  inputType: string;
  options?: string[];
}

export const FormQuestion = ({ question, inputType, options }: Props) => {
  return (
    <FormControl>
      <FormLabel>{question}</FormLabel>
      {inputType === "select" && options ? (
        <Select placeholder="Select option">
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      ) : (
        ""
      )}
      {inputType == "radio" && (
        <Flex justifyContent={"center"}>
          <RadioGroup>
            <HStack gap={4}>
              <Radio>Yes</Radio>
              <Radio>No</Radio>
            </HStack>
          </RadioGroup>
        </Flex>
      )}
    </FormControl>
  );
};
