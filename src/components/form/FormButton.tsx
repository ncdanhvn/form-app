import { Button, Flex, Spinner } from "@chakra-ui/react";
import useCanvasStore from "../../stores/canvasStore";
import useButtonToolbarStore from "../../stores/toolbarStore/buttonToolbarStore";

const FormButton = ({ isSubmiting }: { isSubmiting: boolean }) => {
  const {
    submitButton: { bgColor },
  } = useCanvasStore();

  const { bold, italic, underline, align, textColor, fontFamily, fontSize } =
    useButtonToolbarStore();

  return (
    <Flex justifyContent={align} width="full" mt={8} px={8}>
      <Button
        // onSubmit={onButtonClick}
        bg={bgColor}
        fontSize={`${fontSize}`}
        fontFamily={`${fontFamily}, sans-serif`}
        fontWeight={bold ? "bold" : "normal"}
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={underline ? "underline" : "normal"}
        color={textColor}
        // onClick={onButtonClick}
        sx={{
          position: "relative",
          overflow: "hidden",
          _hover: {
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              opacity: 0.15,
              pointerEvents: "none",
              transition: "opacity 0.3s ease-in-out",
            },
          },
        }}
        isDisabled={isSubmiting}
        width={"80px"}
        type="submit"
      >
        {isSubmiting ? <Spinner color={textColor} size={"sm"} /> : "Submit"}
      </Button>
    </Flex>
  );
};

export default FormButton;
