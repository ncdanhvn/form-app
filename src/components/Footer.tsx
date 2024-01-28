import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" padding="1rem">
      <Container centerContent>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
        </Text>
        {/* Add more footer content as needed */}
      </Container>
    </Box>
  );
};

export default Footer;
