import { VStack } from "@chakra-ui/react";
import useDescriptionToolbarStore from "../../stores/toolbarStore/descriptionToolbarStore";
import FormatTextToolbar from "../FormatTextToolbar";

const TitleAccordion = () => {
  return (
    <VStack align={"normal"} spacing={4}>
      <FormatTextToolbar useToolbarStore={useDescriptionToolbarStore} />
    </VStack>
  );
};

export default TitleAccordion;
