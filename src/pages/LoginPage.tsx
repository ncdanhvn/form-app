import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig"; // adjust the path as needed

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
          error instanceof Error ? error.message : "An unknown error occurred",
        status: "error",
      });
    }
  };

  return (
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
      <Button onClick={handleLogin}>Log In</Button>
    </VStack>
  );
};

export default LoginPage;
