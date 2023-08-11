import React, { useState } from "react";
import { ChakraProvider, Flex, Box, Button } from "@chakra-ui/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const images = [
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
];

function ResponsiveCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <ChakraProvider>
      <Flex align="center" justify="center">
        <Button onClick={goToPrevious} m={2}>
          <IoChevronBack />
        </Button>
        <Box w="50rem" overflow="hidden">
          <Flex
            transform={`translateX(-${currentIndex * 100}%)`}
            transition="transform 0.3s ease-in-out"
          >
            {images.map((image, index) => (
              <Box key={index} w="100%" flexShrink={0}>
                <img src={image} alt={`Image ${index}`} />
              </Box>
            ))}
          </Flex>
        </Box>
        <Button onClick={goToNext} m={2}>
          <IoChevronForward />
        </Button>
      </Flex>
    </ChakraProvider>
  );
}

export default ResponsiveCarousel;
