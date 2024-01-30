import React from "react";
import { Box, Image, Text, Button, Link } from "@chakra-ui/react";
import { Form } from "../types/form";
import moment from "moment";

const FormRow = ({ form }: { form: Form }) => {
  const createdAtFormatted = moment(form.createdAt.toDate()).fromNow();
  return (
    <Box
      display="flex"
      alignItems="center"
      marginBottom="4"
      padding="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src={form.formThumbnailUrl}
        alt="Form Thumbnail"
        boxSize="128px"
        marginRight="4"
        borderRadius={"md"}
      />
      <Box flex="1">
        <Text fontWeight="bold">{form.title}</Text>
        <Text fontSize="sm">{form.description}</Text>
      </Box>
      <Box flex="1">
        <Text fontSize="sm">Created {createdAtFormatted}</Text>
      </Box>
      <Box flex="1">
        <Text fontSize="sm">Questions: {form.questions.length}</Text>
      </Box>
      <Button marginRight="4" colorScheme="blue">
        Edit
      </Button>
      <Button marginRight="4">Reponse Sheet</Button>
    </Box>
  );
};

export default FormRow;
