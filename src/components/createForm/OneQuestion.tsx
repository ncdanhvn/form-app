import { Box, Input, Select } from "@chakra-ui/react";
import { InputType, Question } from "../../types/question";
import CreateMultiOptionsQuestion from "./CreateMultiOptionsQuestion";
import QuestionFooter from "./QuestionFooter";

interface Props {
  index: number;
  question: Question;
  onUpdateQuestion: (index: number, updatedQuestion: Question) => void;
  deleteQuestion: (index: number) => void;
}

const OneQuestion = ({
  index,
  question,
  onUpdateQuestion,
  deleteQuestion,
}: Props) => {
  return (
    <Box
      key={index}
      p={4}
      borderWidth="2px"
      borderColor={"black.100"}
      borderRadius="lg"
      w={"100%"}
      sx={{
        transition: "border-color 0.2s ease, border-width 0.2s ease",
        ":hover": {
          borderColor: "blue.500",
          borderWidth: "2px",
        },
      }}
    >
      {/* Question & Question Types */}
      <Input
        value={question.question}
        onChange={(e) =>
          onUpdateQuestion(index, {
            ...question,
            question: e.target.value,
          })
        }
        variant="flushed"
        placeholder="The question goes here"
        fontWeight={600}
        mb={2}
        w={"100%"}
      />
      <Select
        value={question.inputType}
        onChange={(e) =>
          onUpdateQuestion(index, {
            ...question,
            inputType: e.target.value as InputType,
          })
        }
        mb={2}
      >
        {Object.values(InputType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
      {/* Options */}
      {[
        InputType.Dropdown,
        InputType.Checkbox,
        InputType.MultiChoices,
      ].includes(question.inputType) && (
        <CreateMultiOptionsQuestion
          index={index}
          question={question}
          onUpdateQuestion={onUpdateQuestion}
          inputType={question.inputType}
          key={index}
        />
      )}
      {/* Footer */}
      <QuestionFooter
        index={index}
        question={question}
        onUpdateQuestion={onUpdateQuestion}
        deleteQuestion={deleteQuestion}
        key={index}
      />
    </Box>
  );
};

export default OneQuestion;
