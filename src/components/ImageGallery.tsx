import React from "react";
import { Badge, Grid, GridItem, Image } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface ImageGalleryProps {
  onSelectImage: (image: string) => void;
  images: string[];
  selectedImage: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  onSelectImage,
  images,
  selectedImage,
}) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={4}>
      {images.map((image, index) => {
        const fullPath = `${image}`;
        const isSelected = fullPath === selectedImage;
        return (
          <GridItem key={index} w="100%" h="100px" position="relative">
            <Image
              src={fullPath}
              alt={`Gallery Image ${index}`}
              boxSize="100%"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              onClick={() => onSelectImage(fullPath)}
              boxShadow={isSelected ? "0 0 0 3px blue" : "none"} // Outline for selected image
              _hover={!isSelected ? { boxShadow: "0 0 0 2px lightblue" } : {}} // Hover effect
            />
            {isSelected && (
              <Badge
                position="absolute"
                right="1"
                bottom="1"
                colorScheme="green"
              >
                <CheckIcon color="green.500" />
              </Badge>
            )}
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ImageGallery;
