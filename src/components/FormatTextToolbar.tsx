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
import { UseBoundStore, StoreApi } from "zustand";
import ToolbarState, { Align } from "../stores/toolbarStore/toolbarTypes";

const sketchPickerStyle = {
  default: {
    picker: {
      width: "236px",
    },
  },
};

interface Props {
  useToolbarStore: UseBoundStore<StoreApi<ToolbarState>>;
}

const FormatTextToolbar: React.FC<Props> = ({ useToolbarStore }) => {
  const {
    bold,
    setBold,
    italic,
    setItalic,
    underline,
    setUnderline,
    align,
    setAlign,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    textColor,
    setTextColor,
  } = useToolbarStore();

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
          {ToggleButton(<FaBold></FaBold>, bold, () => setBold(!bold))}
          {ToggleButton(<FaItalic></FaItalic>, italic, () =>
            setItalic(!italic)
          )}
          {ToggleButton(<FaUnderline></FaUnderline>, underline, () =>
            setUnderline(!underline)
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          {ToggleButton(<FaAlignLeft></FaAlignLeft>, align === Align.Left, () =>
            setAlign(Align.Left)
          )}
          {ToggleButton(
            <FaAlignCenter></FaAlignCenter>,
            align === Align.Center,
            () => setAlign(Align.Center)
          )}
          {ToggleButton(
            <FaAlignRight></FaAlignRight>,
            align === Align.Right,
            () => setAlign(Align.Right)
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
      <HStack spacing={3} width={"264px"}>
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
