import React from "react";
import {
  IconButton,
  Box,
  Select,
  Input,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { Align } from "../types/canvas";

export interface FormatState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  align: Align;
  fontSize: number;
}

export interface SetFormatStates {
  setBold: (isBold: boolean) => void;
  setItalic: (isItalic: boolean) => void;
  setUnderline: (isUnderline: boolean) => void;
  setAlign: (align: Align) => void;
  setFontSize: (fontSize: number) => void;
}

interface Props {
  formatStates: FormatState;
  setFormatStates: SetFormatStates;
}

const FormatTextToolbar: React.FC<Props> = ({
  formatStates: { isBold, isItalic, isUnderline, align, fontSize },
  setFormatStates: { setBold, setItalic, setUnderline, setAlign, setFontSize },
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
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <VStack align={"normal"}>
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
      </HStack>
      <HStack spacing={2}>
        {ToggleButton(<FaMinus />, false, decrementFontSize)}
        <Input
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          size="sm"
          width="36px" // Adjust width as needed
          p={2}
          fontSize={16}
        />
        {/* <Text size="sm">{fontSize}</Text> */}
        {ToggleButton(<FaPlus />, false, incrementFontSize)}
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
