import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Link,
  List,
  ListItem,
  Switch,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../firebaseConfig";

const formUrlPrefix = import.meta.env.VITE_FORM_PREFIX_URL;

interface Props {
  formUid: string;
}

const ShareForm: React.FC<Props> = ({ formUid }) => {
  const url = `${formUrlPrefix}${formUid}`;
  const { hasCopied, onCopy } = useClipboard(url);
  const toast = useToast();

  const [isShared, setIsShared] = useState(false);

  const handleToggle = async () => {
    const newSharedStatus = !isShared;
    setIsShared(newSharedStatus);

    const formRef = doc(firestore, "forms", formUid);
    const sharedFormsRef = doc(firestore, "sharedForms", "sharedList"); // Assuming 'sharedForms' collection and 'sharedList' document

    try {
      // Update the form's isSharedToCommunity field
      await updateDoc(formRef, {
        isSharedToCommunity: newSharedStatus,
        timesOfCopies: 0,
      });

      // Update the sharedFormList
      if (newSharedStatus) {
        await updateDoc(sharedFormsRef, {
          formIds: arrayUnion(formUid),
        });
      } else {
        await updateDoc(sharedFormsRef, {
          formIds: arrayRemove(formUid),
        });
      }
    } catch (error) {
      console.error("Error updating sharing status: ", error);
      setIsShared(!newSharedStatus); // Revert the state in case of an error
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied to clipboard",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <List spacing={4} mt={8} mx={8}>
      <ListItem>
        <HStack justifyContent="left" alignItems="center" spacing={4}>
          <Text fontSize="md">You can share Form at this URL:</Text>
          <Link href={url} color="blue.500" fontWeight="bold" isExternal>
            {url}
          </Link>
          <Button px={4} onClick={handleCopy} colorScheme="blue" size="sm">
            {hasCopied ? "Copied" : "Copy URL"}
          </Button>
        </HStack>
      </ListItem>

      <ListItem>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="share-toggle" mb="0">
            Share to Community
          </FormLabel>
          <Switch
            id="share-toggle"
            colorScheme="blue"
            isChecked={isShared}
            onChange={handleToggle}
          />
        </FormControl>
      </ListItem>
    </List>
  );
};

export default ShareForm;
