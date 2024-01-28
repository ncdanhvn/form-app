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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { registerUser } from "../services/authServices";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
      });
      return;
    }

    try {
      await registerUser(email, password, username);
      toast({
        title: "Account created successfully",
        description: "Redirect you to the homepage",
        status: "success",
        duration: 3000,
      });
      setTimeout(() => navigate("/home"), 3000); // Redirect to Home page after 3 seconds
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error instanceof Error
            ? getErrorDescription(error)
            : "An unknown error occurred",
        status: "error",
      });
    }
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

const getErrorDescription = (error: Error) => {
  switch (error.message) {
    case "Firebase: Error (auth/missing-email).":
      return "Please enter the Email";
    case "Firebase: Error (auth/invalid-email).":
      return "Please enter a correct Email";
    case "Firebase: Error (auth/missing-password).":
      return "Please enter the Password";
    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      return "Password should be at least 6 characters";
    case "Firebase: Error (auth/email-already-in-use).":
      return "Email already in use";
    default:
      //   return "Some error occurred";
      return error.message;
  }
};
