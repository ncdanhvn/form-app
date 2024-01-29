import React, { useState } from "react";
import { Box, Button, Center, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createNewForm } from "../services/formServices";
import { addFormToUser } from "../services/userServices";
import { auth } from "../firebaseConfig";

const Home: React.FC = () => {
  const [isCreatingNewPage, setIsCreatingNewPage] = useState(false);
  const navigate = useNavigate();

  const handleCreateNewClick = async () => {
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

  return (
    <Box py={8}>
      <Button
        colorScheme="blue"
        onClick={handleCreateNewClick}
        disabled={isCreatingNewPage}
        width="150px"
      >
        {isCreatingNewPage ? <Spinner size="sm" /> : "Create New"}
      </Button>
    </Box>
  );
};

export default Home;
