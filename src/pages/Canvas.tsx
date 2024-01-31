import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import CanvasEditPanel from "../components/canvas/CanvasEditPanel"; // Import the CanvasEditPanel component
import useCanvasStore from "../stores/canvasStore";

import FormButtonCanvas from "../components/canvas/FormButtonCanvas";
import FormDescriptionCanvas from "../components/canvas/FormDescriptionCanvas";
import FormQuestionsCanvas from "../components/canvas/FormQuestionsCanvas";
import FormTitleCanvas from "../components/canvas/FormTitleCanvas";
import { FormHeader } from "../components/form/FormHeader";
import useFormContentStore from "../stores/formContentStore";
import useQuestionToolbarStore from "../stores/toolbarStore/questionToolbarStore";

const Canvas = () => {
  const { title, description, questions } = useFormContentStore();
  const { background } = useCanvasStore();
  const { align } = useQuestionToolbarStore();

  return (
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
        <Box width="300px" flexShrink={0} height="100vh"></Box>
      </Flex>

      <CanvasEditPanel />
    </>
  );
};

export default Canvas;
