import React, { useState } from "react";
import { Box, Image, Text, Badge, Button, Spinner } from "@chakra-ui/react";
import { Form } from "../types/form";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { createNewForm } from "../services/formServices";
import { addFormToUser } from "../services/userServices";
import { copyForm } from "../services/communityServices";

interface FormCardProps {
  form: Form;
}

const FormCard: React.FC<FormCardProps> = ({ form }) => {
  const navigate = useNavigate();
  const [isCopingPage, setIsCopingPage] = useState(false);

  const onUseForm = async () => {
    setIsCopingPage(true);
    try {
      const newFormUid = await createNewForm();
      const user = auth.currentUser;
      if (user) {
        await addFormToUser(user.uid, newFormUid);
      }
      // Increase the times of copies by 1
      const formRef = doc(firestore, "forms", form.uid);
      try {
        await updateDoc(formRef, {
          timesOfCopies: form.timesOfCopies + 1,
        });
      } catch (error) {
        console.error("Error updating times of copies: ", error);
      }

      // Copy form content and style
      await copyForm(form.uid, newFormUid);

      navigate(`/edit/${newFormUid}`);
    } catch (error) {
      console.error("Failed to create new form:", error);
    } finally {
      setIsCopingPage(false);
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
      >
        <Button colorScheme="blue" onClick={onUseForm} width="200px">
          {isCopingPage ? <Spinner size="sm" /> : "Create New"}
        </Button>
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
