import { Box, Heading } from "@chakra-ui/react";
import useCanvasStore from "../../stores/canvasStore";

interface Props {
  title: string;
}

const FormTitleCanvas = ({ title }: Props) => {
  const {
    title: { isBold, backgroundColor },
  } = useCanvasStore();

  return (
    <Box
      bg={backgroundColor}
      color="white"
      w={"100%"}
      textAlign={"center"}
      py={8}
    >
      <Heading
        as="h1"
        size="xl"
        fontFamily="Grape Nuts, sans-serif"
        fontWeight={isBold ? "bold" : "normal"}
      >
        {title}
      </Heading>
    </Box>
  );
};

export default FormTitleCanvas;
