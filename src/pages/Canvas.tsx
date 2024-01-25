import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { useCanvasStore } from "../stores/canvasStore";
import CanvasEditPanel from "../components/canvas/CanvasEditPanel"; // Import the CanvasEditPanel component

const Canvas: React.FC = () => {
  const { backgroundType, backgroundValue } = useCanvasStore();

  return (
    <>
      {/* Wrap your existing Box and the CanvasEditPanel in a Flex container */}
      <Box display="flex" height="100vh" width="100vw">
        {/* Canvas Content */}
        <Box
          {...(backgroundType === "color"
            ? { bg: backgroundValue }
            : { bgImage: backgroundValue })}
          flex="1" // This makes sure the canvas takes up all space except for the edit panel
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Container
            bg="white"
            borderRadius="lg"
            p={0}
            overflow="hidden"
            h={60}
          >
            <Text>Some content here</Text>
          </Container>
        </Box>

        <Box width="300px" flexShrink={0} height="100vh">
          <CanvasEditPanel />
        </Box>
      </Box>
    </>
  );
};

export default Canvas;
