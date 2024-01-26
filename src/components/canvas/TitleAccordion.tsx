import React from "react";
import FormatTextToolbar from "../FormatTextToolbar";
import useCanvasStore from "../../stores/canvasStore";
import {
  HStack,
  VStack,
  Text,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { SketchPicker, ColorResult } from "react-color";
import { FaPaintBrush } from "react-icons/fa";

const sketchPickerStyle = {
  default: {
    picker: {
      width: "236px",
    },
  },
};

const TitleAccordion = () => {
  const {
    title: {
      backgroundColor,
      setTitleBgColor,
      isBold,
      setTitleIsBold,
      isItalic,
      setTitleIsItalic,
      isUnderline,
      setTitleIsUnderline,
      align,
      setTitleAlign,
      fontSize,
      setFontSize,
      fontFamily,
      setFontFamily,
      textColor,
      setTextColor,
    },
  } = useCanvasStore();

  return (
    <VStack align={"normal"} spacing={3}>
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
      <FormatTextToolbar
        formatStates={{
          isBold,
          isItalic,
          isUnderline,
          align,
          fontSize,
          fontFamily,
          textColor,
        }}
        setFormatStates={{
          setBold: setTitleIsBold,
          setItalic: setTitleIsItalic,
          setUnderline: setTitleIsUnderline,
          setAlign: setTitleAlign,
          setFontSize,
          setFontFamily,
          setTextColor,
        }}
      />
    </VStack>
  );
};

export default TitleAccordion;
