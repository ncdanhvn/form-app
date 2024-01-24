import { Box, Text, VStack } from "@chakra-ui/react";

interface Props {
  description: string;
}

const FormDescription = ({ description }: Props) => {
  return (
    <Box textAlign={"center"} color={"blue.600"}>
      {description}
    </Box>
  );
};

export default FormDescription;
