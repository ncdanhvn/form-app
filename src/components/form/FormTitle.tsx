import { Box, Heading } from "@chakra-ui/react";
import useCanvasStore from "../../stores/canvasStore";
import useTitleToolbarStore from "../../stores/toolbarStore/titleToolbarStore";

interface Props {
  title: string;
}

const FormTitle = ({ title }: Props) => {
  const {
    title: { backgroundColor },
  } = useCanvasStore();

  const { bold, italic, underline, align, textColor, fontFamily, fontSize } =
    useTitleToolbarStore();

  return (
    <Box bg={backgroundColor} w={"100%"} py={8} px={8}>
      <Heading
        as="h1"
        fontSize={`${fontSize}`}
        fontFamily={`${fontFamily}, sans-serif`}
        fontWeight={bold ? "bold" : "normal"}
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={underline ? "underline" : "normal"}
        textAlign={align}
        color={textColor}
      >
        {title}
      </Heading>
    </Box>
  );
};

export default FormTitle;
