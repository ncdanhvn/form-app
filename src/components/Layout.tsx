import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "@chakra-ui/react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Container maxW={{ base: "100%", md: "80%", lg: "60%" }} p="4">
        <Navbar />
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
