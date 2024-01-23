import React, { useState } from "react";
import { RadioGroup, Radio, Stack, Input } from "@chakra-ui/react";

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  onChange: (value: string) => void; // For passing the selected value back to the parent
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [otherValue, setOtherValue] = useState("");

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    if (nextValue !== "Other") {
      onChange(nextValue);
    } else {
      onChange(otherValue);
    }
  };

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <p>{question}</p>
      <RadioGroup onChange={handleChange} value={value}>
        <Stack direction="column">
          {options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {value === "Other" && (
        <Input
          placeholder="Please specify"
          value={otherValue}
          onChange={handleOtherChange}
        />
      )}
    </div>
  );
};
