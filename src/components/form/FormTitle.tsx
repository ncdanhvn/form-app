import { Box, Heading } from "@chakra-ui/react";

interface Props {
  title: string;
}

const FormTitle = ({ title }: Props) => {
  return (
    <Box bg="pink.500" color="white" w={"100%"} textAlign={"center"} py={8}>
      <Heading as="h1" size="xl" fontFamily="Grape Nuts, sans-serif">
        {title}
      </Heading>
    </Box>
  );
};

export default FormTitle;
