import { Box, Button, Container, Flex, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import FormQuestionsCanvas from "../components/canvas/FormQuestionsCanvas";
import FormDescription from "../components/form/FormDescription";
import { FormHeader } from "../components/form/FormHeader";
import FormTitle from "../components/form/FormTitle";

import { loadForm } from "../services/formServices";
import { Form as FormType } from "../types/form";

const formUid = "yBpOOBYf1uzKgAMsByQu";

const Canvas = () => {
  const [boxHeight, setBoxHeight] = useState("100vh");
  const parentRef = useRef<HTMLDivElement>(null);
  const updateHeight = () => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;

      setBoxHeight(viewportHeight > parentHeight ? "100vh" : "100%");
    }
  };

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
    <div ref={parentRef}>
      {form && (
        <Box
          bgImage="./images/party-invitation-bg.webp"
          height={boxHeight}
          width="100vw"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Container bg="white" borderRadius={"lg"} p={0} overflow={"hidden"}>
            <VStack gap={0}>
              <FormHeader />
              <VStack w={"100%"} gap={4} mb={8}>
                <FormTitle title={form.title} />
                <FormDescription description={form.description} />
                <form>
                  <FormQuestionsCanvas questions={form.questions} />
                  <Flex justifyContent="center" width="full" mt={8}>
                    <Button colorScheme="pink" type="submit">
                      Submit
                    </Button>
                  </Flex>
                </form>
              </VStack>
            </VStack>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default Canvas;
