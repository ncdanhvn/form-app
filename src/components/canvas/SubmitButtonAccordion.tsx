import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ColorResult, SketchPicker } from "react-color";
import useCanvasStore from "../../stores/canvasStore";
import useButtonToolbarStore from "../../stores/toolbarStore/buttonToolbarStore";
import FormatTextToolbar from "../FormatTextToolbar";

const sketchPickerStyle = {
  default: {
    picker: {
      width: "236px",
    },
  },
};

const SubmitButtonAccordion = () => {
  const {
    submitButton: { bgColor, setBgColor },
  } = useCanvasStore();

  return (
    <VStack align={"normal"} spacing={4}>
      <HStack>
        <Text fontSize={"medium"} color={"GrayText"}>
          Background color
        </Text>
        <Popover>
          <PopoverTrigger>
            <Button
              bgColor={bgColor}
              size={"sm"}
              _hover={{
                bgColor: bgColor,
                transform: "none",
              }}
            />
          </PopoverTrigger>
          <PopoverContent width="auto" maxWidth="fit-content">
            <PopoverArrow />
            <PopoverBody>
              <SketchPicker
                color={bgColor}
                onChangeComplete={(color: ColorResult) => {
                  setBgColor(color.hex);
                }}
                styles={sketchPickerStyle}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <FormatTextToolbar useToolbarStore={useButtonToolbarStore} />
    </VStack>
  );
};

export default SubmitButtonAccordion;
