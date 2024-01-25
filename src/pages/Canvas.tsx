import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import BackgroundCustomizationDialog from "../components/BackgroundCustomizationDialog";
import { useCanvasStore } from "../stores/canvasStore";

const Canvas: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { backgroundType, backgroundValue, updateBackground } =
    useCanvasStore();
  return (
    <>
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative" // Make the outer box a positioning context
      >
        <Box
          {...(backgroundType === "color"
            ? { bg: backgroundValue }
            : { bgImage: backgroundValue })}
          position="absolute" // Set to absolute
          top={0}
          left={0}
          height="100%"
          width="100%"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          _hover={{ ".customize-button": { opacity: 1 } }} // Apply hover effect only to this box
        >
          <IconButton
            aria-label="Customize Background"
            icon={<EditIcon />}
            position="absolute"
            top="4"
            left="50%"
            transform="translate(-50%)"
            opacity={0}
            className="customize-button" // Class to target for hover effect
            onClick={onOpen}
            transition="opacity 0.3s ease"
          />
        </Box>

        <Container
          position="relative"
          bg="white"
          borderRadius="lg"
          p={0}
          overflow="hidden"
          h={60}
          zIndex="1"
        >
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
