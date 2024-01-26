import { Box, Heading } from "@chakra-ui/react";
import useCanvasStore from "../../stores/canvasStore";
import { Align } from "../../types/canvas";

interface Props {
  title: string;
}

const FormTitleCanvas = ({ title }: Props) => {
  const {
    title: { backgroundColor, isBold, isItalic, isUnderline, align, fontSize },
  } = useCanvasStore();

  return (
    <Box bg={backgroundColor} color="white" w={"100%"} py={8} px={4}>
      <Heading
        as="h1"
        fontSize={`${fontSize}`}
        fontFamily="Grape Nuts, sans-serif"
        fontWeight={isBold ? "bold" : "normal"}
        fontStyle={isItalic ? "italic" : "normal"}
        textDecoration={isUnderline ? "underline" : "normal"}
        textAlign={align}
      >
        {title}
      </Heading>
    </Box>
  );
};

export default FormTitleCanvas;
