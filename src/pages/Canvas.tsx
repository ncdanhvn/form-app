import { Box, Container, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CanvasEditPanel from "../components/canvas/CanvasEditPanel"; // Import the CanvasEditPanel component
import useCanvasStore from "../stores/canvasStore";

import FormTitleCanvas from "../components/canvas/FormTitleCanvas";
import { FormHeader } from "../components/form/FormHeader";
import { loadForm } from "../services/formServices";
import { Form as FormType } from "../types/form";
import FormDescriptionCanvas from "../components/canvas/FormDescriptionCanvas";

const formUid = "yBpOOBYf1uzKgAMsByQu";

const Canvas: React.FC = () => {
  const { background } = useCanvasStore();

  // Get form from db to display
  const [form, setForm] = useState<FormType>();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await loadForm(formUid);
        setForm(form);
      } catch (error) {
        console.error("Error loading form: ", error);
      }
    };
    fetchForm();
  }, [formUid]);

  return (
    form && (
      <>
        <Box display="flex" height="100vh" width="100vw">
          <Box
            {...(background.type === "color"
              ? { bg: background.color }
              : { bgImage: background.image })}
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          >
            <Container bg="white" borderRadius={"lg"} p={0} overflow={"hidden"}>
              <VStack spacing={0}>
                <FormHeader />
                <VStack w={"100%"} spacing={0}>
                  <FormTitleCanvas title={form.title} />
                  <FormDescriptionCanvas description={form.description} />
                </VStack>
              </VStack>
            </Container>
          </Box>

          <Box width="300px" flexShrink={0} height="100vh">
            <CanvasEditPanel />
          </Box>
        </Box>
      </>
    )
  );
};

export default Canvas;
