import { Box, Heading } from "@chakra-ui/react";
import useCanvasStore from "../../stores/canvasStore";
import { Align } from "../../types/canvas";

interface Props {
  title: string;
}

const FormTitleCanvas = ({ title }: Props) => {
  const {
    title: { backgroundColor, isBold, isItalic, isUnderline, align },
  } = useCanvasStore();

  return (
    <Box bg={backgroundColor} color="white" w={"100%"} py={8} px={4}>
      <Heading
        as="h1"
        size="xl"
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
