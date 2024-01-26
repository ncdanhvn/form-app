import {
  Box,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { ColorResult, SketchPicker } from "react-color";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaMinus,
  FaPaintBrush,
  FaPlus,
  FaUnderline,
} from "react-icons/fa";
import fonts from "../resources/fontResources";
import { Align } from "../types/canvas";

const sketchPickerStyle = {
  default: {
    picker: {
      width: "236px",
    },
  },
};

export interface FormatState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  align: Align;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

export interface SetFormatStates {
  setBold: (isBold: boolean) => void;
  setItalic: (isItalic: boolean) => void;
  setUnderline: (isUnderline: boolean) => void;
  setAlign: (align: Align) => void;
  setFontSize: (fontSize: number) => void;
  setFontFamily: (fontFamily: string) => void;
  setTextColor: (color: string) => void;
}

interface Props {
  formatStates: FormatState;
  setFormatStates: SetFormatStates;
}

const FormatTextToolbar: React.FC<Props> = ({
  formatStates: {
    isBold,
    isItalic,
    isUnderline,
    align,
    fontSize,
    fontFamily,
    textColor,
  },
  setFormatStates: {
    setBold,
    setItalic,
    setUnderline,
    setAlign,
    setFontSize,
    setFontFamily,
    setTextColor,
  },
}) => {
  const onClickBold = () => {
    setBold(!isBold);
  };
  const onClickItalic = () => {
    setItalic(!isItalic);
  };
  const onClickUnderline = () => {
    setUnderline(!isUnderline);
  };
  const onClickAlign = (align: Align) => {
    setAlign(align);
  };
  const onFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    if (!isNaN(newSize)) {
      setFontSize(newSize);
    }
  };
  const incrementFontSize = () => {
    setFontSize(fontSize + 2);
  };
  const decrementFontSize = () => {
    if (fontSize > 2) {
      setFontSize(fontSize - 2);
    }
  };
  const onFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(event.target.value);
  };

  return (
    <VStack align={"normal"} spacing={3}>
      <HStack spacing={3}>
        <Box display="flex" alignItems="center" gap={1}>
          {ToggleButton(<FaBold></FaBold>, isBold, onClickBold)}
          {ToggleButton(<FaItalic></FaItalic>, isItalic, onClickItalic)}
          {ToggleButton(
            <FaUnderline></FaUnderline>,
            isUnderline,
            onClickUnderline
          )}
        </Box>
        <Box>
          {ToggleButton(<FaAlignLeft></FaAlignLeft>, align === Align.Left, () =>
            onClickAlign(Align.Left)
          )}
          {ToggleButton(
            <FaAlignCenter></FaAlignCenter>,
            align === Align.Center,
            () => onClickAlign(Align.Center)
          )}
          {ToggleButton(
            <FaAlignRight></FaAlignRight>,
            align === Align.Right,
            () => onClickAlign(Align.Right)
          )}
        </Box>
        <Popover>
          <PopoverTrigger>
            <IconButton
              icon={<FaPaintBrush />}
              aria-label="Text Color"
              size={"sm"}
            />
          </PopoverTrigger>
          <PopoverContent width="auto" maxWidth="fit-content">
            <PopoverArrow />
            <PopoverBody>
              <SketchPicker
                color={textColor}
                onChangeComplete={(color: ColorResult) => {
                  setTextColor(color.hex);
                }}
                styles={sketchPickerStyle}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <HStack spacing={3}>
        <Select value={fontFamily} onChange={onFontFamilyChange} size="sm">
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </Select>
        <HStack spacing={1}>
          {ToggleButton(<FaMinus />, false, decrementFontSize)}
          <Input
            type="number"
            value={fontSize}
            onChange={onFontSizeChange}
            size="sm"
            width="36px" // Adjust width as needed
            p={2}
          />
          {/* <Text size="sm">{fontSize}</Text> */}
          {ToggleButton(<FaPlus />, false, incrementFontSize)}
        </HStack>
      </HStack>
    </VStack>
  );

  function ToggleButton(
    icon: React.ReactElement,
    value: boolean,
    onClick: (value: boolean) => void
  ) {
    return (
      <IconButton
        icon={icon}
        onClick={() => onClick(value)}
        aria-label="Bold"
        bg={value ? "blue.500" : "gray.100"} // Change colors as per your theme
        color={value ? "white" : "black"}
        border={value ? "2px solid blue.500" : "none"}
        _hover={{
          bg: value ? "blue.600" : "gray.200",
        }}
        size={"sm"}
      />
    );
  }
};

export default FormatTextToolbar;
