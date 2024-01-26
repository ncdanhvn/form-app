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
import useTitleToolbarStore from "../../stores/toolbarStore/titleToolbarStore";
import FormatTextToolbar from "../FormatTextToolbar";

const sketchPickerStyle = {
  default: {
    picker: {
      width: "236px",
    },
  },
};

const TitleAccordion = () => {
  const {
    title: { backgroundColor, setTitleBgColor },
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
              bgColor={backgroundColor}
              size={"sm"}
              _hover={{
                bgColor: backgroundColor,
                transform: "none",
              }}
            />
          </PopoverTrigger>
          <PopoverContent width="auto" maxWidth="fit-content">
            <PopoverArrow />
            <PopoverBody>
              <SketchPicker
                color={backgroundColor}
                onChangeComplete={(color: ColorResult) => {
                  setTitleBgColor(color.hex);
                }}
                styles={sketchPickerStyle}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <FormatTextToolbar useToolbarStore={useTitleToolbarStore} />
    </VStack>
  );
};

export default TitleAccordion;
