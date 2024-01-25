import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { Box } from "@chakra-ui/react";

function ColorPicker() {
  const [color, setColor] = useState<string>("#fff");

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
    // You can also call a function to pass the color value
    // For example, if you want to update a parent component's state
  };

  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={3}>
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
    </Box>
  );
}

export default ColorPicker;
