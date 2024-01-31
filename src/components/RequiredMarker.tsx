import React from "react";
import { Text } from "@chakra-ui/react";

const RequiredMarker: React.FC = () => {
  return (
    <Text as="span" color="red.500" ml={1} aria-label="required">
      *
    </Text>
  );
};

export default RequiredMarker;
