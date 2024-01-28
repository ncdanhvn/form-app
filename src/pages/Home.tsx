import React from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToCreateNew = () => {
    navigate("/create-new"); // Navigate to CreateNew page
  };

  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Button colorScheme="blue" onClick={navigateToCreateNew}>
          Create New
        </Button>
      </Box>
    </Center>
  );
};

export default Home;
