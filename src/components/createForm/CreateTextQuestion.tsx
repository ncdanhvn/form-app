import React from "react";
import { Box, Input } from "@chakra-ui/react";
import { Question, InputType } from "../../types/question";

interface Props {
  question: Question;
  index: number;
  onUpdateQuestion: (index: number, question: Question) => void;
}

const CreateTextQuestion: React.FC<Props> = ({
  question,
  index,
  onUpdateQuestion,
}) => {
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
    </Box>
  );
};

export default CreateTextQuestion;
