import React from "react";
import { Box, Radio } from "@chakra-ui/react";

const NonReactRadioButton = () => {
  return (
    <Box pointerEvents={"none"} mt={2}>
      <Radio
        isReadOnly // Makes the radio button not change its state
        sx={{
          "&, .chakra-radio__control": {
            cursor: "default", // Set cursor to default for the whole component and control
          },
          pointerEvents: "none", // Disable pointer events for the whole component
          ".chakra-radio__control": {
            _hover: {
              bg: "transparent", // Keep background transparent on hover
            },
          },
        }}
      />
    </Box>
  );
};

export default NonReactRadioButton;
