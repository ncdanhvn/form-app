import React from "react";
import { Box, Image, Text, Badge, Button } from "@chakra-ui/react";
import { Form } from "../types/form";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

interface FormCardProps {
  form: Form;
}

const FormCard: React.FC<FormCardProps> = ({ form }) => {
  const navigate = useNavigate();

  const handleUseFormClick = async () => {
    // Navigate to the edit page
    navigate(`/edit-copy/${form.uid}`);

    // Increase the times of copies by 1
    const formRef = doc(firestore, "forms", form.uid);
    try {
      await updateDoc(formRef, {
        timesOfCopies: form.timesOfCopies + 1,
      });
    } catch (error) {
      console.error("Error updating times of copies: ", error);
    }
  };

  return (
    <Box position="relative" overflow="hidden" borderRadius="lg" boxShadow="md">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
        opacity="0"
        justifyContent="center"
        alignItems="center"
        display="flex"
        transition="opacity 0.3s ease-in-out"
        _hover={{ opacity: "1" }}
        onClick={handleUseFormClick}
      >
        <Button colorScheme="blue">Use This Form</Button>
      </Box>
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
