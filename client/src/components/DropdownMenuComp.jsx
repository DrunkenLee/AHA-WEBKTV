import React, { useState } from "react";
import {
  ChakraProvider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

function DropdownMenuComp() {
  const [selectedOption, setSelectedOption] = useState("Option 1");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <ChakraProvider>
      <Menu>
        <MenuButton as={Button} colorScheme="yellow" variant="outline">
          {selectedOption}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleOptionSelect("Option 1")}>
            Option 1
          </MenuItem>
          <MenuItem onClick={() => handleOptionSelect("Option 2")}>
            Option 2
          </MenuItem>
          <MenuItem onClick={() => handleOptionSelect("Option 3")}>
            Option 3
          </MenuItem>
        </MenuList>
      </Menu>
    </ChakraProvider>
  );
}

export default DropdownMenuComp;
