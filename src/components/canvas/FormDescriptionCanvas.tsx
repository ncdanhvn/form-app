import { Box, Text, VStack } from "@chakra-ui/react";
import useDescriptionToolbarStore from "../../stores/toolbarStore/descriptionToolbarStore";

interface Props {
  description: string;
}

const FormDescriptionCanvas = ({ description }: Props) => {
  const { bold, italic, underline, align, textColor, fontFamily, fontSize } =
    useDescriptionToolbarStore();

  return (
    <Box display={"flex"} justifyContent={align} w={"100%"} px={8} py={4}>
      <Text
        fontSize={`${fontSize}`}
        fontFamily={`${fontFamily}, sans-serif`}
        fontWeight={bold ? "bold" : "normal"}
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={underline ? "underline" : "normal"}
        color={textColor}
      >
        {description}
      </Text>
    </Box>
  );
};

export default FormDescriptionCanvas;
