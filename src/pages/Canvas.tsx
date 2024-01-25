import React, { useState } from "react";
import { Box, Container, Text, Button, useDisclosure } from "@chakra-ui/react";
import BackgroundCustomizationDialog from "../components/BackgroundCustomizationDialog";

const Canvas: React.FC = () => {
  const [background, setBackground] = useState<{
    type: "color" | "image";
    value: string;
  }>({ type: "image", value: "url('./images/party-invitation-bg.webp')" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateBackground = (newBackground: string, type: "color" | "image") => {
    setBackground({ type, value: newBackground });
  };

  return (
    <>
      <Box
        {...(background.type === "color"
          ? { bg: background.value }
          : { bgImage: background.value })}
        height="100vh"
        width="100vw"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button position="absolute" top="4" left="4" onClick={onOpen}>
          Customize Background
        </Button>

        <Container bg="white" borderRadius="lg" p={0} overflow="hidden" h={60}>
          <Text>Some content here</Text>
        </Container>
      </Box>
      <BackgroundCustomizationDialog
        isOpen={isOpen}
        onClose={onClose}
        updateBackground={(newBg, type) => updateBackground(newBg, type)}
      />
    </>
  );
};

export default Canvas;
