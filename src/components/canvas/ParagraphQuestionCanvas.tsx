import React from "react";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { Question } from "../../types/question";
import useQuestionToolbarStore from "../../stores/toolbarStore/questionToolbarStore";

interface Props {
  question: Question;
}

const ParagraphQuestionCanvas: React.FC<Props> = ({ question }) => {
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
      </FormLabel>
      <Textarea mx={2} />
    </FormControl>
  );
};

export default ParagraphQuestionCanvas;
