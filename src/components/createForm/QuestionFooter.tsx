import { DeleteIcon } from "@chakra-ui/icons";
import { Switch, Divider, HStack, IconButton } from "@chakra-ui/react";
import { Question } from "../../types/question";

interface Props {
  index: number;
  question: Question;
  onUpdateQuestion: (index: number, updatedQuestion: Question) => void;
  deleteQuestion: (index: number) => void;
}

const QuestionFooter = ({
  index,
  question,
  onUpdateQuestion,
  deleteQuestion,
}: Props) => {
  return (
    <>
      <Divider my={4} />
      <HStack justifyContent="end" spacing={4}>
        <Switch
          isChecked={question.required}
          onChange={(e) => {
            const updatedQuestion = {
              ...question,
              required: e.target.checked,
            };
            onUpdateQuestion(index, updatedQuestion);
          }}
          size={"sm"}
        >
          Required
        </Switch>
        <IconButton
          aria-label="Delete question"
          icon={<DeleteIcon />}
          onClick={() => deleteQuestion(index)}
        />
      </HStack>
    </>
  );
};

export default QuestionFooter;
