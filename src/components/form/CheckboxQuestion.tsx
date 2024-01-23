import React, { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

interface CheckboxQuestionProps {
  question: string;
  options: string[];
  onChange: (selectedOptions: string[]) => void;
}

export const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  question,
  options,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherValue, setOtherValue] = useState("");

  const handleCheckboxChange = (values: string[]) => {
    setSelectedOptions(values);
    if (!values.includes("Other")) {
      onChange(values.filter((v) => v !== "Other"));
    } else {
      onChange([...values.filter((v) => v !== "Other"), otherValue]);
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
    const newSelectedOptions = selectedOptions.includes("Other")
      ? [...selectedOptions.filter((v) => v !== "Other"), e.target.value]
      : [...selectedOptions, e.target.value];
    onChange(newSelectedOptions);
  };

  return (
    <FormControl>
      <FormLabel fontWeight={600}>{question}</FormLabel>
      <CheckboxGroup value={selectedOptions} onChange={handleCheckboxChange}>
        <Stack direction="column">
          {options.map((option, index) => (
            <Checkbox key={index} value={option}>
              {option}
            </Checkbox>
          ))}
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
