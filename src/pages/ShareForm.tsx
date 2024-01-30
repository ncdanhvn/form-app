import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  useToast,
  Flex,
  Center,
  HStack,
} from "@chakra-ui/react";

const formUrlPrefix = import.meta.env.VITE_FORM_PREFIX_URL;

interface Props {
  formUid: string;
}

const ShareForm: React.FC<Props> = ({ formUid }) => {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formUid);
      toast({
        title: "Copied to clipboard",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <HStack mt={8} justifyContent={"center"} alignItems={"center"} spacing={2}>
      <Text>You can share Form at this URL: </Text>
      <Text color="teal.500" fontWeight="bold">
        {`${formUrlPrefix}${formUid}`}
      </Text>
      <Button
        px={2}
        onClick={handleCopy}
        color={"gray.500"}
        fontStyle={"oblique"}
        fontWeight={"normal"}
        variant={"ghost"}
      >
        copy URL
      </Button>
    </HStack>
  );
};

export default ShareForm;
