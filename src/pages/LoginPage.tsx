import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "../firebaseConfig";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Logged in successfully", status: "success" });
      // Redirect to home or another page as needed
    } catch (error) {
      toast({
        title: "Failed to log in",
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
        <Button onClick={handleLogin} colorScheme="blue">
          Log In
        </Button>
        <Box textAlign={"center"}>
          <ChakraLink as={RouterLink} to="/register" color="blue.500" mt="4">
            or Register instead
          </ChakraLink>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;

const getErrorDescription = (error: Error) => {
  switch (error.message) {
    case "Firebase: Error (auth/invalid-email).":
      return "Invalid Email or Password";
    default:
      return "Some error occurred";
  }
};
