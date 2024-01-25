import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { backgroundGallery } from "../../resources/imageResources"; // Import the list of images
import ImageGallery from "../ImageGallery";
import { useCanvasStore } from "../../stores/canvasStore";

const sketchPickerStyle = {
  default: {
    picker: {
      width: "268px",
    },
  },
};

const BackgroundAccordion: React.FC = () => {
  const {
    background,
    setBackgroundColor,
    setBackgroundImage,
    setBackgroundType,
  } = useCanvasStore();

  const [radioValue, setRadioValue] = useState<"color" | "image">(
    background.type
  );

  return (
    <>
      <RadioGroup
        mb={4}
        onChange={(value) => setRadioValue(value as "color" | "image")}
        value={radioValue}
      >
        <Stack direction="row" justifyContent={"center"} spacing={8}>
          <Radio value="color">Color</Radio>
          <Radio value="image">Image</Radio>
        </Stack>
      </RadioGroup>

      {radioValue === "color" ? (
        <Box display="flex" justifyContent="center">
          <SketchPicker
            color={background.color}
            onChangeComplete={(color: ColorResult) => {
              setBackgroundType("color");
              setBackgroundColor(color.hex);
              setBackgroundImage("");
            }}
            styles={sketchPickerStyle}
          />
        </Box>
      ) : (
        <ImageGallery
          selectedImage={background.image}
          onSelectImage={(image) => {
            setBackgroundType("image");
            setBackgroundImage(image);
          }}
          images={backgroundGallery}
        />
      )}
    </>
  );
};

export default BackgroundAccordion;
