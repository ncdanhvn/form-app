import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Container,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const handleRegister = () => {
    // Implement registration logic
    // Check if passwords match, etc.
  };

  return (
    <Container
      centerContent
      maxWidth="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleRegister}>
          Register
        </Button>
        <Box textAlign={"center"}>
          <ChakraLink as={RouterLink} to="/login" color="blue.500" mt="4">
            or Log In instead
          </ChakraLink>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
