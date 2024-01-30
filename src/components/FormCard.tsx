import React from "react";
import { Box, Image, Text, Badge } from "@chakra-ui/react";
import { Form } from "../types/form";

interface FormCardProps {
  form: Form;
}

const FormCard: React.FC<FormCardProps> = ({ form }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.3s ease-in-out"
    >
      <Box display={"flex"} justifyContent={"center"}>
        <Image
          src={form.formThumbnailUrl}
          alt={`${form.title} thumbnail`}
          borderRadius="md"
        />
      </Box>
      <Box mt="3" textAlign={"center"}>
        <Text fontWeight="bold" fontSize="xl">
          {form.title}
        </Text>
        <Text fontSize="md" color="gray.600" mb="2">
          {form.description}
        </Text>
        <Badge colorScheme="blue" p="1" borderRadius="lg" mb={4}>
          Times of Copies: {form.timesOfCopies}
        </Badge>
      </Box>
    </Box>
  );
};

export default FormCard;
