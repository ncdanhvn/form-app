import { Box, Text, VStack } from "@chakra-ui/react";

export const FormDescription = () => {
  return (
    <Box textAlign={"center"} color={"blue.600"}>
      <VStack>
        <Text>You are invited! To our daughter's birthday.</Text>
        <Text>Do join in the fun and fete.</Text>
        <Text>On: 22-04-15 | At: 07:30 pm | In: Our House</Text>
      </VStack>
    </Box>
  );
};
