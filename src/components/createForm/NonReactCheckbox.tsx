import React from "react";
import { Checkbox } from "@chakra-ui/react";

const NonReactCheckbox = () => {
  return (
    <Checkbox
      sx={{
        ".chakra-checkbox__control": {
          cursor: "default", // Set cursor to default
          _hover: {
            bg: "transparent", // Keep background transparent on hover
          },
        },
        pointerEvents: "none", // Disable pointer events
      }}
    />
  );
};

export default NonReactCheckbox;
