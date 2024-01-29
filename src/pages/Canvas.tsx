import { Box, Button, Container, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CanvasEditPanel from "../components/canvas/CanvasEditPanel"; // Import the CanvasEditPanel component
import useCanvasStore from "../stores/canvasStore";

import FormTitleCanvas from "../components/canvas/FormTitleCanvas";
import { FormHeader } from "../components/form/FormHeader";
import { loadForm } from "../services/formServices";
import { Form as FormType } from "../types/form";
import FormDescriptionCanvas from "../components/canvas/FormDescriptionCanvas";
import FormQuestionsCanvas from "../components/canvas/FormQuestionsCanvas";
import useQuestionToolbarStore from "../stores/toolbarStore/questionToolbarStore";
import FormButtonCanvas from "../components/canvas/FormButtonCanvas";
import html2canvas from "html2canvas";

const formUid = "H7HbmDTJOJDSDwpyENA5";

const Canvas: React.FC = () => {
  const { background } = useCanvasStore();
  const { align } = useQuestionToolbarStore();

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

  const onExport = async () => {
    const formElement = document.getElementById("targetCanvas");

    const canvasImage = await html2canvas(formElement!, {
      onclone: (_, element) => {
        if (element) element.scrollTop = 0;
      },
      windowWidth: 1100,
    });
    const image = canvasImage.toDataURL("image/png");
    downloadThumbnail(image, "myFormThumbnail.png");
  };

  return (
    form && (
      <>
        <Flex>
          <Box
            flex={1}
            height="100vh"
            maxHeight={"100vh"}
            {...(background.type === "color"
              ? { bg: background.color }
              : { bgImage: background.image })}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            id="targetCanvas"
            overflow={"auto"}
            py={16}
          >
            <Container bg="white" borderRadius={"lg"} p={0} overflow={"hidden"}>
              <VStack spacing={0}>
                <FormHeader />
                <VStack w={"100%"} spacing={0} mb={8}>
                  <FormTitleCanvas title={form!.title} />
                  <FormDescriptionCanvas description={form!.description} />
                  <Box
                    display={"flex"}
                    justifyContent={align}
                    w={"100%"}
                    px={8}
                    py={4}
                  >
                    <FormQuestionsCanvas questions={form!.questions} />
                  </Box>
                  <FormButtonCanvas />
                </VStack>
              </VStack>
            </Container>
          </Box>
          <Box width="300px" flexShrink={0} height="100vh"></Box>
        </Flex>
        <CanvasEditPanel formUid={formUid} />
        <Box position={"absolute"} zIndex={10} left={10} top={10}>
          <Button onClick={() => onExport()}>Export As JPEG</Button>
        </Box>
      </>
    )
  );
};

export default Canvas;

const downloadThumbnail = (imageDataUrl, filename = "thumbnail.png") => {
  const link = document.createElement("a");
  link.href = imageDataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
