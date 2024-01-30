import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => {
  return (
    <Center height="100vh">
      <Spinner size="xl" />
    </Center>
  );
};

export default Loading;
