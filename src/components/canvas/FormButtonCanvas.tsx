import { Button, Flex } from "@chakra-ui/react";
import useCanvasStore from "../../stores/canvasStore";
import useButtonToolbarStore from "../../stores/toolbarStore/buttonToolbarStore";

const FormButtonCanvas = () => {
  const {
    submitButton: { bgColor },
  } = useCanvasStore();

  const { bold, italic, underline, align, textColor, fontFamily, fontSize } =
    useButtonToolbarStore();

  return (
    <Flex justifyContent={align} width="full" mt={8} px={8}>
      <Button
        bg={bgColor}
        fontSize={`${fontSize}`}
        fontFamily={`${fontFamily}, sans-serif`}
        fontWeight={bold ? "bold" : "normal"}
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={underline ? "underline" : "normal"}
        color={textColor}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default FormButtonCanvas;
