import React from "react";
import { IconButton, Box, Select, Input, HStack } from "@chakra-ui/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { Align } from "../types/canvas";

export interface FormatState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  align: Align;
}

export interface SetFormatStates {
  setBold: (isBold: boolean) => void;
  setItalic: (isItalic: boolean) => void;
  setUnderline: (isUnderline: boolean) => void;
  setAlign: (align: Align) => void;
}

interface Props {
  formatStates: FormatState;
  setFormatStates: SetFormatStates;
}

const FormatTextToolbar: React.FC<Props> = ({
  formatStates: { isBold, isItalic, isUnderline, align },
  setFormatStates: { setBold, setItalic, setUnderline, setAlign },
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

  return (
    <>
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
    </>
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
