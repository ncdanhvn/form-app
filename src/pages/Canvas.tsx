import { Box, Button, Container, Flex, VStack } from "@chakra-ui/react";
import CanvasEditPanel from "../components/canvas/CanvasEditPanel"; // Import the CanvasEditPanel component
import useCanvasStore from "../stores/canvasStore";

import html2canvas from "html2canvas";
import { useState } from "react";
import Loading from "../components/Loading";
import FormButtonCanvas from "../components/canvas/FormButtonCanvas";
import FormDescriptionCanvas from "../components/canvas/FormDescriptionCanvas";
import FormQuestionsCanvas from "../components/canvas/FormQuestionsCanvas";
import FormTitleCanvas from "../components/canvas/FormTitleCanvas";
import { FormHeader } from "../components/form/FormHeader";
import useFormContentStore from "../stores/formContentStore";
import useQuestionToolbarStore from "../stores/toolbarStore/questionToolbarStore";

const Canvas = ({ formUid }: { formUid: string }) => {
  const { title, description, questions } = useFormContentStore();
  const { background, isFetched } = useCanvasStore();
  const { align } = useQuestionToolbarStore();

  const [isLoading, setIsLoading] = useState(isFetched ? false : true);

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
    <>
      <Flex>
        {isLoading ? (
          <Box flex={1} height="100vh" maxHeight={"100vh"}>
            <Loading />
          </Box>
        ) : (
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
                  <FormTitleCanvas title={title} />
                  <FormDescriptionCanvas description={description} />
                  <Box
                    display={"flex"}
                    justifyContent={align}
                    w={"100%"}
                    px={8}
                    py={4}
                  >
                    <FormQuestionsCanvas questions={questions} />
                  </Box>
                  <FormButtonCanvas />
                </VStack>
              </VStack>
            </Container>
          </Box>
        )}
        <Box width="300px" flexShrink={0} height="100vh"></Box>
      </Flex>

      <CanvasEditPanel formUid={formUid} setIsLoadingFormStyle={setIsLoading} />
      <Box position={"absolute"} zIndex={10} left={10} top={10}>
        <Button onClick={() => onExport()}>Export As JPEG</Button>
      </Box>
    </>
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
