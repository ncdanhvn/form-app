import React, { useState, useEffect } from "react";
import { Spinner, Box, IconButton } from "@chakra-ui/react";
import FormRow from "./FormRow"; // Import the sub-component
import { Form } from "../types/form";
import { createNewForm, loadForm } from "../services/formServices";
import { addFormToUser, getUserFormsList } from "../services/userServices";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const MyForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true); // Start loading
      try {
        const formUids = await getUserFormsList(); // Replace with actual function to get form UIDs
        const formDetails = await Promise.all(
          formUids.map((uid: string) => loadForm(uid))
        ); // Replace with actual function to load form details
        setForms(formDetails);
      } catch (error) {
        console.error("Error fetching forms:", error);
        // Handle error state as needed
      }
      setIsLoading(false); // End loading
    };

    fetchForms();
  }, []);

  const [isCreatingNewPage, setIsCreatingNewPage] = useState(false);
  const navigate = useNavigate();

  const onCreateNew = async () => {
    setIsCreatingNewPage(true);
    try {
      const formUid = await createNewForm();
      const user = auth.currentUser;
      if (user) {
        await addFormToUser(user.uid, formUid);
      }
      navigate(`/edit/${formUid}`);
    } catch (error) {
      console.error("Failed to create new form:", error);
    } finally {
      setIsCreatingNewPage(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <>
      {forms.map((form, index) => (
        <FormRow key={index} form={form} />
      ))}
      <IconButton
        aria-label="Add new form"
        icon={<AddIcon />}
        size="lg"
        isRound
        colorScheme="blue"
        position="fixed"
        bottom="50px"
        right="50px"
        onClick={onCreateNew}
        isLoading={isCreatingNewPage}
      />
    </>
  );
};

export default MyForms;
