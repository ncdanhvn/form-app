import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Box,
} from "@chakra-ui/react";
import { SketchPicker, ColorResult } from "react-color";
import ImageGallery from "./ImageGallery";
import { backgroundGallery } from "../resources/imageResources"; // Import the list of images

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateBackground: (newBackground: string, type: "color" | "image") => void;
}

const sketchPickerStyle = {
  default: {
    picker: {
      width: "300px",
    },
  },
};

const BackgroundCustomizationDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  updateBackground,
}) => {
  const [color, setColor] = useState<string>("#ffffff");
  const [backgroundType, setBackgroundType] = useState<"color" | "image">(
    "color"
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleSave = () => {
    if (backgroundType === "color") {
      updateBackground(color, "color");
    } else {
      updateBackground(selectedImageUrl, "image");
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customize Background</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup
            mb={4}
            onChange={(setValue) =>
              setBackgroundType(setValue as "color" | "image")
            }
            value={backgroundType}
          >
            <Stack direction="row" justifyContent={"center"} spacing={8}>
              <Radio value="color">Color</Radio>
              <Radio value="image">Image</Radio>
            </Stack>
          </RadioGroup>

          {backgroundType === "color" ? (
            <Box display="flex" justifyContent="center">
              <SketchPicker
                color={color}
                onChangeComplete={(color: ColorResult) => setColor(color.hex)}
                styles={sketchPickerStyle}
              />
            </Box>
          ) : (
            <ImageGallery
              onSelectImage={handleSelectImage}
              images={backgroundGallery}
              selectedImage={selectedImageUrl}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSave}
            disabled={backgroundType === "image"}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BackgroundCustomizationDialog;
