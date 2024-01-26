import React from "react";
import { IconButton, Box, Select, Input } from "@chakra-ui/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { CanvasItems } from "../types/canvas";

export interface SetFormatStates {
  setBold: (isBold: boolean) => void;
}

export interface FormatState {
  isBold: boolean;
}

interface Props {
  formatStates: FormatState;
  setFormatStates: SetFormatStates;
}

const FormatTextToolbar: React.FC<Props> = ({
  formatStates: { isBold },
  setFormatStates,
}) => {
  const handleBoldClick = () => {
    setFormatStates.setBold(!isBold);
    console.log(`Format toolbar trigger set bold to ${!isBold}`);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        icon={<FaBold />} // Bold icon
        onClick={handleBoldClick}
        aria-label="Bold"
        bg={isBold ? "blue.500" : "gray.100"} // Change colors as per your theme
        color={isBold ? "white" : "black"}
        border={isBold ? "2px solid blue.500" : "none"}
        _hover={{
          bg: isBold ? "blue.600" : "gray.200",
        }}
      />
    </Box>
  );
};

export default FormatTextToolbar;
