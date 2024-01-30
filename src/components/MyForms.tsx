import React, { useState, useEffect } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import FormRow from "./FormRow"; // Import the sub-component
import { Form } from "../types/form";
import { loadForm } from "../services/formServices";
import { getUserFormsList } from "../services/userServices";

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
    <div>
      {forms.map((form, index) => (
        <FormRow key={index} form={form} />
      ))}
    </div>
  );
};

export default MyForms;
