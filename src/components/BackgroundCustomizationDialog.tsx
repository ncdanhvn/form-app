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
  Input,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { SketchPicker, ColorResult } from "react-color";

interface BackgroundCustomizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  updateBackground: (newBackground: string, type: "color" | "image") => void;
}

const BackgroundCustomizationDialog: React.FC<
  BackgroundCustomizationDialogProps
> = ({ isOpen, onClose, updateBackground }) => {
  const [color, setColor] = useState<string>("#ffffff");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [backgroundType, setBackgroundType] = useState<"color" | "image">(
    "color"
  );

  const handleSave = () => {
    const newBackground =
      backgroundType === "color" ? color : `url(${imageUrl})`;
    updateBackground(newBackground, backgroundType);
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
            onChange={(setValue) =>
              setBackgroundType(setValue as "color" | "image")
            }
            value={backgroundType}
          >
            <Stack direction="row">
              <Radio value="color">Color</Radio>
              <Radio value="image">Image URL</Radio>
            </Stack>
          </RadioGroup>

          {backgroundType === "color" ? (
            <SketchPicker
              color={color}
              onChangeComplete={(color: ColorResult) => setColor(color.hex)}
            />
          ) : (
            <Input
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
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
